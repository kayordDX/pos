import type { PageLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load = (async ({ parent }) => {
	const parentData = await parent();
	if (!parentData.status?.salesPeriod) {
		redirect(303, "/noSalesPeriod");
	}
	return { ...parentData };
}) satisfies PageLoad;
