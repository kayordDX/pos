import type { ClockUser } from "$lib/types";
import type { PageServerLoad } from "./$types";

export const load = (async ({ fetch }) => {
	// TODO: Fix hardcoded url
	const result = await fetch("http://localhost:5117/clock/list?OutletId=1&StatusId=1");
	const outletUsers = (await result.json()) as Array<ClockUser>;
	return {
		outletUsers: outletUsers,
	};
}) satisfies PageServerLoad;
