import type { LayoutLoad } from "./$types";
import { browser } from "$app/environment";
import { session } from "$lib/stores/session";

export const load = (async ({ data }) => {
	if (browser) {
		session.set(data.session);
	}

	return {
		...data,
	};
}) satisfies LayoutLoad;
