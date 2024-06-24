// @ts-nocheck
/**
 * Generated by orval v6.30.2 🍺
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
	EntitiesTableBooking,
	ErrorResponse,
	InternalErrorResponse,
	TableBookingCloseRequest,
	TableBookingCreateRequest,
	TableBookingEmailBillRequest,
	TableBookingGetResponse,
	TableBookingHistoryResponse,
} from "./api.schemas";
import { customInstance } from "../mutator/customInstance";
import type { ErrorType, BodyType } from "../mutator/customInstance";

export const tableBookingHistoryUser = (userId: string) => {
	return customInstance<TableBookingHistoryResponse[]>({
		url: `/tableBooking/myHistory/${userId}`,
		method: "GET",
	});
};

export const getTableBookingHistoryUserQueryKey = (userId: string) => {
	return [`/tableBooking/myHistory/${userId}`] as const;
};

export const getTableBookingHistoryUserQueryOptions = <
	TData = Awaited<ReturnType<typeof tableBookingHistoryUser>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	userId: string,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<typeof tableBookingHistoryUser>>, TError, TData>
		>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getTableBookingHistoryUserQueryKey(userId);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof tableBookingHistoryUser>>> = () =>
		tableBookingHistoryUser(userId);

	return { queryKey, queryFn, enabled: !!userId, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<typeof tableBookingHistoryUser>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type TableBookingHistoryUserQueryResult = NonNullable<
	Awaited<ReturnType<typeof tableBookingHistoryUser>>
>;
export type TableBookingHistoryUserQueryError = ErrorType<void | InternalErrorResponse>;

export const createTableBookingHistoryUser = <
	TData = Awaited<ReturnType<typeof tableBookingHistoryUser>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	userId: string,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<typeof tableBookingHistoryUser>>, TError, TData>
		>;
	}
): CreateQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = getTableBookingHistoryUserQueryOptions(userId, options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: QueryKey;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
};

export const tableBookingHistory = () => {
	return customInstance<TableBookingHistoryResponse[]>({
		url: `/tableBooking/myHistory`,
		method: "GET",
	});
};

export const getTableBookingHistoryQueryKey = () => {
	return [`/tableBooking/myHistory`] as const;
};

export const getTableBookingHistoryQueryOptions = <
	TData = Awaited<ReturnType<typeof tableBookingHistory>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(options?: {
	query?: Partial<
		CreateQueryOptions<Awaited<ReturnType<typeof tableBookingHistory>>, TError, TData>
	>;
}) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getTableBookingHistoryQueryKey();

	const queryFn: QueryFunction<Awaited<ReturnType<typeof tableBookingHistory>>> = () =>
		tableBookingHistory();

	return { queryKey, queryFn, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<typeof tableBookingHistory>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type TableBookingHistoryQueryResult = NonNullable<
	Awaited<ReturnType<typeof tableBookingHistory>>
>;
export type TableBookingHistoryQueryError = ErrorType<void | InternalErrorResponse>;

export const createTableBookingHistory = <
	TData = Awaited<ReturnType<typeof tableBookingHistory>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(options?: {
	query?: Partial<
		CreateQueryOptions<Awaited<ReturnType<typeof tableBookingHistory>>, TError, TData>
	>;
}): CreateQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = getTableBookingHistoryQueryOptions(options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: QueryKey;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
};

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
	> & { queryKey: QueryKey };
};

export type TableBookingGetQueryResult = NonNullable<Awaited<ReturnType<typeof tableBookingGet>>>;
export type TableBookingGetQueryError = ErrorType<ErrorResponse | InternalErrorResponse>;

export const createTableBookingGet = <
	TData = Awaited<ReturnType<typeof tableBookingGet>>,
	TError = ErrorType<ErrorResponse | InternalErrorResponse>,
>(
	id: number,
	options?: {
		query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof tableBookingGet>>, TError, TData>>;
	}
): CreateQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = getTableBookingGetQueryOptions(id, options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: QueryKey;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
};

export const tableBookingEmailBill = (
	tableBookingEmailBillRequest: BodyType<TableBookingEmailBillRequest>
) => {
	return customInstance<boolean>({
		url: `/tableBooking/emailBill`,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		data: tableBookingEmailBillRequest,
	});
};

export const getTableBookingEmailBillMutationOptions = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof tableBookingEmailBill>>,
		TError,
		{ data: BodyType<TableBookingEmailBillRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<typeof tableBookingEmailBill>>,
	TError,
	{ data: BodyType<TableBookingEmailBillRequest> },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof tableBookingEmailBill>>,
		{ data: BodyType<TableBookingEmailBillRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return tableBookingEmailBill(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type TableBookingEmailBillMutationResult = NonNullable<
	Awaited<ReturnType<typeof tableBookingEmailBill>>
>;
export type TableBookingEmailBillMutationBody = BodyType<TableBookingEmailBillRequest>;
export type TableBookingEmailBillMutationError = ErrorType<void | InternalErrorResponse>;

export const createTableBookingEmailBill = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof tableBookingEmailBill>>,
		TError,
		{ data: BodyType<TableBookingEmailBillRequest> },
		TContext
	>;
}): CreateMutationResult<
	Awaited<ReturnType<typeof tableBookingEmailBill>>,
	TError,
	{ data: BodyType<TableBookingEmailBillRequest> },
	TContext
> => {
	const mutationOptions = getTableBookingEmailBillMutationOptions(options);

	return createMutation(mutationOptions);
};
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
	TError = ErrorType<ErrorResponse | InternalErrorResponse>,
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
	const { mutation: mutationOptions } = options ?? {};

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
export type TableBookingCreateMutationError = ErrorType<ErrorResponse | InternalErrorResponse>;

export const createTableBookingCreate = <
	TError = ErrorType<ErrorResponse | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof tableBookingCreate>>,
		TError,
		{ data: BodyType<TableBookingCreateRequest> },
		TContext
	>;
}): CreateMutationResult<
	Awaited<ReturnType<typeof tableBookingCreate>>,
	TError,
	{ data: BodyType<TableBookingCreateRequest> },
	TContext
> => {
	const mutationOptions = getTableBookingCreateMutationOptions(options);

	return createMutation(mutationOptions);
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
	const { mutation: mutationOptions } = options ?? {};

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
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof tableBookingClose>>,
		TError,
		{ data: BodyType<TableBookingCloseRequest> },
		TContext
	>;
}): CreateMutationResult<
	Awaited<ReturnType<typeof tableBookingClose>>,
	TError,
	{ data: BodyType<TableBookingCloseRequest> },
	TContext
> => {
	const mutationOptions = getTableBookingCloseMutationOptions(options);

	return createMutation(mutationOptions);
};
