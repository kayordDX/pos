import type { LayoutServerLoad } from "./$types";
import { PUBLIC_API_URL } from "$env/static/public";
import { loadFlash } from "sveltekit-flash-message/server";
import type { SalesPeriod } from "$lib/api";

export const load = loadFlash(async ({ locals }) => {
	let salesPeriod: SalesPeriod | undefined = undefined;
	if (locals.outlet) {
		const salesPeriodResult = await fetch(
			`${PUBLIC_API_URL}/SalesPeriod/${locals.outlet.outletId}`
		);
		salesPeriod = (await salesPeriodResult.json()) as SalesPeriod;
	}
	return { user: locals.user, outlet: locals.outlet, salesPeriod };
}) satisfies LayoutServerLoad;
