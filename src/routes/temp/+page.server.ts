import { client } from "$lib/api/client";
import type { PageServerLoad } from "./$types";

export const load = (async ({ fetch }) => {
	const { data } = await client.GET("/business", { fetch });
	return {
		data,
	};
}) satisfies PageServerLoad;
