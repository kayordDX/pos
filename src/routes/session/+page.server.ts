import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load = (async ({ locals }) => {
	return {
		user: locals.user,
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	login: async ({ cookies, fetch }) => {
		const headersList = {
			"Content-Type": "application/json",
		};
		const bodyContent = JSON.stringify({});
		const result = await fetch("http://localhost:5117/token", {
			method: "POST",
			body: bodyContent,
			headers: headersList,
		});
		const token = await result.json();

		cookies.set("session", token.token, {
			path: "/",
			httpOnly: true,
			sameSite: "strict",
			secure: true,
			maxAge: 60 * 60 * 24 * 7, // 1 week
		});

		throw redirect(303, "/");
	},
	logout({ cookies }) {
		// eat the cookie
		cookies.set("session", "", {
			path: "/",
			expires: new Date(0),
		});

		// redirect the user
		throw redirect(302, "/");
	},
};
