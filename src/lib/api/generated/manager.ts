// @ts-nocheck
/**
 * Generated by orval v6.25.0 🍺
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
	InternalErrorResponse,
	ManagerOrderViewParams,
	ManagerOrderViewResponse,
} from "./api.schemas";
import { useCustomClient } from "../mutator/useCustomClient";
import type { ErrorType } from "../mutator/useCustomClient";

export const useManagerOrderViewHook = () => {
	const managerOrderView = useCustomClient<ManagerOrderViewResponse[]>();

	return (params: ManagerOrderViewParams) => {
		return managerOrderView({ url: `/manager/viewOrders`, method: "GET", params });
	};
};

export const getManagerOrderViewQueryKey = (params: ManagerOrderViewParams) => {
	return [`/manager/viewOrders`, ...(params ? [params] : [])] as const;
};

export const useManagerOrderViewQueryOptions = <
	TData = Awaited<ReturnType<ReturnType<typeof useManagerOrderViewHook>>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	params: ManagerOrderViewParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<
				Awaited<ReturnType<ReturnType<typeof useManagerOrderViewHook>>>,
				TError,
				TData
			>
		>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getManagerOrderViewQueryKey(params);

	const managerOrderView = useManagerOrderViewHook();

	const queryFn: QueryFunction<
		Awaited<ReturnType<ReturnType<typeof useManagerOrderViewHook>>>
	> = () => managerOrderView(params);

	return { queryKey, queryFn, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<ReturnType<typeof useManagerOrderViewHook>>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type ManagerOrderViewQueryResult = NonNullable<
	Awaited<ReturnType<ReturnType<typeof useManagerOrderViewHook>>>
>;
export type ManagerOrderViewQueryError = ErrorType<void | InternalErrorResponse>;

export const createManagerOrderView = <
	TData = Awaited<ReturnType<ReturnType<typeof useManagerOrderViewHook>>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	params: ManagerOrderViewParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<
				Awaited<ReturnType<ReturnType<typeof useManagerOrderViewHook>>>,
				TError,
				TData
			>
		>;
	}
): CreateQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = useManagerOrderViewQueryOptions(params, options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: QueryKey;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
};