import { client, type SalesPeriod } from "$lib/api";
import type { LayoutServerLoad } from "./$types";

export const load = (async ({ locals, depends }) => {
	depends("main");
	const session = await locals.auth();
	let salesPeriod: SalesPeriod | undefined = undefined;
	console.log("loaindgsdl");
	const { data } = await client(session?.token).GET("/salesPeriod/{outletId}", {
		params: { path: { outletId: locals.outlet?.outletId ?? 0 } },
		fetch,
	});
	if (data) {
		salesPeriod = data;
	}
	return { outlet: locals.outlet, session, salesPeriod };
}) satisfies LayoutServerLoad;
