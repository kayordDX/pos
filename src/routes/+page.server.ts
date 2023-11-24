import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ locals }) => {
	if (locals.outlet == null) {
		throw redirect(303, "/setup");
	}
	console.log("firing it", locals.outlet);
	return { user: locals.user, outlet: locals.outlet };
}) satisfies PageServerLoad;
