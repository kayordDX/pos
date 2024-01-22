import { SvelteKitAuth } from "@auth/sveltekit";
import Google from "@auth/core/providers/google";
import { GOOGLE_ID, GOOGLE_SECRET } from "$env/static/private";
import { redirect, type Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

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

const authentication: Handle = async ({ event, resolve }) => {
	const authHandle = SvelteKitAuth({
		providers: [Google({ clientId: GOOGLE_ID, clientSecret: GOOGLE_SECRET })],
		callbacks: {
			async jwt({ token, account }) {
				if (account != null) {
					const bla = event.fetch("https://google.com");
					const what = await bla;
					const roles = await what.text();
					const role = roles.substring(0, 12);
					token.roles = [role, "admin"];
				}
				token.token ??= account?.id_token;
				return token;
			},
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			async session({ session, token }) {
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
