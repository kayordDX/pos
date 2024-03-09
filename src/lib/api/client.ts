import createClient, { type Middleware } from "openapi-fetch";
import type { paths } from "./generated/client/schema";
import { env } from "$env/dynamic/public";
import { browser } from "$app/environment";
import { get } from "svelte/store";
import { session } from "$lib/firebase";

const myMiddleware: Middleware = {
	async onRequest(req) {
		if (browser) {
			const token = (await get(session)?.getIdToken()) ?? "";
			req.headers.set("Authorization", `Bearer ${token}`);
		}
		if (req.method != "GET") {
			req.headers.set("Content-Type", "application/json");
		}
		return req;
	},
};

export const client = createClient<paths>({
	baseUrl: env.PUBLIC_API_URL,
	headers: {
		"Content-Type": null,
	},
});
client.use(myMiddleware);
