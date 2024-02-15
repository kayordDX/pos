import { SvelteKitAuth, type User } from "@auth/sveltekit";
import Google from "@auth/core/providers/google";
import { env } from "$env/dynamic/private";
import { redirect, type Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import { jwtDecode } from "jwt-decode";
import type { JWT } from "@auth/core/jwt";
import type { AdapterUser } from "@auth/core/adapters";
import { client } from "$lib/api";

// export async function handleFetch({ request, fetch, event }) {
// 	if (request.url.startsWith(PUBLIC_API_URL)) {
// 		const session = await event.locals.auth();
// 		request = new Request(request);
// 		if (session?.token) {
// 			request.headers.append("Authorization", `Bearer ${session.token}`);
// 		}
// 	}
// 	return fetch(request);
// }

const filterFetch: Handle = async ({ event, resolve }) => {
	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === "content-length";
		},
	});
};

// const outlet: Handle = async ({ event, resolve }) => {
// 	const cookieOutlet = event.cookies.get("outlet");
// 	if (cookieOutlet) {
// 		const cookieOutletJSON = JSON.parse(event.cookies.get("outlet") ?? "") as { outletId: number };
// 		event.locals.outlet = cookieOutletJSON;
// 	}
// 	return await resolve(event);
// };

const authorization: Handle = async ({ event, resolve }) => {
	const session = await event.locals.auth();
	if (!event.url.pathname.startsWith("/login")) {
		if (!session) {
			// throw redirect(303, "/login");
		}
	} else {
		if (session) {
			throw redirect(303, "/");
		}
	}
	return resolve(event);
};

async function refreshAccessToken(token: JWT) {
	try {
		const url = `https://oauth2.googleapis.com/token?client_id=${env.GOOGLE_ID}&client_secret=${env.GOOGLE_SECRET}&grant_type=refresh_token&refresh_token=${token.refreshToken}`;
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
			token: refreshedTokens.id_token,
			tokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
			refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
		};
	} catch (error) {
		console.error(error);
		return {
			...token,
			error: "RefreshAccessTokenError",
		};
	}
}

const authentication: Handle = async ({ event, resolve }) => {
	const { handle } = SvelteKitAuth({
		providers: [
			Google({
				clientId: env.GOOGLE_ID,
				clientSecret: env.GOOGLE_SECRET,
				authorization: {
					params: {
						prompt: "consent",
						access_type: "offline",
						response_type: "code",
					},
				},
			}),
		],
		callbacks: {
			async jwt({ token, account, user, profile }) {
				if (account && user && profile) {
					const t = account?.id_token ?? "";
					const decoded = jwtDecode(t);

					const roleRequest = await client(t).POST("/user/validate", {
						body: {
							email: profile.email ?? "",
							firstName: profile.given_name ?? "",
							image: profile.picture,
							lastName: profile.family_name ?? "",
							name: profile.name ?? "",
							userId: profile.sub ?? "",
						},
						fetch: event.fetch,
						headers: {
							"content-type": "application/json",
						},
					});

					console.log("body", {
						email: profile.email ?? "",
						firstName: profile.given_name ?? "",
						image: profile.picture,
						lastName: profile.family_name ?? "",
						name: profile.name ?? "",
						userId: profile.sub ?? "",
					});
					console.log("roleRequest", roleRequest);
					console.log("roleRequest", roleRequest.data);

					return {
						token: account?.id_token,
						tokenExpires: (decoded.exp ?? 0) * 1000,
						refreshToken: account?.refresh_token,
						user,
						roles: roleRequest.data?.userRoles,
					};
				}
				token.token ??= account?.id_token;

				// Return previous token if the access token has not expired yet
				if (Date.now() < (token.tokenExpires as number)) {
					return token;
				}
				// Access token has expired, try to update it
				return refreshAccessToken(token);
			},
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			async session({ session, token }) {
				if (token) {
					session.user = token.user as AdapterUser & User & { id: string; roles: string[] };
					session.token = token.token as string;
					session.refreshToken = token.refreshToken as string;
					session.tokenExpires = token.tokenExpires as number;
				}
				if (session.user) {
					session.user.roles = token.roles as Array<string>;
				}
				return session;
			},
		},
	});
	return handle({ event, resolve });
};

export const handle: Handle = sequence(authentication, authorization, filterFetch);
