import type { PageLoad } from "./$types";
import { PUBLIC_API_URL } from "$env/static/public";
import { get } from "svelte/store";
import { page } from "$app/stores";
import { browser } from "$app/environment";

export const load = (async ({ fetch }) => {
	if (browser) console.log(get(page).data.session?.token);
	const result = await fetch(`${PUBLIC_API_URL}/business`);
	const data = await result.json();
	// const results = await client.GET("/business", { fetch });

	return { result: data };
}) satisfies PageLoad;
