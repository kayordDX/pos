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
	TableOrderBackOfficeParams,
	TableOrderBackOfficeResponse,
} from "./api.schemas";
import { useCustomClient } from "../mutator/useCustomClient";
import type { ErrorType } from "../mutator/useCustomClient";

export const useTableOrderBackOfficeHook = () => {
	const tableOrderBackOffice = useCustomClient<TableOrderBackOfficeResponse>();

	return (params?: TableOrderBackOfficeParams) => {
		return tableOrderBackOffice({ url: `/backOffice/getOrders`, method: "GET", params });
	};
};

export const getTableOrderBackOfficeQueryKey = (params?: TableOrderBackOfficeParams) => {
	return [`/backOffice/getOrders`, ...(params ? [params] : [])] as const;
};

export const useTableOrderBackOfficeQueryOptions = <
	TData = Awaited<ReturnType<ReturnType<typeof useTableOrderBackOfficeHook>>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	params?: TableOrderBackOfficeParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<
				Awaited<ReturnType<ReturnType<typeof useTableOrderBackOfficeHook>>>,
				TError,
				TData
			>
		>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getTableOrderBackOfficeQueryKey(params);

	const tableOrderBackOffice = useTableOrderBackOfficeHook();

	const queryFn: QueryFunction<
		Awaited<ReturnType<ReturnType<typeof useTableOrderBackOfficeHook>>>
	> = () => tableOrderBackOffice(params);

	return { queryKey, queryFn, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<ReturnType<typeof useTableOrderBackOfficeHook>>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type TableOrderBackOfficeQueryResult = NonNullable<
	Awaited<ReturnType<ReturnType<typeof useTableOrderBackOfficeHook>>>
>;
export type TableOrderBackOfficeQueryError = ErrorType<void | InternalErrorResponse>;

export const createTableOrderBackOffice = <
	TData = Awaited<ReturnType<ReturnType<typeof useTableOrderBackOfficeHook>>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	params?: TableOrderBackOfficeParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<
				Awaited<ReturnType<ReturnType<typeof useTableOrderBackOfficeHook>>>,
				TError,
				TData
			>
		>;
	}
): CreateQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = useTableOrderBackOfficeQueryOptions(params, options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: QueryKey;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
};
