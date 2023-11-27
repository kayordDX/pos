import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { ClockUser } from "$lib/types";

export const load = (async ({ locals }) => {
	if (locals.outlet == null) {
		throw redirect(303, "/setup");
	}

	const result = await fetch("http://localhost:5117/clock/list?OutletId=1&StatusId=2");
	const outletUsers = (await result.json()) as Array<ClockUser>;

	return { user: locals.user, outlet: locals.outlet, outletUsers };
}) satisfies PageServerLoad;
