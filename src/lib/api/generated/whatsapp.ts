// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/**
 * Generated by orval v7.5.0 🍺
 * Do not edit manually.
 * Kayord.Pos
 * OpenAPI spec version: v1
 */
import { createQuery } from "@tanstack/svelte-query";
import type {
	CreateQueryOptions,
	CreateQueryResult,
	DataTag,
	QueryFunction,
	QueryKey,
} from "@tanstack/svelte-query";
import type {
	InternalErrorResponse,
	ServicesWhatsappQrResponse,
	ServicesWhatsappResponse,
	ServicesWhatsappStatus,
} from "./api.schemas";
import { customInstance } from "../mutator/customInstance.svelte";
import type { ErrorType } from "../mutator/customInstance.svelte";

export const whatsappStatus = () => {
	return customInstance<ServicesWhatsappStatus>({ url: `/whatsapp/status`, method: "GET" });
};

export const getWhatsappStatusQueryKey = () => {
	return [`/whatsapp/status`] as const;
};

export const getWhatsappStatusQueryOptions = <
	TData = Awaited<ReturnType<typeof whatsappStatus>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(options?: {
	query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof whatsappStatus>>, TError, TData>>;
}) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getWhatsappStatusQueryKey();

	const queryFn: QueryFunction<Awaited<ReturnType<typeof whatsappStatus>>> = () => whatsappStatus();

	return { queryKey, queryFn, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<typeof whatsappStatus>>,
		TError,
		TData
	> & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type WhatsappStatusQueryResult = NonNullable<Awaited<ReturnType<typeof whatsappStatus>>>;
export type WhatsappStatusQueryError = ErrorType<void | InternalErrorResponse>;

export function createWhatsappStatus<
	TData = Awaited<ReturnType<typeof whatsappStatus>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(options?: {
	query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof whatsappStatus>>, TError, TData>>;
}): CreateQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {
	const queryOptions = getWhatsappStatusQueryOptions(options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: DataTag<QueryKey, TData, TError>;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
}

export const whatsappRestart = () => {
	return customInstance<ServicesWhatsappResponse[]>({ url: `/whatsapp/restart`, method: "GET" });
};

export const getWhatsappRestartQueryKey = () => {
	return [`/whatsapp/restart`] as const;
};

export const getWhatsappRestartQueryOptions = <
	TData = Awaited<ReturnType<typeof whatsappRestart>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(options?: {
	query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof whatsappRestart>>, TError, TData>>;
}) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getWhatsappRestartQueryKey();

	const queryFn: QueryFunction<Awaited<ReturnType<typeof whatsappRestart>>> = () =>
		whatsappRestart();

	return { queryKey, queryFn, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<typeof whatsappRestart>>,
		TError,
		TData
	> & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type WhatsappRestartQueryResult = NonNullable<Awaited<ReturnType<typeof whatsappRestart>>>;
export type WhatsappRestartQueryError = ErrorType<void | InternalErrorResponse>;

export function createWhatsappRestart<
	TData = Awaited<ReturnType<typeof whatsappRestart>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(options?: {
	query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof whatsappRestart>>, TError, TData>>;
}): CreateQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {
	const queryOptions = getWhatsappRestartQueryOptions(options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: DataTag<QueryKey, TData, TError>;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
}

export const whatsappQrCode = () => {
	return customInstance<ServicesWhatsappQrResponse>({ url: `/whatsapp/qr`, method: "GET" });
};

export const getWhatsappQrCodeQueryKey = () => {
	return [`/whatsapp/qr`] as const;
};

export const getWhatsappQrCodeQueryOptions = <
	TData = Awaited<ReturnType<typeof whatsappQrCode>>,
	TError = ErrorType<InternalErrorResponse>,
>(options?: {
	query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof whatsappQrCode>>, TError, TData>>;
}) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getWhatsappQrCodeQueryKey();

	const queryFn: QueryFunction<Awaited<ReturnType<typeof whatsappQrCode>>> = () => whatsappQrCode();

	return { queryKey, queryFn, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<typeof whatsappQrCode>>,
		TError,
		TData
	> & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type WhatsappQrCodeQueryResult = NonNullable<Awaited<ReturnType<typeof whatsappQrCode>>>;
export type WhatsappQrCodeQueryError = ErrorType<InternalErrorResponse>;

export function createWhatsappQrCode<
	TData = Awaited<ReturnType<typeof whatsappQrCode>>,
	TError = ErrorType<InternalErrorResponse>,
>(options?: {
	query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof whatsappQrCode>>, TError, TData>>;
}): CreateQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {
	const queryOptions = getWhatsappQrCodeQueryOptions(options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: DataTag<QueryKey, TData, TError>;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
}
