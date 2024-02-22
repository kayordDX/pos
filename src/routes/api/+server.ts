import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async () => {
	return json({
		uptime: process.uptime(),
		memoryUsage: process.memoryUsage(),
		resourceUsage: process.resourceUsage(),
	});
};
