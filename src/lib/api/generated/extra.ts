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
import type { EntitiesExtra, InternalErrorResponse } from "./api.schemas";
import { customInstance } from "../mutator/customInstance.svelte";
import type { ErrorType } from "../mutator/customInstance.svelte";

export const extraGetAll = () => {
	return customInstance<EntitiesExtra[]>({ url: `/extra/all`, method: "GET" });
};

export const getExtraGetAllQueryKey = () => {
	return [`/extra/all`] as const;
};

export const getExtraGetAllQueryOptions = <
	TData = Awaited<ReturnType<typeof extraGetAll>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(options?: {
	query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof extraGetAll>>, TError, TData>>;
}) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getExtraGetAllQueryKey();

	const queryFn: QueryFunction<Awaited<ReturnType<typeof extraGetAll>>> = () => extraGetAll();

	return { queryKey, queryFn, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<typeof extraGetAll>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type ExtraGetAllQueryResult = NonNullable<Awaited<ReturnType<typeof extraGetAll>>>;
export type ExtraGetAllQueryError = ErrorType<void | InternalErrorResponse>;

export function createExtraGetAll<
	TData = Awaited<ReturnType<typeof extraGetAll>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(options?: {
	query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof extraGetAll>>, TError, TData>>;
}): CreateQueryResult<TData, TError> & { queryKey: QueryKey } {
	const queryOptions = getExtraGetAllQueryOptions(options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: QueryKey;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
}
