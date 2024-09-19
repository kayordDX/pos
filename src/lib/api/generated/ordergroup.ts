// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/**
 * Generated by orval v7.1.1 🍺
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
	TableOrderOfficeOrderBasedBackParams,
	TableOrderOfficeOrderBasedBackResponse,
} from "./api.schemas";
import { customInstance } from "../mutator/customInstance";
import type { ErrorType } from "../mutator/customInstance";

export const tableOrderOfficeOrderBasedBack = (params: TableOrderOfficeOrderBasedBackParams) => {
	return customInstance<TableOrderOfficeOrderBasedBackResponse>({
		url: `/orderGroup/getOrders`,
		method: "GET",
		params,
	});
};

export const getTableOrderOfficeOrderBasedBackQueryKey = (
	params: TableOrderOfficeOrderBasedBackParams
) => {
	return [`/orderGroup/getOrders`, ...(params ? [params] : [])] as const;
};

export const getTableOrderOfficeOrderBasedBackQueryOptions = <
	TData = Awaited<ReturnType<typeof tableOrderOfficeOrderBasedBack>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	params: TableOrderOfficeOrderBasedBackParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<typeof tableOrderOfficeOrderBasedBack>>, TError, TData>
		>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getTableOrderOfficeOrderBasedBackQueryKey(params);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof tableOrderOfficeOrderBasedBack>>> = () =>
		tableOrderOfficeOrderBasedBack(params);

	return { queryKey, queryFn, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<typeof tableOrderOfficeOrderBasedBack>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type TableOrderOfficeOrderBasedBackQueryResult = NonNullable<
	Awaited<ReturnType<typeof tableOrderOfficeOrderBasedBack>>
>;
export type TableOrderOfficeOrderBasedBackQueryError = ErrorType<void | InternalErrorResponse>;

export function createTableOrderOfficeOrderBasedBack<
	TData = Awaited<ReturnType<typeof tableOrderOfficeOrderBasedBack>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	params: TableOrderOfficeOrderBasedBackParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<typeof tableOrderOfficeOrderBasedBack>>, TError, TData>
		>;
	}
): CreateQueryResult<TData, TError> & { queryKey: QueryKey } {
	const queryOptions = getTableOrderOfficeOrderBasedBackQueryOptions(params, options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: QueryKey;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
}
