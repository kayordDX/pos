import { getError, isValidationError } from "$lib/types";
import { session } from "$lib/firebase.svelte";
import { info } from "$lib/stores/info.svelte";

const getUrl = (contextUrl: string): string => {
	const baseUrl = info.kayordURL();
	const url = new URL(baseUrl + contextUrl);
	const pathname = url.pathname;
	const search = url.search;
	const requestUrl = new URL(`${baseUrl}${pathname}${search}`);
	return requestUrl.toString();
};

const getHeaders = (token: string, headers?: HeadersInit): HeadersInit => {
	if (headers == undefined) {
		if (session.user != undefined) {
			headers = {
				Authorization: `Bearer ${token}`,
			};
		}
	}
	return {
		...headers,
		Authorization: `Bearer ${token}`,
	};
};

const getBody = async <T>(resp: Response): Promise<T> => {
	if (resp.ok) {
		// if (resp.status == 204) return null as unknown as Promise<T>;

		// const contentType = resp.headers.get("content-type");

		// if (contentType && contentType.includes("application/pdf")) {
		// 	return resp.blob() as Promise<T>;
		// }

		return resp.json() as T;
	} else {
		if (resp.status == 401) {
			// TODO: Possibly refresh token from lib/firebase
			throw new Error("Unauthorized", { cause: "401" });
		}
		if (resp.status == 403) {
			throw new Error("Forbidden", { cause: "403" });
		}
		if (resp.status == 404) {
			throw new Error("Not found", { cause: "404" });
		}
		// Error response
		const errorResult = await resp.json();
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

export const customInstance = async <T>(url: string, options: RequestInit): Promise<T> => {
	const requestUrl = getUrl(url);
	const token = (await session.user?.getIdToken()) ?? "";
	const requestHeaders = getHeaders(token, options.headers);

	const requestInit: RequestInit = {
		...options,
		headers: requestHeaders,
	};
	const request = new Request(requestUrl, requestInit);
	const response = await fetch(request);

	return (await response.json()) as T;

	// const data = await getBody<T>(response);
	// return data as T;
};

export default customInstance;

export type ErrorType<ErrorData> = ErrorData;

export type BodyType<BodyData> = BodyData;
