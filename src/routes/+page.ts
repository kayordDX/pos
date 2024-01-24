import { PUBLIC_API_URL } from "$env/static/public";
import { client } from "$lib/api/generated/open/test";
import { user } from "$lib/stores/userStore";
import { get } from "svelte/store";
import type { PageLoad } from "./$types";

export const load = (async ({ fetch }) => {
	// console.log("client");
	// const rrr = await fetch(`${PUBLIC_API_URL}/business`);
	// let bla: any = undefined;
	// user.subscribe((v) => console.log(v));
	// console.log(bla);
	const what = await client.GET("/business", { fetch });
	console.log(what.response.status, "after");
	// const rrr = await fetch(`${PUBLIC_API_URL}/outlet`);
	// console.log(rrr.status);
	return { test: "test" };
}) satisfies PageLoad;
