import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ cookies }) => {
	cookies.set("outlet", "", {
		path: "/",
		expires: new Date(0),
	});
	throw redirect(302, "/");
};
