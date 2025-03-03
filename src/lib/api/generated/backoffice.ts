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
	TableOrderBackOfficeParams,
	TableOrderBackOfficeResponse,
} from "./api.schemas";
import { customInstance } from "../mutator/customInstance.svelte";
import type { ErrorType } from "../mutator/customInstance.svelte";

export const tableOrderBackOffice = (params?: TableOrderBackOfficeParams) => {
	return customInstance<TableOrderBackOfficeResponse>({
		url: `/backOffice/getOrders`,
		method: "GET",
		params,
	});
};

export const getTableOrderBackOfficeQueryKey = (params?: TableOrderBackOfficeParams) => {
	return [`/backOffice/getOrders`, ...(params ? [params] : [])] as const;
};

export const getTableOrderBackOfficeQueryOptions = <
	TData = Awaited<ReturnType<typeof tableOrderBackOffice>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	params?: TableOrderBackOfficeParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<typeof tableOrderBackOffice>>, TError, TData>
		>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getTableOrderBackOfficeQueryKey(params);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof tableOrderBackOffice>>> = () =>
		tableOrderBackOffice(params);

	return { queryKey, queryFn, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<typeof tableOrderBackOffice>>,
		TError,
		TData
	> & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type TableOrderBackOfficeQueryResult = NonNullable<
	Awaited<ReturnType<typeof tableOrderBackOffice>>
>;
export type TableOrderBackOfficeQueryError = ErrorType<void | InternalErrorResponse>;

export function createTableOrderBackOffice<
	TData = Awaited<ReturnType<typeof tableOrderBackOffice>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	params?: TableOrderBackOfficeParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<typeof tableOrderBackOffice>>, TError, TData>
		>;
	}
): CreateQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {
	const queryOptions = getTableOrderBackOfficeQueryOptions(params, options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: DataTag<QueryKey, TData, TError>;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
}
