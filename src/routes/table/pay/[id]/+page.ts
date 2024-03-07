import type { PageLoad } from "./$types";

export const load = (async ({ params, parent }) => {
	const data = await parent();
	return { bookingId: params.id, userId: data.session?.user?.id };
}) satisfies PageLoad;
