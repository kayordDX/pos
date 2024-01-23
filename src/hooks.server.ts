import { SvelteKitAuth } from "@auth/sveltekit";
import Google from "@auth/core/providers/google";
import { GOOGLE_ID, GOOGLE_SECRET } from "$env/static/private";
import { redirect, type Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
// import { client } from "$lib/api/generated/open/test";
import { PUBLIC_API_URL } from "$env/static/public";

// export async function handleFetch({ request, fetch, event }) {
// 	if (request.url.startsWith(PUBLIC_API_URL)) {
// 		const session = await event.locals.auth();
// 		// console.log(session);
// 		request = new Request(request);
// 		if (session?.user?.token) {
// 			request.headers.append("Authorization", `Bearer ${session.user.token}`);
// 		}
// 	}
// 	return fetch(request);
// }

// const filterFetch: Handle = async ({ event, resolve }) => {
// 	return resolve(event, {
// 		filterSerializedResponseHeaders(name) {
// 			return name === "content-length";
// 		},
// 	});
// };

const authorization: Handle = async ({ event, resolve }) => {
	const session = await event.locals.auth();
	if (!event.url.pathname.startsWith("/login")) {
		if (!session) {
			throw redirect(303, "/login");
		}
	} else {
		if (session) {
			throw redirect(303, "/");
		}
	}
	// If the request is still here, just proceed as normally
	return resolve(event);
};

async function refreshAccessToken(token) {
	try {
		console.log(token, "refresh");
		const url =
			"https://oauth2.googleapis.com/token?" +
			new URLSearchParams({
				client_id: GOOGLE_ID,
				client_secret: GOOGLE_SECRET,
				grant_type: "refresh_token",
				refresh_token: token.refreshToken,
			});
		console.log(url, url);
		const response = await fetch(url, {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			method: "POST",
		});

		const refreshedTokens = await response.json();

		if (!response.ok) {
			throw refreshedTokens;
		}

		return {
			...token,
			accessToken: refreshedTokens.access_token,
			accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
			refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
		};
	} catch (error) {
		console.log(error);

		return {
			...token,
			error: "RefreshAccessTokenError",
		};
	}
}

const authentication: Handle = async ({ event, resolve }) => {
	const authHandle = SvelteKitAuth({
		providers: [Google({ clientId: GOOGLE_ID, clientSecret: GOOGLE_SECRET })],
		callbacks: {
			async jwt({ token, account, user }) {
				// Initial sign in
				if (account && user) {
					return {
						accessToken: account.accessToken,
						accessTokenExpires: Date.now() + account.expires_in * 1000,
						refreshToken: account.refresh_token,
						user,
					};
				}

				return refreshAccessToken(token);

				// Return previous token if the access token has not expired yet
				if (Date.now() < token.accessTokenExpires) {
					return token;
				}

				return token;
				// Access token has expired, try to update it
				return refreshAccessToken(token);
			},
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			async session({ session, token }) {
				console.log(token);
				if (token) {
					session.user = token.user;
					session.accessToken = token.accessToken;
					session.error = token.error;
				}
				if (session.user) {
					session.user.id = token.sub;
					session.user.token = token.token;
					session.user.roles = token.roles;
				}
				return session;
			},
		},
	})({ event, resolve });
	return authHandle;
};

// export async function authentication({ event, resolve }) {
// 	const authHandle = SvelteKitAuth({
// 		providers: [Google({ clientId: GOOGLE_ID, clientSecret: GOOGLE_SECRET })],
// 		callbacks: {
// 			async jwt({ token, account }) {
// 				if (account != null) {
// 					const bla = event.fetch("https://google.com");
// 					const what = await bla;
// 					const roles = await what.text();
// 					const role = roles.substring(0, 12);
// 					token.roles = [role, "admin"];
// 				}
// 				token.token ??= account?.id_token;
// 				return token;
// 			},
// 			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// 			// @ts-ignore
// 			async session({ session, token }) {
// 				if (session.user) {
// 					session.user.id = token.sub;
// 					session.user.token = token.token;
// 					session.user.roles = token.roles;
// 				}
// 				return session;
// 			},
// 		},
// 	})({ event, resolve });
// 	return authHandle;
// }

export const handle: Handle = sequence(authentication, authorization);
