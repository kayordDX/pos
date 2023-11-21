import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import type { User, UserToken } from "$lib/types";

export const POST: RequestHandler = async ({ cookies, request }) => {
	const headersList = {
		"Content-Type": "application/json",
	};
	const body = await request.json();
	const bodyContent = JSON.stringify({ staffId: body.staffId });
	const result = await fetch("http://localhost:5117/session/login", {
		method: "POST",
		body: bodyContent,
		headers: headersList,
	});
	const userToken = (await result.json()) as UserToken;

	cookies.set("outlet", userToken.token, {
		path: "/",
		httpOnly: true,
		sameSite: "strict",
		secure: true,
		maxAge: 60 * 60 * 24 * 7, // 1 week
	});

	const user = JSON.parse(atob(userToken.token.split(".")[1])) as User;

	return json({ user });
};
