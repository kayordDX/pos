import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { ClockUser } from "$lib/types";
import { PUBLIC_API_URL } from "$env/static/public";

export const load = (async ({ locals }) => {
	if (locals.outlet == null) {
		redirect(303, "/setup");
	}

	const outletUsersResult = await fetch(
		`${PUBLIC_API_URL}/clock/list?OutletId=${locals.outlet.outletId}&StatusId=2`
	);
	const outletUsers = (await outletUsersResult.json()) as Array<ClockUser>;

	return { outletUsers };
}) satisfies PageServerLoad;
