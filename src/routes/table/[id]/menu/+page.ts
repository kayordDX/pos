import { client } from "$lib/api";
import type { PageLoad } from "./$types";

export const load = (async ({ params, parent, fetch }) => {
	const data = await parent();
	const results = await client(data.session?.token).GET("/menu", {
		params: { query: { outletId: data.status?.outletId ?? 0 } },
		fetch,
	});
	return { bookingId: params.id, menu: results.data };
}) satisfies PageLoad;
