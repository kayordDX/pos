// import { PUBLIC_API_URL } from "$env/static/public";
// import type { HandleFetch } from "@sveltejs/kit";

// export const handleFetch = (async ({ request, fetch, event }) => {
// 	if (request.url.startsWith(PUBLIC_API_URL)) {
// 		console.log("starts with");
// 		const session = await event.locals.auth();

// 		const headers = {
// 			...request.headers,
// 			"Access-Control-Allow-Methods": "GET, OPTIONS",
// 			"Access-Control-Allow-Origin": "*",
// 			"Access-Control-Allow-Headers": "*",
// 			Authorization: `Bearer ${session?.user?.token}`,
// 		};
// 		request = new Request(request, {
// 			headers,
// 		});
// 		// console.log(request.headers);
// 		// request = new Request(request);
// 		// if (session?.user?.token) {
// 		// 	request.headers.append("Authorization", `Bearer ${session.user.token}`);
// 		// }
// 		// request.headers.append("wazzup", "wazzup");
// 	} else {
// 		console.log("muthuasdf");
// 	}
// 	return fetch(request);
// }) satisfies HandleFetch;
