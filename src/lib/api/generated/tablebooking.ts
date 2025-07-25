// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/**
 * Generated by orval v7.10.0 🍺
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
	EntitiesCashUpUserItem,
	EntitiesTableBooking,
	ErrorResponse,
	InternalErrorResponse,
	TableBookingCloseRequest,
	TableBookingCreateRequest,
	TableBookingGetResponse,
	TableBookingHistoryParams,
	TableBookingHistoryResponse,
	TableBookingHistoryUserParams,
	TableBookingPaymentEditRequest,
	TableBookingPeriodHistoryParams,
	TableBookingTransferRequest,
} from "./api.schemas";

import { customInstance } from "../mutator/customInstance.svelte";
import type { ErrorType, BodyType } from "../mutator/customInstance.svelte";

export const tableBookingTransfer = (
	tableBookingTransferRequest: BodyType<TableBookingTransferRequest>
) => {
	return customInstance<void>({
		url: `/tableBooking/transfer`,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		data: tableBookingTransferRequest,
	});
};

export const getTableBookingTransferMutationOptions = <
	TError = ErrorType<ErrorResponse | void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof tableBookingTransfer>>,
		TError,
		{ data: BodyType<TableBookingTransferRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<typeof tableBookingTransfer>>,
	TError,
	{ data: BodyType<TableBookingTransferRequest> },
	TContext
> => {
	const mutationKey = ["tableBookingTransfer"];
	const { mutation: mutationOptions } = options
		? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey
			? options
			: { ...options, mutation: { ...options.mutation, mutationKey } }
		: { mutation: { mutationKey } };

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof tableBookingTransfer>>,
		{ data: BodyType<TableBookingTransferRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return tableBookingTransfer(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type TableBookingTransferMutationResult = NonNullable<
	Awaited<ReturnType<typeof tableBookingTransfer>>
>;
export type TableBookingTransferMutationBody = BodyType<TableBookingTransferRequest>;
export type TableBookingTransferMutationError = ErrorType<
	ErrorResponse | void | InternalErrorResponse
>;

export const createTableBookingTransfer = <
	TError = ErrorType<ErrorResponse | void | InternalErrorResponse>,
	TContext = unknown,
>(
	options?: {
		mutation?: CreateMutationOptions<
			Awaited<ReturnType<typeof tableBookingTransfer>>,
			TError,
			{ data: BodyType<TableBookingTransferRequest> },
			TContext
		>;
	},
	queryClient?: QueryClient
): CreateMutationResult<
	Awaited<ReturnType<typeof tableBookingTransfer>>,
	TError,
	{ data: BodyType<TableBookingTransferRequest> },
	TContext
> => {
	const mutationOptions = getTableBookingTransferMutationOptions(options);

	return createMutation(mutationOptions, queryClient);
};
export const tableBookingPeriodHistory = (
	salesPeriodId: number,
	params: TableBookingPeriodHistoryParams
) => {
	return customInstance<TableBookingHistoryResponse[]>({
		url: `/tableBooking/history/salesPeriod/${salesPeriodId}`,
		method: "GET",
		params,
	});
};

export const getTableBookingPeriodHistoryQueryKey = (
	salesPeriodId: number,
	params: TableBookingPeriodHistoryParams
) => {
	return [
		`/tableBooking/history/salesPeriod/${salesPeriodId}`,
		...(params ? [params] : []),
	] as const;
};

export const getTableBookingPeriodHistoryQueryOptions = <
	TData = Awaited<ReturnType<typeof tableBookingPeriodHistory>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	salesPeriodId: number,
	params: TableBookingPeriodHistoryParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<typeof tableBookingPeriodHistory>>, TError, TData>
		>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey =
		queryOptions?.queryKey ?? getTableBookingPeriodHistoryQueryKey(salesPeriodId, params);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof tableBookingPeriodHistory>>> = () =>
		tableBookingPeriodHistory(salesPeriodId, params);

	return { queryKey, queryFn, enabled: !!salesPeriodId, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<typeof tableBookingPeriodHistory>>,
		TError,
		TData
	> & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type TableBookingPeriodHistoryQueryResult = NonNullable<
	Awaited<ReturnType<typeof tableBookingPeriodHistory>>
>;
export type TableBookingPeriodHistoryQueryError = ErrorType<void | InternalErrorResponse>;

export function createTableBookingPeriodHistory<
	TData = Awaited<ReturnType<typeof tableBookingPeriodHistory>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	salesPeriodId: number,
	params: TableBookingPeriodHistoryParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<typeof tableBookingPeriodHistory>>, TError, TData>
		>;
	},
	queryClient?: QueryClient
): CreateQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {
	const queryOptions = getTableBookingPeriodHistoryQueryOptions(salesPeriodId, params, options);

	const query = createQuery(queryOptions, queryClient) as CreateQueryResult<TData, TError> & {
		queryKey: DataTag<QueryKey, TData, TError>;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
}

export const tableBookingPaymentEdit = (
	tableBookingPaymentEditRequest: BodyType<TableBookingPaymentEditRequest>
) => {
	return customInstance<EntitiesCashUpUserItem>({
		url: `/tableBooking/payment`,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		data: tableBookingPaymentEditRequest,
	});
};

export const getTableBookingPaymentEditMutationOptions = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof tableBookingPaymentEdit>>,
		TError,
		{ data: BodyType<TableBookingPaymentEditRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<typeof tableBookingPaymentEdit>>,
	TError,
	{ data: BodyType<TableBookingPaymentEditRequest> },
	TContext
> => {
	const mutationKey = ["tableBookingPaymentEdit"];
	const { mutation: mutationOptions } = options
		? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey
			? options
			: { ...options, mutation: { ...options.mutation, mutationKey } }
		: { mutation: { mutationKey } };

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof tableBookingPaymentEdit>>,
		{ data: BodyType<TableBookingPaymentEditRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return tableBookingPaymentEdit(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type TableBookingPaymentEditMutationResult = NonNullable<
	Awaited<ReturnType<typeof tableBookingPaymentEdit>>
>;
export type TableBookingPaymentEditMutationBody = BodyType<TableBookingPaymentEditRequest>;
export type TableBookingPaymentEditMutationError = ErrorType<void | InternalErrorResponse>;

export const createTableBookingPaymentEdit = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(
	options?: {
		mutation?: CreateMutationOptions<
			Awaited<ReturnType<typeof tableBookingPaymentEdit>>,
			TError,
			{ data: BodyType<TableBookingPaymentEditRequest> },
			TContext
		>;
	},
	queryClient?: QueryClient
): CreateMutationResult<
	Awaited<ReturnType<typeof tableBookingPaymentEdit>>,
	TError,
	{ data: BodyType<TableBookingPaymentEditRequest> },
	TContext
> => {
	const mutationOptions = getTableBookingPaymentEditMutationOptions(options);

	return createMutation(mutationOptions, queryClient);
};
export const tableBookingHistoryUser = (userId: string, params: TableBookingHistoryUserParams) => {
	return customInstance<TableBookingHistoryResponse[]>({
		url: `/tableBooking/myHistory/${userId}`,
		method: "GET",
		params,
	});
};

export const getTableBookingHistoryUserQueryKey = (
	userId: string,
	params: TableBookingHistoryUserParams
) => {
	return [`/tableBooking/myHistory/${userId}`, ...(params ? [params] : [])] as const;
};

export const getTableBookingHistoryUserQueryOptions = <
	TData = Awaited<ReturnType<typeof tableBookingHistoryUser>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	userId: string,
	params: TableBookingHistoryUserParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<typeof tableBookingHistoryUser>>, TError, TData>
		>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getTableBookingHistoryUserQueryKey(userId, params);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof tableBookingHistoryUser>>> = () =>
		tableBookingHistoryUser(userId, params);

	return { queryKey, queryFn, enabled: !!userId, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<typeof tableBookingHistoryUser>>,
		TError,
		TData
	> & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type TableBookingHistoryUserQueryResult = NonNullable<
	Awaited<ReturnType<typeof tableBookingHistoryUser>>
>;
export type TableBookingHistoryUserQueryError = ErrorType<void | InternalErrorResponse>;

export function createTableBookingHistoryUser<
	TData = Awaited<ReturnType<typeof tableBookingHistoryUser>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	userId: string,
	params: TableBookingHistoryUserParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<typeof tableBookingHistoryUser>>, TError, TData>
		>;
	},
	queryClient?: QueryClient
): CreateQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {
	const queryOptions = getTableBookingHistoryUserQueryOptions(userId, params, options);

	const query = createQuery(queryOptions, queryClient) as CreateQueryResult<TData, TError> & {
		queryKey: DataTag<QueryKey, TData, TError>;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
}

export const tableBookingHistory = (params: TableBookingHistoryParams) => {
	return customInstance<TableBookingHistoryResponse[]>({
		url: `/tableBooking/myHistory`,
		method: "GET",
		params,
	});
};

export const getTableBookingHistoryQueryKey = (params: TableBookingHistoryParams) => {
	return [`/tableBooking/myHistory`, ...(params ? [params] : [])] as const;
};

export const getTableBookingHistoryQueryOptions = <
	TData = Awaited<ReturnType<typeof tableBookingHistory>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	params: TableBookingHistoryParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<typeof tableBookingHistory>>, TError, TData>
		>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getTableBookingHistoryQueryKey(params);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof tableBookingHistory>>> = () =>
		tableBookingHistory(params);

	return { queryKey, queryFn, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<typeof tableBookingHistory>>,
		TError,
		TData
	> & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type TableBookingHistoryQueryResult = NonNullable<
	Awaited<ReturnType<typeof tableBookingHistory>>
>;
export type TableBookingHistoryQueryError = ErrorType<void | InternalErrorResponse>;

export function createTableBookingHistory<
	TData = Awaited<ReturnType<typeof tableBookingHistory>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	params: TableBookingHistoryParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<typeof tableBookingHistory>>, TError, TData>
		>;
	},
	queryClient?: QueryClient
): CreateQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {
	const queryOptions = getTableBookingHistoryQueryOptions(params, options);

	const query = createQuery(queryOptions, queryClient) as CreateQueryResult<TData, TError> & {
		queryKey: DataTag<QueryKey, TData, TError>;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
}

export const tableBookingGet = (id: number) => {
	return customInstance<TableBookingGetResponse>({ url: `/tableBooking/${id}`, method: "GET" });
};

export const getTableBookingGetQueryKey = (id: number) => {
	return [`/tableBooking/${id}`] as const;
};

export const getTableBookingGetQueryOptions = <
	TData = Awaited<ReturnType<typeof tableBookingGet>>,
	TError = ErrorType<ErrorResponse | InternalErrorResponse>,
>(
	id: number,
	options?: {
		query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof tableBookingGet>>, TError, TData>>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getTableBookingGetQueryKey(id);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof tableBookingGet>>> = () =>
		tableBookingGet(id);

	return { queryKey, queryFn, enabled: !!id, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<typeof tableBookingGet>>,
		TError,
		TData
	> & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type TableBookingGetQueryResult = NonNullable<Awaited<ReturnType<typeof tableBookingGet>>>;
export type TableBookingGetQueryError = ErrorType<ErrorResponse | InternalErrorResponse>;

export function createTableBookingGet<
	TData = Awaited<ReturnType<typeof tableBookingGet>>,
	TError = ErrorType<ErrorResponse | InternalErrorResponse>,
>(
	id: number,
	options?: {
		query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof tableBookingGet>>, TError, TData>>;
	},
	queryClient?: QueryClient
): CreateQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {
	const queryOptions = getTableBookingGetQueryOptions(id, options);

	const query = createQuery(queryOptions, queryClient) as CreateQueryResult<TData, TError> & {
		queryKey: DataTag<QueryKey, TData, TError>;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
}

export const tableBookingCreate = (
	tableBookingCreateRequest: BodyType<TableBookingCreateRequest>
) => {
	return customInstance<EntitiesTableBooking>({
		url: `/tableBooking`,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		data: tableBookingCreateRequest,
	});
};

export const getTableBookingCreateMutationOptions = <
	TError = ErrorType<ErrorResponse | void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof tableBookingCreate>>,
		TError,
		{ data: BodyType<TableBookingCreateRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<typeof tableBookingCreate>>,
	TError,
	{ data: BodyType<TableBookingCreateRequest> },
	TContext
> => {
	const mutationKey = ["tableBookingCreate"];
	const { mutation: mutationOptions } = options
		? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey
			? options
			: { ...options, mutation: { ...options.mutation, mutationKey } }
		: { mutation: { mutationKey } };

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof tableBookingCreate>>,
		{ data: BodyType<TableBookingCreateRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return tableBookingCreate(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type TableBookingCreateMutationResult = NonNullable<
	Awaited<ReturnType<typeof tableBookingCreate>>
>;
export type TableBookingCreateMutationBody = BodyType<TableBookingCreateRequest>;
export type TableBookingCreateMutationError = ErrorType<
	ErrorResponse | void | InternalErrorResponse
>;

export const createTableBookingCreate = <
	TError = ErrorType<ErrorResponse | void | InternalErrorResponse>,
	TContext = unknown,
>(
	options?: {
		mutation?: CreateMutationOptions<
			Awaited<ReturnType<typeof tableBookingCreate>>,
			TError,
			{ data: BodyType<TableBookingCreateRequest> },
			TContext
		>;
	},
	queryClient?: QueryClient
): CreateMutationResult<
	Awaited<ReturnType<typeof tableBookingCreate>>,
	TError,
	{ data: BodyType<TableBookingCreateRequest> },
	TContext
> => {
	const mutationOptions = getTableBookingCreateMutationOptions(options);

	return createMutation(mutationOptions, queryClient);
};
export const tableBookingClose = (tableBookingCloseRequest: BodyType<TableBookingCloseRequest>) => {
	return customInstance<EntitiesTableBooking>({
		url: `/tableBooking/close`,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		data: tableBookingCloseRequest,
	});
};

export const getTableBookingCloseMutationOptions = <
	TError = ErrorType<InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof tableBookingClose>>,
		TError,
		{ data: BodyType<TableBookingCloseRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<typeof tableBookingClose>>,
	TError,
	{ data: BodyType<TableBookingCloseRequest> },
	TContext
> => {
	const mutationKey = ["tableBookingClose"];
	const { mutation: mutationOptions } = options
		? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey
			? options
			: { ...options, mutation: { ...options.mutation, mutationKey } }
		: { mutation: { mutationKey } };

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof tableBookingClose>>,
		{ data: BodyType<TableBookingCloseRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return tableBookingClose(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type TableBookingCloseMutationResult = NonNullable<
	Awaited<ReturnType<typeof tableBookingClose>>
>;
export type TableBookingCloseMutationBody = BodyType<TableBookingCloseRequest>;
export type TableBookingCloseMutationError = ErrorType<InternalErrorResponse>;

export const createTableBookingClose = <
	TError = ErrorType<InternalErrorResponse>,
	TContext = unknown,
>(
	options?: {
		mutation?: CreateMutationOptions<
			Awaited<ReturnType<typeof tableBookingClose>>,
			TError,
			{ data: BodyType<TableBookingCloseRequest> },
			TContext
		>;
	},
	queryClient?: QueryClient
): CreateMutationResult<
	Awaited<ReturnType<typeof tableBookingClose>>,
	TError,
	{ data: BodyType<TableBookingCloseRequest> },
	TContext
> => {
	const mutationOptions = getTableBookingCloseMutationOptions(options);

	return createMutation(mutationOptions, queryClient);
};
