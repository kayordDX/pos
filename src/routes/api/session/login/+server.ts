import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import type { User, UserToken } from "$lib/types";

export const POST: RequestHandler = async ({ cookies }) => {
	const headersList = {
		"Content-Type": "application/json",
	};
	const bodyContent = JSON.stringify({});
	const result = await fetch("http://localhost:5117/token", {
		method: "POST",
		body: bodyContent,
		headers: headersList,
	});
	const userToken = (await result.json()) as UserToken;

	cookies.set("session", userToken.token, {
		path: "/",
		httpOnly: true,
		sameSite: "strict",
		secure: true,
		maxAge: 60 * 60 * 24 * 7, // 1 week
	});

	const user = JSON.parse(atob(userToken.token.split(".")[1])) as User;

	return json({ user });
};
