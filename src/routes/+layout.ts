import type { LayoutLoad } from "./$types";
import { browser } from "$app/environment";
import { salesPeriod } from "$lib/stores/salesPeriod";
import { session } from "$lib/stores/session";
import { outlet } from "$lib/stores/outlet";

console.log("layout.ts");

export const load = (async ({ data }) => {
	if (browser) {
		console.log("mount", "wtf");
		session.set(data.session);
		outlet.set(data.outlet ?? { outletId: 0 });
		salesPeriod.set(data.salesPeriod);
	}

	return {
		...data,
	};
}) satisfies LayoutLoad;
