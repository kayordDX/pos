// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/**
 * Generated by orval v7.8.0 🍺
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
	DataTag,
	MutationFunction,
	QueryClient,
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

import { customInstance } from "../mutator/customInstance.svelte";
import type { ErrorType, BodyType } from "../mutator/customInstance.svelte";

export const clockList = (params: ClockListParams) => {
	return customInstance<EntitiesUser[]>({ url: `/clock/list`, method: "GET", params });
};

export const getClockListQueryKey = (params: ClockListParams) => {
	return [`/clock/list`, ...(params ? [params] : [])] as const;
};

export const getClockListQueryOptions = <
	TData = Awaited<ReturnType<typeof clockList>>,
	TError = ErrorType<ErrorResponse | void | InternalErrorResponse>,
>(
	params: ClockListParams,
	options?: {
		query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof clockList>>, TError, TData>>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getClockListQueryKey(params);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof clockList>>> = () => clockList(params);

	return { queryKey, queryFn, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<typeof clockList>>,
		TError,
		TData
	> & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type ClockListQueryResult = NonNullable<Awaited<ReturnType<typeof clockList>>>;
export type ClockListQueryError = ErrorType<ErrorResponse | void | InternalErrorResponse>;

export function createClockList<
	TData = Awaited<ReturnType<typeof clockList>>,
	TError = ErrorType<ErrorResponse | void | InternalErrorResponse>,
>(
	params: ClockListParams,
	options?: {
		query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof clockList>>, TError, TData>>;
	},
	queryClient?: QueryClient
): CreateQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {
	const queryOptions = getClockListQueryOptions(params, options);

	const query = createQuery(queryOptions, queryClient) as CreateQueryResult<TData, TError> & {
		queryKey: DataTag<QueryKey, TData, TError>;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
}

export const clockClockOut = (clockClockOutRequest: BodyType<ClockClockOutRequest>) => {
	return customInstance<EntitiesClock>({
		url: `/clock/out`,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		data: clockClockOutRequest,
	});
};

export const getClockClockOutMutationOptions = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof clockClockOut>>,
		TError,
		{ data: BodyType<ClockClockOutRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<typeof clockClockOut>>,
	TError,
	{ data: BodyType<ClockClockOutRequest> },
	TContext
> => {
	const mutationKey = ["clockClockOut"];
	const { mutation: mutationOptions } = options
		? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey
			? options
			: { ...options, mutation: { ...options.mutation, mutationKey } }
		: { mutation: { mutationKey } };

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof clockClockOut>>,
		{ data: BodyType<ClockClockOutRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return clockClockOut(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type ClockClockOutMutationResult = NonNullable<Awaited<ReturnType<typeof clockClockOut>>>;
export type ClockClockOutMutationBody = BodyType<ClockClockOutRequest>;
export type ClockClockOutMutationError = ErrorType<void | InternalErrorResponse>;

export const createClockClockOut = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(
	options?: {
		mutation?: CreateMutationOptions<
			Awaited<ReturnType<typeof clockClockOut>>,
			TError,
			{ data: BodyType<ClockClockOutRequest> },
			TContext
		>;
	},
	queryClient?: QueryClient
): CreateMutationResult<
	Awaited<ReturnType<typeof clockClockOut>>,
	TError,
	{ data: BodyType<ClockClockOutRequest> },
	TContext
> => {
	const mutationOptions = getClockClockOutMutationOptions(options);

	return createMutation(mutationOptions, queryClient);
};
export const clockClockIn = (clockClockInRequest: BodyType<ClockClockInRequest>) => {
	return customInstance<EntitiesClock>({
		url: `/clock/in`,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		data: clockClockInRequest,
	});
};

export const getClockClockInMutationOptions = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof clockClockIn>>,
		TError,
		{ data: BodyType<ClockClockInRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<typeof clockClockIn>>,
	TError,
	{ data: BodyType<ClockClockInRequest> },
	TContext
> => {
	const mutationKey = ["clockClockIn"];
	const { mutation: mutationOptions } = options
		? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey
			? options
			: { ...options, mutation: { ...options.mutation, mutationKey } }
		: { mutation: { mutationKey } };

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof clockClockIn>>,
		{ data: BodyType<ClockClockInRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return clockClockIn(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type ClockClockInMutationResult = NonNullable<Awaited<ReturnType<typeof clockClockIn>>>;
export type ClockClockInMutationBody = BodyType<ClockClockInRequest>;
export type ClockClockInMutationError = ErrorType<void | InternalErrorResponse>;

export const createClockClockIn = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(
	options?: {
		mutation?: CreateMutationOptions<
			Awaited<ReturnType<typeof clockClockIn>>,
			TError,
			{ data: BodyType<ClockClockInRequest> },
			TContext
		>;
	},
	queryClient?: QueryClient
): CreateMutationResult<
	Awaited<ReturnType<typeof clockClockIn>>,
	TError,
	{ data: BodyType<ClockClockInRequest> },
	TContext
> => {
	const mutationOptions = getClockClockInMutationOptions(options);

	return createMutation(mutationOptions, queryClient);
};
