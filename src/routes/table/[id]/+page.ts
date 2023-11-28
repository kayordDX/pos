import type { PageLoad } from "./$types";

export const load = (async ({ params }) => {
	return { tableId: params.id };
}) satisfies PageLoad;
