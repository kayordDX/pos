// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/**
 * Generated by orval v6.31.0 🍺
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
import { customInstance } from "../mutator/customInstance";
import type { ErrorType } from "../mutator/customInstance";

export const test = () => {
	return customInstance<boolean>({ url: `/test`, method: "GET" });
};

export const getTestQueryKey = () => {
	return [`/test`] as const;
};

export const getTestQueryOptions = <
	TData = Awaited<ReturnType<typeof test>>,
	TError = ErrorType<InternalErrorResponse>,
>(options?: {
	query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof test>>, TError, TData>>;
}) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getTestQueryKey();

	const queryFn: QueryFunction<Awaited<ReturnType<typeof test>>> = () => test();

	return { queryKey, queryFn, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<typeof test>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type TestQueryResult = NonNullable<Awaited<ReturnType<typeof test>>>;
export type TestQueryError = ErrorType<InternalErrorResponse>;

export const createTest = <
	TData = Awaited<ReturnType<typeof test>>,
	TError = ErrorType<InternalErrorResponse>,
>(options?: {
	query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof test>>, TError, TData>>;
}): CreateQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = getTestQueryOptions(options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: QueryKey;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
};
