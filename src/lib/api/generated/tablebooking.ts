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
	EntitiesTableBooking,
	ErrorResponse,
	InternalErrorResponse,
	TableBookingCloseRequest,
	TableBookingCreateRequest,
	TableBookingEmailBillRequest,
	TableBookingGetHistoryResponse,
	TableBookingGetResponse,
} from "./api.schemas";
import { useCustomClient } from "../mutator/useCustomClient";
import type { ErrorType, BodyType } from "../mutator/useCustomClient";

export const useTableBookingGetHistoryHook = () => {
	const tableBookingGetHistory = useCustomClient<TableBookingGetHistoryResponse[]>();

	return () => {
		return tableBookingGetHistory({ url: `/tableBooking/myHistory`, method: "GET" });
	};
};

export const getTableBookingGetHistoryQueryKey = () => {
	return [`/tableBooking/myHistory`] as const;
};

export const useTableBookingGetHistoryQueryOptions = <
	TData = Awaited<ReturnType<ReturnType<typeof useTableBookingGetHistoryHook>>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(options?: {
	query?: Partial<
		CreateQueryOptions<
			Awaited<ReturnType<ReturnType<typeof useTableBookingGetHistoryHook>>>,
			TError,
			TData
		>
	>;
}) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getTableBookingGetHistoryQueryKey();

	const tableBookingGetHistory = useTableBookingGetHistoryHook();

	const queryFn: QueryFunction<
		Awaited<ReturnType<ReturnType<typeof useTableBookingGetHistoryHook>>>
	> = () => tableBookingGetHistory();

	return { queryKey, queryFn, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<ReturnType<typeof useTableBookingGetHistoryHook>>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type TableBookingGetHistoryQueryResult = NonNullable<
	Awaited<ReturnType<ReturnType<typeof useTableBookingGetHistoryHook>>>
>;
export type TableBookingGetHistoryQueryError = ErrorType<void | InternalErrorResponse>;

export const createTableBookingGetHistory = <
	TData = Awaited<ReturnType<ReturnType<typeof useTableBookingGetHistoryHook>>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(options?: {
	query?: Partial<
		CreateQueryOptions<
			Awaited<ReturnType<ReturnType<typeof useTableBookingGetHistoryHook>>>,
			TError,
			TData
		>
	>;
}): CreateQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = useTableBookingGetHistoryQueryOptions(options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: QueryKey;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
};

export const useTableBookingGetHook = () => {
	const tableBookingGet = useCustomClient<TableBookingGetResponse>();

	return (id: number) => {
		return tableBookingGet({ url: `/tableBooking/${id}`, method: "GET" });
	};
};

export const getTableBookingGetQueryKey = (id: number) => {
	return [`/tableBooking/${id}`] as const;
};

export const useTableBookingGetQueryOptions = <
	TData = Awaited<ReturnType<ReturnType<typeof useTableBookingGetHook>>>,
	TError = ErrorType<ErrorResponse | InternalErrorResponse>,
>(
	id: number,
	options?: {
		query?: Partial<
			CreateQueryOptions<
				Awaited<ReturnType<ReturnType<typeof useTableBookingGetHook>>>,
				TError,
				TData
			>
		>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getTableBookingGetQueryKey(id);

	const tableBookingGet = useTableBookingGetHook();

	const queryFn: QueryFunction<
		Awaited<ReturnType<ReturnType<typeof useTableBookingGetHook>>>
	> = () => tableBookingGet(id);

	return { queryKey, queryFn, enabled: !!id, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<ReturnType<typeof useTableBookingGetHook>>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type TableBookingGetQueryResult = NonNullable<
	Awaited<ReturnType<ReturnType<typeof useTableBookingGetHook>>>
>;
export type TableBookingGetQueryError = ErrorType<ErrorResponse | InternalErrorResponse>;

export const createTableBookingGet = <
	TData = Awaited<ReturnType<ReturnType<typeof useTableBookingGetHook>>>,
	TError = ErrorType<ErrorResponse | InternalErrorResponse>,
>(
	id: number,
	options?: {
		query?: Partial<
			CreateQueryOptions<
				Awaited<ReturnType<ReturnType<typeof useTableBookingGetHook>>>,
				TError,
				TData
			>
		>;
	}
): CreateQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = useTableBookingGetQueryOptions(id, options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: QueryKey;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
};

export const useTableBookingEmailBillHook = () => {
	const tableBookingEmailBill = useCustomClient<boolean>();

	return (tableBookingEmailBillRequest: BodyType<TableBookingEmailBillRequest>) => {
		return tableBookingEmailBill({
			url: `/tableBooking/emailBill`,
			method: "POST",
			headers: { "Content-Type": "application/json" },
			data: tableBookingEmailBillRequest,
		});
	};
};

export const useTableBookingEmailBillMutationOptions = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<ReturnType<typeof useTableBookingEmailBillHook>>>,
		TError,
		{ data: BodyType<TableBookingEmailBillRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<ReturnType<typeof useTableBookingEmailBillHook>>>,
	TError,
	{ data: BodyType<TableBookingEmailBillRequest> },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const tableBookingEmailBill = useTableBookingEmailBillHook();

	const mutationFn: MutationFunction<
		Awaited<ReturnType<ReturnType<typeof useTableBookingEmailBillHook>>>,
		{ data: BodyType<TableBookingEmailBillRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return tableBookingEmailBill(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type TableBookingEmailBillMutationResult = NonNullable<
	Awaited<ReturnType<ReturnType<typeof useTableBookingEmailBillHook>>>
>;
export type TableBookingEmailBillMutationBody = BodyType<TableBookingEmailBillRequest>;
export type TableBookingEmailBillMutationError = ErrorType<void | InternalErrorResponse>;

export const createTableBookingEmailBill = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<ReturnType<typeof useTableBookingEmailBillHook>>>,
		TError,
		{ data: BodyType<TableBookingEmailBillRequest> },
		TContext
	>;
}): CreateMutationResult<
	Awaited<ReturnType<ReturnType<typeof useTableBookingEmailBillHook>>>,
	TError,
	{ data: BodyType<TableBookingEmailBillRequest> },
	TContext
> => {
	const mutationOptions = useTableBookingEmailBillMutationOptions(options);

	return createMutation(mutationOptions);
};
export const useTableBookingCreateHook = () => {
	const tableBookingCreate = useCustomClient<EntitiesTableBooking>();

	return (tableBookingCreateRequest: BodyType<TableBookingCreateRequest>) => {
		return tableBookingCreate({
			url: `/tableBooking`,
			method: "POST",
			headers: { "Content-Type": "application/json" },
			data: tableBookingCreateRequest,
		});
	};
};

export const useTableBookingCreateMutationOptions = <
	TError = ErrorType<ErrorResponse | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<ReturnType<typeof useTableBookingCreateHook>>>,
		TError,
		{ data: BodyType<TableBookingCreateRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<ReturnType<typeof useTableBookingCreateHook>>>,
	TError,
	{ data: BodyType<TableBookingCreateRequest> },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const tableBookingCreate = useTableBookingCreateHook();

	const mutationFn: MutationFunction<
		Awaited<ReturnType<ReturnType<typeof useTableBookingCreateHook>>>,
		{ data: BodyType<TableBookingCreateRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return tableBookingCreate(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type TableBookingCreateMutationResult = NonNullable<
	Awaited<ReturnType<ReturnType<typeof useTableBookingCreateHook>>>
>;
export type TableBookingCreateMutationBody = BodyType<TableBookingCreateRequest>;
export type TableBookingCreateMutationError = ErrorType<ErrorResponse | InternalErrorResponse>;

export const createTableBookingCreate = <
	TError = ErrorType<ErrorResponse | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<ReturnType<typeof useTableBookingCreateHook>>>,
		TError,
		{ data: BodyType<TableBookingCreateRequest> },
		TContext
	>;
}): CreateMutationResult<
	Awaited<ReturnType<ReturnType<typeof useTableBookingCreateHook>>>,
	TError,
	{ data: BodyType<TableBookingCreateRequest> },
	TContext
> => {
	const mutationOptions = useTableBookingCreateMutationOptions(options);

	return createMutation(mutationOptions);
};
export const useTableBookingCloseHook = () => {
	const tableBookingClose = useCustomClient<EntitiesTableBooking>();

	return (tableBookingCloseRequest: BodyType<TableBookingCloseRequest>) => {
		return tableBookingClose({
			url: `/tableBooking/close`,
			method: "POST",
			headers: { "Content-Type": "application/json" },
			data: tableBookingCloseRequest,
		});
	};
};

export const useTableBookingCloseMutationOptions = <
	TError = ErrorType<InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<ReturnType<typeof useTableBookingCloseHook>>>,
		TError,
		{ data: BodyType<TableBookingCloseRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<ReturnType<typeof useTableBookingCloseHook>>>,
	TError,
	{ data: BodyType<TableBookingCloseRequest> },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const tableBookingClose = useTableBookingCloseHook();

	const mutationFn: MutationFunction<
		Awaited<ReturnType<ReturnType<typeof useTableBookingCloseHook>>>,
		{ data: BodyType<TableBookingCloseRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return tableBookingClose(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type TableBookingCloseMutationResult = NonNullable<
	Awaited<ReturnType<ReturnType<typeof useTableBookingCloseHook>>>
>;
export type TableBookingCloseMutationBody = BodyType<TableBookingCloseRequest>;
export type TableBookingCloseMutationError = ErrorType<InternalErrorResponse>;

export const createTableBookingClose = <
	TError = ErrorType<InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<ReturnType<typeof useTableBookingCloseHook>>>,
		TError,
		{ data: BodyType<TableBookingCloseRequest> },
		TContext
	>;
}): CreateMutationResult<
	Awaited<ReturnType<ReturnType<typeof useTableBookingCloseHook>>>,
	TError,
	{ data: BodyType<TableBookingCloseRequest> },
	TContext
> => {
	const mutationOptions = useTableBookingCloseMutationOptions(options);

	return createMutation(mutationOptions);
};
