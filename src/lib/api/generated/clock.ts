/**
 * Generated by orval v6.21.0 🍺
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
import type { ClockListParams, ErrorResponse, InternalErrorResponse, Staff } from "./api.schemas";
import { useCustomClient } from "../mutator/useCustomClient";
import type { ErrorType } from "../mutator/useCustomClient";

export const useClockListHook = () => {
	const clockList = useCustomClient<Staff[]>();

	return (params: ClockListParams) => {
		return clockList({ url: `/clock/list`, method: "GET", params });
	};
};

export const getClockListQueryKey = (params: ClockListParams) => {
	return [`/clock/list`, ...(params ? [params] : [])] as const;
};

export const useClockListQueryOptions = <
	TData = Awaited<ReturnType<ReturnType<typeof useClockListHook>>>,
	TError = ErrorType<ErrorResponse | InternalErrorResponse>,
>(
	params: ClockListParams,
	options?: {
		query?: CreateQueryOptions<
			Awaited<ReturnType<ReturnType<typeof useClockListHook>>>,
			TError,
			TData
		>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getClockListQueryKey(params);

	const clockList = useClockListHook();

	const queryFn: QueryFunction<Awaited<ReturnType<ReturnType<typeof useClockListHook>>>> = () =>
		clockList(params);

	return { queryKey, queryFn, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<ReturnType<typeof useClockListHook>>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type ClockListQueryResult = NonNullable<
	Awaited<ReturnType<ReturnType<typeof useClockListHook>>>
>;
export type ClockListQueryError = ErrorType<ErrorResponse | InternalErrorResponse>;

export const createClockList = <
	TData = Awaited<ReturnType<ReturnType<typeof useClockListHook>>>,
	TError = ErrorType<ErrorResponse | InternalErrorResponse>,
>(
	params: ClockListParams,
	options?: {
		query?: CreateQueryOptions<
			Awaited<ReturnType<ReturnType<typeof useClockListHook>>>,
			TError,
			TData
		>;
	}
): CreateQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = useClockListQueryOptions(params, options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: QueryKey;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
};
