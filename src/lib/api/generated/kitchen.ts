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
import type { InternalErrorResponse, TableOrderKitchenResponse } from "./api.schemas";
import { useCustomClient } from "../mutator/useCustomClient";
import type { ErrorType } from "../mutator/useCustomClient";

export const useTableOrderKitchenHook = () => {
	const tableOrderKitchen = useCustomClient<TableOrderKitchenResponse[]>();

	return () => {
		return tableOrderKitchen({ url: `/kitchen/getOrders`, method: "GET" });
	};
};

export const getTableOrderKitchenQueryKey = () => {
	return [`/kitchen/getOrders`] as const;
};

export const useTableOrderKitchenQueryOptions = <
	TData = Awaited<ReturnType<ReturnType<typeof useTableOrderKitchenHook>>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(options?: {
	query?: Partial<
		CreateQueryOptions<
			Awaited<ReturnType<ReturnType<typeof useTableOrderKitchenHook>>>,
			TError,
			TData
		>
	>;
}) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getTableOrderKitchenQueryKey();

	const tableOrderKitchen = useTableOrderKitchenHook();

	const queryFn: QueryFunction<
		Awaited<ReturnType<ReturnType<typeof useTableOrderKitchenHook>>>
	> = () => tableOrderKitchen();

	return { queryKey, queryFn, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<ReturnType<typeof useTableOrderKitchenHook>>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type TableOrderKitchenQueryResult = NonNullable<
	Awaited<ReturnType<ReturnType<typeof useTableOrderKitchenHook>>>
>;
export type TableOrderKitchenQueryError = ErrorType<void | InternalErrorResponse>;

export const createTableOrderKitchen = <
	TData = Awaited<ReturnType<ReturnType<typeof useTableOrderKitchenHook>>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(options?: {
	query?: Partial<
		CreateQueryOptions<
			Awaited<ReturnType<ReturnType<typeof useTableOrderKitchenHook>>>,
			TError,
			TData
		>
	>;
}): CreateQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = useTableOrderKitchenQueryOptions(options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: QueryKey;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
};
