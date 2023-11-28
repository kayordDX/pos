import type { PageLoad } from "./$types";

export const load = (async ({ params }) => {
	return { bookingId: params.id };
}) satisfies PageLoad;
