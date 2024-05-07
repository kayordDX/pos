// @ts-nocheck
/**
 * Generated by orval v6.28.2 🍺
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
import type { InternalErrorResponse } from "./api.schemas";
import { useCustomClient } from "../mutator/useCustomClient";
import type { ErrorType } from "../mutator/useCustomClient";

export const useTestHook = () => {
	const test = useCustomClient<boolean>();

	return () => {
		return test({ url: `/test`, method: "GET" });
	};
};

export const getTestQueryKey = () => {
	return [`/test`] as const;
};

export const useTestQueryOptions = <
	TData = Awaited<ReturnType<ReturnType<typeof useTestHook>>>,
	TError = ErrorType<InternalErrorResponse>,
>(options?: {
	query?: Partial<
		CreateQueryOptions<Awaited<ReturnType<ReturnType<typeof useTestHook>>>, TError, TData>
	>;
}) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getTestQueryKey();

	const test = useTestHook();

	const queryFn: QueryFunction<Awaited<ReturnType<ReturnType<typeof useTestHook>>>> = () => test();

	return { queryKey, queryFn, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<ReturnType<typeof useTestHook>>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type TestQueryResult = NonNullable<Awaited<ReturnType<ReturnType<typeof useTestHook>>>>;
export type TestQueryError = ErrorType<InternalErrorResponse>;

export const createTest = <
	TData = Awaited<ReturnType<ReturnType<typeof useTestHook>>>,
	TError = ErrorType<InternalErrorResponse>,
>(options?: {
	query?: Partial<
		CreateQueryOptions<Awaited<ReturnType<ReturnType<typeof useTestHook>>>, TError, TData>
	>;
}): CreateQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = useTestQueryOptions(options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: QueryKey;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
};
