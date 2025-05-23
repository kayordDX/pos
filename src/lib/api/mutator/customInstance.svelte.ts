import { getError, isValidationError } from "$lib/types";
import { session } from "$lib/firebase.svelte";
import qs from "qs";
import { info } from "$lib/stores/info.svelte";

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
	let fullUrl = `${info.kayordURL()}${url}`;
	if (params !== undefined) {
		const urlParams = qs.stringify(params);
		if (urlParams.length > 0) {
			fullUrl = fullUrl + "?" + urlParams;
		}
	}

	const token = (await session.user?.getIdToken()) ?? "";
	if (headers == undefined) {
		if (session.user != undefined) {
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
