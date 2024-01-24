import type { PageServerLoad } from "./$types";
import { PUBLIC_API_URL } from "$env/static/public";
import { client } from "$lib/api";

export const load = (async ({ fetch, locals }) => {
	// const rrr = await fetch(`${PUBLIC_API_URL}/business`);
	// const rrr = await fetch(`${PUBLIC_API_URL}/outlet`);
	// console.log(await rrr.json());
	// const what = await client.GET("/business", { fetch });
	// console.log(what.response.status);
	// if (locals.outlet == null) {
	// 	redirect(303, "/setup");
	// }
	// const outletUsersResult = await fetch(
	// 	`${PUBLIC_API_URL}/clock/list?OutletId=${locals.outlet.outletId}&StatusId=2`
	// );
	// const outletUsers = (await outletUsersResult.json()) as Array<ClockUser>;
	return {
		// session: await locals.auth(),
	};
}) satisfies PageServerLoad;
