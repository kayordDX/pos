import type { PageLoad } from "./$types";
import { client } from "$lib/api";

export const load = (async ({ fetch, parent }) => {
	const d = await parent();
	const { data, error } = await client(d.session?.token).GET("/table/booked", {
		params: { query: { outletId: d.outlet?.outletId ?? 0, myBooking: false } },
		headers: { contentType: "application/json" },
		fetch,
	});

	const { data: otherData, error: otherError } = await client(d.session?.token).GET(
		"/table/booked",
		{
			params: { query: { outletId: d.outlet?.outletId ?? 0, myBooking: true } },
			headers: { contentType: "application/json" },
			fetch,
		}
	);
	return { myTables: { data, error }, otherTable: { data: otherData, error: otherError } };
}) satisfies PageLoad;
