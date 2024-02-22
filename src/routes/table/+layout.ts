import type { LayoutLoad } from "./$types";

export const load = (async ({ params }) => {
	return { bookingId: params.id };
}) satisfies LayoutLoad;
