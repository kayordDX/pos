import type { ClockUser } from "$lib/types";
import type { PageServerLoad } from "./$types";
import { env } from "$env/dynamic/public";

export const load = (async ({ fetch, locals }) => {
	const result = await fetch(
		`${env.PUBLIC_API_URL}/clock/list?OutletId=${locals.outlet?.outletId}&StatusId=2`
	);
	const outletUsers = (await result.json()) as Array<ClockUser>;
	return {
		outletUsers: outletUsers,
	};
}) satisfies PageServerLoad;
