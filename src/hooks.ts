// import { PUBLIC_API_URL } from "$env/static/public";
// import type { HandleFetch } from "@sveltejs/kit";

// export const handleFetch = (async ({ request, fetch, event }) => {
// 	if (request.url.startsWith(PUBLIC_API_URL)) {
// 		const session = await event.locals.auth();
// 		request = new Request(request);
// 		if (session?.token) {
// 			request.headers.append("Content-Type", `application/json`);
// 			request.headers.append("Authorization", `Bearer ${session.token}`);
// 		}
// 	}
// 	return fetch(request);
// }) satisfies HandleFetch;
