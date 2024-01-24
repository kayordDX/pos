import { PUBLIC_API_URL } from "$env/static/public";
import { client } from "$lib/api";
import { session } from "$lib/stores/session";
import { get } from "svelte/store";
import type { PageLoad } from "./$types";

export const load = (async ({ fetch, parent }) => {
	const d = await parent();
	const business = await client(d.session?.token).GET("/business", {
		fetch,
	});
	return { business: { data: business.data, error: business.error } };
}) satisfies PageLoad;
