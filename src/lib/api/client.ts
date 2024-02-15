import createClient, { type HeadersOptions } from "openapi-fetch";
import type { paths } from "./generated/client/schema";
import { env } from "$env/dynamic/public";

export const client = (token?: string) => {
	let headers: HeadersOptions = {};
	if (token) {
		headers = {
			"Content-Type": null,
			Authorization: `Bearer ${token}`,
		};
	}
	return createClient<paths>({
		baseUrl: env.PUBLIC_API_URL,
		headers,
	});
};
