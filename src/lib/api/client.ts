import createClient, { type HeadersOptions } from "openapi-fetch";
import type { paths } from "./generated/client/schema";
import { PUBLIC_API_URL } from "$env/static/public";

export const client = (token?: string) => {
	let headers: HeadersOptions = {};
	if (token) {
		headers = {
			// "content-type": "application-json",
			Authorization: `Bearer ${token}`,
		};
	}

	return createClient<paths>({
		baseUrl: PUBLIC_API_URL,
		headers,
	});
};
