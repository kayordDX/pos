// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/**
 * Generated by orval v7.3.0 🍺
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
import type { EntitiesDivision, InternalErrorResponse } from "./api.schemas";
import { customInstance } from "../mutator/customInstance.svelte";
import type { ErrorType } from "../mutator/customInstance.svelte";

export const divisionGetAll = () => {
	return customInstance<EntitiesDivision[]>({ url: `/division`, method: "GET" });
};

export const getDivisionGetAllQueryKey = () => {
	return [`/division`] as const;
};

export const getDivisionGetAllQueryOptions = <
	TData = Awaited<ReturnType<typeof divisionGetAll>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(options?: {
	query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof divisionGetAll>>, TError, TData>>;
}) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getDivisionGetAllQueryKey();

	const queryFn: QueryFunction<Awaited<ReturnType<typeof divisionGetAll>>> = () => divisionGetAll();

	return { queryKey, queryFn, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<typeof divisionGetAll>>,
		TError,
		TData
	> & { queryKey: DataTag<QueryKey, TData> };
};

export type DivisionGetAllQueryResult = NonNullable<Awaited<ReturnType<typeof divisionGetAll>>>;
export type DivisionGetAllQueryError = ErrorType<void | InternalErrorResponse>;

export function createDivisionGetAll<
	TData = Awaited<ReturnType<typeof divisionGetAll>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(options?: {
	query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof divisionGetAll>>, TError, TData>>;
}): CreateQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {
	const queryOptions = getDivisionGetAllQueryOptions(options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: DataTag<QueryKey, TData>;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
}
