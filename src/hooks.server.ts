import { SvelteKitAuth } from "@auth/sveltekit";
import Google from "@auth/core/providers/google";
import { GOOGLE_ID, GOOGLE_SECRET } from "$env/static/private";

export const handle = SvelteKitAuth({
	providers: [Google({ clientId: GOOGLE_ID, clientSecret: GOOGLE_SECRET })],
	callbacks: {
		async jwt({ token, account }) {
			token.token ??= account?.id_token;
			return token;
		},
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.sub;
				session.user.token = token.token;
			}
			return session;
		},
	},
});
