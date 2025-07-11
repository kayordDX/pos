// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * Kayord.Pos
 * OpenAPI spec version: v1
 */
import { createQuery } from "@tanstack/svelte-query";
import type {
	CreateQueryOptions,
	CreateQueryResult,
	DataTag,
	QueryClient,
	QueryFunction,
	QueryKey,
} from "@tanstack/svelte-query";

import type {
	InternalErrorResponse,
	ManagerOrderViewParams,
	ManagerOrderViewResponse,
} from "./api.schemas";

import { customInstance } from "../mutator/customInstance.svelte";
import type { ErrorType } from "../mutator/customInstance.svelte";

export const managerOrderView = (params?: ManagerOrderViewParams) => {
	return customInstance<ManagerOrderViewResponse[]>({
		url: `/manager/viewOrders`,
		method: "GET",
		params,
	});
};

export const getManagerOrderViewQueryKey = (params?: ManagerOrderViewParams) => {
	return [`/manager/viewOrders`, ...(params ? [params] : [])] as const;
};

export const getManagerOrderViewQueryOptions = <
	TData = Awaited<ReturnType<typeof managerOrderView>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	params?: ManagerOrderViewParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<typeof managerOrderView>>, TError, TData>
		>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getManagerOrderViewQueryKey(params);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof managerOrderView>>> = () =>
		managerOrderView(params);

	return { queryKey, queryFn, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<typeof managerOrderView>>,
		TError,
		TData
	> & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type ManagerOrderViewQueryResult = NonNullable<Awaited<ReturnType<typeof managerOrderView>>>;
export type ManagerOrderViewQueryError = ErrorType<void | InternalErrorResponse>;

export function createManagerOrderView<
	TData = Awaited<ReturnType<typeof managerOrderView>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	params?: ManagerOrderViewParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<typeof managerOrderView>>, TError, TData>
		>;
	},
	queryClient?: QueryClient
): CreateQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {
	const queryOptions = getManagerOrderViewQueryOptions(params, options);

	const query = createQuery(queryOptions, queryClient) as CreateQueryResult<TData, TError> & {
		queryKey: DataTag<QueryKey, TData, TError>;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
}
