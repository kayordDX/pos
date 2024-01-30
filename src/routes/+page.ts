import { client } from "$lib/api";
import type { PageLoad } from "./$types";

export const load = (async ({ fetch, parent }) => {
	const d = await parent();
	const business = await client(d.session?.token).GET("/business", {
		fetch,
	});
	return { business: { data: business.data, error: business.error } };
}) satisfies PageLoad;
