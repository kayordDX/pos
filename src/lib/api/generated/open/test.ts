import createClient from "openapi-fetch";
import type { paths } from "./schema";
import { PUBLIC_API_URL } from "$env/static/public";
// import { get } from "svelte/store";
// import { page } from "$app/stores";
// import { browser } from "$app/environment";

// const headers = browser
// 	? {
// 			Authorization: `Bearer ${get(page).data.session?.user?.token}`,
// 		}
// 	: {};

// if (browser) {
// 	console.log("What", get(page).data.session?.user?.token);
// }

export const client = createClient<paths>({
	// headers,
	baseUrl: PUBLIC_API_URL,
});
