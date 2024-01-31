import type { PageLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load = (async ({ parent }) => {
	const parentData = await parent();
	if (!parentData.salesPeriod) {
		redirect(303, "/noSalesPeriod");
	}
	// const { data, error } = await client(d.session?.token).GET("/table/booked", {
	// 	params: { query: { outletId: d.outlet?.outletId ?? 0, myBooking: false } },
	// 	headers: { contentType: "application/json" },
	// 	fetch,
	// });

	// const { data: otherData, error: otherError } = await client(d.session?.token).GET(
	// 	"/table/booked",
	// 	{
	// 		params: { query: { outletId: d.outlet?.outletId ?? 0, myBooking: true } },
	// 		headers: { contentType: "application/json" },
	// 		fetch,
	// 	}
	// );
	return { ...parentData };
}) satisfies PageLoad;
