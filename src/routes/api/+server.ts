import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ locals }) => {
	console.log(locals.getSession());
	return json({
		uptime: process.uptime(),
		memoryUsage: process.memoryUsage(),
		resourceUsage: process.resourceUsage(),
	});
};
