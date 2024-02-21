import { get } from "svelte/store";
import { isAPIError, isValidationError } from "$lib/types";
import { env } from "$env/dynamic/public";
import { session } from "$lib/stores/session";
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

const callAPIToRefreshToken = async () => {
	await fetch("/api");
};

export const useCustomClient = <T>(): CustomClient<T> => {
	const userData = get(session);

	return async ({ url, method, params, headers, data }) => {
		let fullUrl = `${env.PUBLIC_API_URL}${url}`;
		if (params !== undefined) {
			const urlParams = qs.stringify(params);
			if (urlParams.length > 0) {
				fullUrl = fullUrl + "?" + urlParams;
			}
		}

		if (headers == undefined) {
			if (userData != undefined) {
				headers = {
					Authorization: `Bearer ${userData?.token}`,
				};
			}
		}

		if (headers) {
			if (headers.Authorization == undefined) {
				headers.Authorization = `Bearer ${userData?.token}`;
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
				// Check if this failed because of token
				if (userData) {
					if (Date.now() < userData.tokenExpires) {
						callAPIToRefreshToken();
					}
				}
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
