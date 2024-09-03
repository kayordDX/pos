// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/**
 * Generated by orval v7.1.0 🍺
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
	TableOrderFrontOfficeParams,
	TableOrderFrontOfficeResponse,
} from "./api.schemas";
import { customInstance } from "../mutator/customInstance";
import type { ErrorType } from "../mutator/customInstance";

export const tableOrderFrontOffice = (params?: TableOrderFrontOfficeParams) => {
	return customInstance<TableOrderFrontOfficeResponse>({
		url: `/frontOffice/getOrders`,
		method: "GET",
		params,
	});
};

export const getTableOrderFrontOfficeQueryKey = (params?: TableOrderFrontOfficeParams) => {
	return [`/frontOffice/getOrders`, ...(params ? [params] : [])] as const;
};

export const getTableOrderFrontOfficeQueryOptions = <
	TData = Awaited<ReturnType<typeof tableOrderFrontOffice>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	params?: TableOrderFrontOfficeParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<typeof tableOrderFrontOffice>>, TError, TData>
		>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getTableOrderFrontOfficeQueryKey(params);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof tableOrderFrontOffice>>> = () =>
		tableOrderFrontOffice(params);

	return { queryKey, queryFn, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<typeof tableOrderFrontOffice>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type TableOrderFrontOfficeQueryResult = NonNullable<
	Awaited<ReturnType<typeof tableOrderFrontOffice>>
>;
export type TableOrderFrontOfficeQueryError = ErrorType<void | InternalErrorResponse>;

export function createTableOrderFrontOffice<
	TData = Awaited<ReturnType<typeof tableOrderFrontOffice>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	params?: TableOrderFrontOfficeParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<typeof tableOrderFrontOffice>>, TError, TData>
		>;
	}
): CreateQueryResult<TData, TError> & { queryKey: QueryKey } {
	const queryOptions = getTableOrderFrontOfficeQueryOptions(params, options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: QueryKey;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
}
