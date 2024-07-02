import { get } from "svelte/store";
import { getError, isValidationError } from "$lib/types";
import { PUBLIC_API_URL } from "$env/static/public";
import { session } from "$lib/firebase";
import qs from "qs";

export const customInstance = async <T>({
	url,
	method,
	params,
	headers,
	data,
}: {
	url: string;
	method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	params?: Record<string, any>;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	headers?: Record<string, any>;
	data?: BodyType<unknown>;
}): Promise<T> => {
	let fullUrl = `${PUBLIC_API_URL}${url}`;
	if (params !== undefined) {
		const urlParams = qs.stringify(params);
		if (urlParams.length > 0) {
			fullUrl = fullUrl + "?" + urlParams;
		}
	}

	const token = (await get(session)?.getIdToken()) ?? "";
	if (headers == undefined) {
		if (get(session) != undefined) {
			headers = {
				Authorization: `Bearer ${token}`,
			};
		}
	}

	if (headers) {
		if (headers.Authorization == undefined) {
			headers.Authorization = `Bearer ${token}`;
		}
	}

	const response = await fetch(fullUrl, {
		method,
		headers: {
			...headers,
			// Authorization: `Bearer ${token}`,
		},
		...(data ? { body: JSON.stringify(data) } : {}),
	});

	if (response.ok) {
		if (response.status == 204) return null as unknown as T;
		return response.json();
	} else {
		if (response.status == 401) {
			// TODO: Possibly refresh token from lib/firebase
			throw new Error("Unauthorized", { cause: "401" });
		}
		if (response.status == 403) {
			throw new Error("Forbidden", { cause: "403" });
		}
		if (response.status == 404) {
			throw new Error("Not found", { cause: "404" });
		}
		// Error response
		const errorResult = await response.json();
		if (isValidationError(errorResult)) {
			const errorMessage = Object.values(errorResult.errors ?? []).map((e) => e.toString());
			throw new Error(errorResult.message, {
				cause: errorMessage.join("\n"),
			});
		} else {
			throw new Error(getError(errorResult).message);
		}
	}
};

export default customInstance;

export type ErrorType<ErrorData> = ErrorData;

export type BodyType<BodyData> = BodyData;
