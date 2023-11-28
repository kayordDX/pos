import type { ClockUser } from "$lib/types";
import type { PageServerLoad } from "./$types";
import { PUBLIC_API_URL } from "$env/static/public";

export const load = (async ({ fetch, locals }) => {
	const result = await fetch(
		`${PUBLIC_API_URL}/clock/list?OutletId=${locals.outlet?.outletId}&StatusId=2`
	);
	const outletUsers = (await result.json()) as Array<ClockUser>;
	return {
		outletUsers: outletUsers,
	};
}) satisfies PageServerLoad;
