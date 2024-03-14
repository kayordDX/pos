import { get } from "svelte/store";
import { isAPIError, isValidationError } from "$lib/types";
import { PUBLIC_API_URL } from "$env/static/public";
import { session } from "$lib/firebase";
import qs from "qs";

type CustomClient<T> = (data: {
	url: string;
	method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	params?: Record<string, any>;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	headers?: Record<string, any>;
	data?: BodyType<unknown>;
	signal?: AbortSignal;
}) => Promise<T>;

export const useCustomClient = <T>(): CustomClient<T> => {
	return async ({ url, method, params, headers, data }) => {
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
			// Error response
			const errorResult = await response.json();
			if (isValidationError(errorResult)) {
				const errorMessage = Object.values(errorResult.errors ?? []).map((e) => e.toString());
				throw new Error(errorResult.message, {
					cause: errorMessage.join("\n"),
				});
			} else if (isAPIError(errorResult)) {
				throw new Error(errorResult.title);
			} else {
				throw new Error("Network response was not ok");
			}
		}
	};
};

export default useCustomClient;

export type ErrorType<ErrorData> = ErrorData;

export type BodyType<BodyData> = BodyData;
