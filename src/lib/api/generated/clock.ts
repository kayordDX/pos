// @ts-nocheck
/**
 * Generated by orval v6.27.1 🍺
 * Do not edit manually.
 * Kayord.Pos
 * OpenAPI spec version: v1
 */
import { createMutation, createQuery } from "@tanstack/svelte-query";
import type {
	CreateMutationOptions,
	CreateMutationResult,
	CreateQueryOptions,
	CreateQueryResult,
	MutationFunction,
	QueryFunction,
	QueryKey,
} from "@tanstack/svelte-query";
import type {
	ClockClockInRequest,
	ClockClockOutRequest,
	ClockListParams,
	EntitiesClock,
	EntitiesUser,
	ErrorResponse,
	InternalErrorResponse,
} from "./api.schemas";
import { useCustomClient } from "../mutator/useCustomClient";
import type { ErrorType, BodyType } from "../mutator/useCustomClient";

export const useClockListHook = () => {
	const clockList = useCustomClient<EntitiesUser[]>();

	return (params: ClockListParams) => {
		return clockList({ url: `/clock/list`, method: "GET", params });
	};
};

export const getClockListQueryKey = (params: ClockListParams) => {
	return [`/clock/list`, ...(params ? [params] : [])] as const;
};

export const useClockListQueryOptions = <
	TData = Awaited<ReturnType<ReturnType<typeof useClockListHook>>>,
	TError = ErrorType<ErrorResponse | void | InternalErrorResponse>,
>(
	params: ClockListParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<ReturnType<typeof useClockListHook>>>, TError, TData>
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
export type ClockListQueryError = ErrorType<ErrorResponse | void | InternalErrorResponse>;

export const createClockList = <
	TData = Awaited<ReturnType<ReturnType<typeof useClockListHook>>>,
	TError = ErrorType<ErrorResponse | void | InternalErrorResponse>,
>(
	params: ClockListParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<ReturnType<typeof useClockListHook>>>, TError, TData>
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

export const useClockClockOutHook = () => {
	const clockClockOut = useCustomClient<EntitiesClock>();

	return (clockClockOutRequest: BodyType<ClockClockOutRequest>) => {
		return clockClockOut({
			url: `/clock/out`,
			method: "POST",
			headers: { "Content-Type": "application/json" },
			data: clockClockOutRequest,
		});
	};
};

export const useClockClockOutMutationOptions = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<ReturnType<typeof useClockClockOutHook>>>,
		TError,
		{ data: BodyType<ClockClockOutRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<ReturnType<typeof useClockClockOutHook>>>,
	TError,
	{ data: BodyType<ClockClockOutRequest> },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const clockClockOut = useClockClockOutHook();

	const mutationFn: MutationFunction<
		Awaited<ReturnType<ReturnType<typeof useClockClockOutHook>>>,
		{ data: BodyType<ClockClockOutRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return clockClockOut(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type ClockClockOutMutationResult = NonNullable<
	Awaited<ReturnType<ReturnType<typeof useClockClockOutHook>>>
>;
export type ClockClockOutMutationBody = BodyType<ClockClockOutRequest>;
export type ClockClockOutMutationError = ErrorType<void | InternalErrorResponse>;

export const createClockClockOut = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<ReturnType<typeof useClockClockOutHook>>>,
		TError,
		{ data: BodyType<ClockClockOutRequest> },
		TContext
	>;
}): CreateMutationResult<
	Awaited<ReturnType<ReturnType<typeof useClockClockOutHook>>>,
	TError,
	{ data: BodyType<ClockClockOutRequest> },
	TContext
> => {
	const mutationOptions = useClockClockOutMutationOptions(options);

	return createMutation(mutationOptions);
};
export const useClockClockInHook = () => {
	const clockClockIn = useCustomClient<EntitiesClock>();

	return (clockClockInRequest: BodyType<ClockClockInRequest>) => {
		return clockClockIn({
			url: `/clock/in`,
			method: "POST",
			headers: { "Content-Type": "application/json" },
			data: clockClockInRequest,
		});
	};
};

export const useClockClockInMutationOptions = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<ReturnType<typeof useClockClockInHook>>>,
		TError,
		{ data: BodyType<ClockClockInRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<ReturnType<typeof useClockClockInHook>>>,
	TError,
	{ data: BodyType<ClockClockInRequest> },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const clockClockIn = useClockClockInHook();

	const mutationFn: MutationFunction<
		Awaited<ReturnType<ReturnType<typeof useClockClockInHook>>>,
		{ data: BodyType<ClockClockInRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return clockClockIn(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type ClockClockInMutationResult = NonNullable<
	Awaited<ReturnType<ReturnType<typeof useClockClockInHook>>>
>;
export type ClockClockInMutationBody = BodyType<ClockClockInRequest>;
export type ClockClockInMutationError = ErrorType<void | InternalErrorResponse>;

export const createClockClockIn = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<ReturnType<typeof useClockClockInHook>>>,
		TError,
		{ data: BodyType<ClockClockInRequest> },
		TContext
	>;
}): CreateMutationResult<
	Awaited<ReturnType<ReturnType<typeof useClockClockInHook>>>,
	TError,
	{ data: BodyType<ClockClockInRequest> },
	TContext
> => {
	const mutationOptions = useClockClockInMutationOptions(options);

	return createMutation(mutationOptions);
};
