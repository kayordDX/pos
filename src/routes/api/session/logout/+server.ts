import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ cookies }) => {
	cookies.set("session", "", {
		path: "/",
		expires: new Date(0),
	});
	redirect(302, "/");
};
