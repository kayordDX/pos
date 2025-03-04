// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/**
 * Generated by orval v7.6.0 🍺
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

import type { DivisionGetAllParams, EntitiesDivision, InternalErrorResponse } from "./api.schemas";

import { customInstance } from "../mutator/customInstance.svelte";
import type { ErrorType } from "../mutator/customInstance.svelte";

export const divisionGetAll = (params: DivisionGetAllParams) => {
	return customInstance<EntitiesDivision[]>({ url: `/division`, method: "GET", params });
};

export const getDivisionGetAllQueryKey = (params: DivisionGetAllParams) => {
	return [`/division`, ...(params ? [params] : [])] as const;
};

export const getDivisionGetAllQueryOptions = <
	TData = Awaited<ReturnType<typeof divisionGetAll>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	params: DivisionGetAllParams,
	options?: {
		query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof divisionGetAll>>, TError, TData>>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getDivisionGetAllQueryKey(params);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof divisionGetAll>>> = () =>
		divisionGetAll(params);

	return { queryKey, queryFn, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<typeof divisionGetAll>>,
		TError,
		TData
	> & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type DivisionGetAllQueryResult = NonNullable<Awaited<ReturnType<typeof divisionGetAll>>>;
export type DivisionGetAllQueryError = ErrorType<void | InternalErrorResponse>;

export function createDivisionGetAll<
	TData = Awaited<ReturnType<typeof divisionGetAll>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	params: DivisionGetAllParams,
	options?: {
		query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof divisionGetAll>>, TError, TData>>;
	}
): CreateQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {
	const queryOptions = getDivisionGetAllQueryOptions(params, options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: DataTag<QueryKey, TData, TError>;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
}
