// @ts-nocheck
/**
 * Generated by orval v6.24.0 🍺
 * Do not edit manually.
 * Kayord.Pos
 * OpenAPI spec version: v1
 */
import { createQuery } from "@tanstack/svelte-query";
import type {
	CreateQueryOptions,
	CreateQueryResult,
	QueryFunction,
	QueryKey,
} from "@tanstack/svelte-query";
import type {
	CommonWrapperResultOfResponse,
	InternalErrorResponse,
	PayGetLinkParams,
} from "./api.schemas";
import { useCustomClient } from "../mutator/useCustomClient";
import type { ErrorType } from "../mutator/useCustomClient";

export const usePayStatusHook = () => {
	const payStatus = useCustomClient<unknown>();

	return (reference: string | null) => {
		return payStatus({ url: `/pay/status/${reference}`, method: "GET" });
	};
};

export const getPayStatusQueryKey = (reference: string | null) => {
	return [`/pay/status/${reference}`] as const;
};

export const usePayStatusQueryOptions = <
	TData = Awaited<ReturnType<ReturnType<typeof usePayStatusHook>>>,
	TError = ErrorType<InternalErrorResponse>,
>(
	reference: string | null,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<ReturnType<typeof usePayStatusHook>>>, TError, TData>
		>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getPayStatusQueryKey(reference);

	const payStatus = usePayStatusHook();

	const queryFn: QueryFunction<Awaited<ReturnType<ReturnType<typeof usePayStatusHook>>>> = () =>
		payStatus(reference);

	return { queryKey, queryFn, enabled: !!reference, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<ReturnType<typeof usePayStatusHook>>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type PayStatusQueryResult = NonNullable<
	Awaited<ReturnType<ReturnType<typeof usePayStatusHook>>>
>;
export type PayStatusQueryError = ErrorType<InternalErrorResponse>;

export const createPayStatus = <
	TData = Awaited<ReturnType<ReturnType<typeof usePayStatusHook>>>,
	TError = ErrorType<InternalErrorResponse>,
>(
	reference: string | null,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<ReturnType<typeof usePayStatusHook>>>, TError, TData>
		>;
	}
): CreateQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = usePayStatusQueryOptions(reference, options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: QueryKey;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
};

export const usePayGetLinkHook = () => {
	const payGetLink = useCustomClient<CommonWrapperResultOfResponse>();

	return (params: PayGetLinkParams) => {
		return payGetLink({ url: `/pay/getLink`, method: "GET", params });
	};
};

export const getPayGetLinkQueryKey = (params: PayGetLinkParams) => {
	return [`/pay/getLink`, ...(params ? [params] : [])] as const;
};

export const usePayGetLinkQueryOptions = <
	TData = Awaited<ReturnType<ReturnType<typeof usePayGetLinkHook>>>,
	TError = ErrorType<InternalErrorResponse>,
>(
	params: PayGetLinkParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<ReturnType<typeof usePayGetLinkHook>>>, TError, TData>
		>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getPayGetLinkQueryKey(params);

	const payGetLink = usePayGetLinkHook();

	const queryFn: QueryFunction<Awaited<ReturnType<ReturnType<typeof usePayGetLinkHook>>>> = () =>
		payGetLink(params);

	return { queryKey, queryFn, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<ReturnType<typeof usePayGetLinkHook>>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type PayGetLinkQueryResult = NonNullable<
	Awaited<ReturnType<ReturnType<typeof usePayGetLinkHook>>>
>;
export type PayGetLinkQueryError = ErrorType<InternalErrorResponse>;

export const createPayGetLink = <
	TData = Awaited<ReturnType<ReturnType<typeof usePayGetLinkHook>>>,
	TError = ErrorType<InternalErrorResponse>,
>(
	params: PayGetLinkParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<ReturnType<typeof usePayGetLinkHook>>>, TError, TData>
		>;
	}
): CreateQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = usePayGetLinkQueryOptions(params, options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: QueryKey;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
};