import { browser } from "$app/environment";
import { invalidateAll } from "$app/navigation";
import type { PageLoad } from "./$types";
if (browser) invalidateAll();
export const load = (async ({ data }) => {
	return { ...data };
}) satisfies PageLoad;
