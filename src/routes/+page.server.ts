import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ parent }) => {
	const parentData = await parent();

	if (!parentData.status?.outletId || parentData.status?.outletId <= 0) {
		redirect(303, "/setup");
	} else if (parentData.session?.user?.roles?.includes("waiter")) {
		if (!parentData.status?.clockedIn) {
			redirect(303, "/clockIn");
		}
	}

	return { ...parentData };
}) satisfies PageServerLoad;
