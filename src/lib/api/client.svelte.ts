import createClient, { type Middleware } from "openapi-fetch";
import type { paths } from "./generated/client/schema";
import { browser } from "$app/environment";
import { session } from "$lib/firebase.svelte";
import { info } from "$lib/stores/info.svelte";

const myMiddleware: Middleware = {
	async onRequest({ request }) {
		if (browser) {
			const token = (await session.user?.getIdToken()) ?? "";
			request.headers.set("Authorization", `Bearer ${token}`);
		}
		if (request.method != "GET") {
			request.headers.set("Content-Type", "application/json");
		}
		return request;
	},
};

export const client = createClient<paths>({
	baseUrl: info.kayordURL(),
	headers: {
		"Content-Type": null,
	},
});
client.use(myMiddleware);
