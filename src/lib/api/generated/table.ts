// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/**
 * Generated by orval v7.7.0 🍺
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
	QueryFunction,
	QueryKey,
} from "@tanstack/svelte-query";

import type {
	EntitiesTable,
	ErrorResponse,
	InternalErrorResponse,
	TableCreateRequest,
	TableGetAvailableParams,
	TableGetAvailableResponse,
	TableGetMyBookedParams,
	TableGetMyBookedResponse,
	TableUpdateRequest,
} from "./api.schemas";

import { customInstance } from "../mutator/customInstance.svelte";
import type { ErrorType, BodyType } from "../mutator/customInstance.svelte";

export const tableUpdate = (tableId: number, tableUpdateRequest: BodyType<TableUpdateRequest>) => {
	return customInstance<EntitiesTable>({
		url: `/table/${tableId}`,
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		data: tableUpdateRequest,
	});
};

export const getTableUpdateMutationOptions = <
	TError = ErrorType<ErrorResponse | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof tableUpdate>>,
		TError,
		{ tableId: number; data: BodyType<TableUpdateRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<typeof tableUpdate>>,
	TError,
	{ tableId: number; data: BodyType<TableUpdateRequest> },
	TContext
> => {
	const mutationKey = ["tableUpdate"];
	const { mutation: mutationOptions } = options
		? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey
			? options
			: { ...options, mutation: { ...options.mutation, mutationKey } }
		: { mutation: { mutationKey } };

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof tableUpdate>>,
		{ tableId: number; data: BodyType<TableUpdateRequest> }
	> = (props) => {
		const { tableId, data } = props ?? {};

		return tableUpdate(tableId, data);
	};

	return { mutationFn, ...mutationOptions };
};

export type TableUpdateMutationResult = NonNullable<Awaited<ReturnType<typeof tableUpdate>>>;
export type TableUpdateMutationBody = BodyType<TableUpdateRequest>;
export type TableUpdateMutationError = ErrorType<ErrorResponse | InternalErrorResponse>;

export const createTableUpdate = <
	TError = ErrorType<ErrorResponse | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof tableUpdate>>,
		TError,
		{ tableId: number; data: BodyType<TableUpdateRequest> },
		TContext
	>;
}): CreateMutationResult<
	Awaited<ReturnType<typeof tableUpdate>>,
	TError,
	{ tableId: number; data: BodyType<TableUpdateRequest> },
	TContext
> => {
	const mutationOptions = getTableUpdateMutationOptions(options);

	return createMutation(mutationOptions);
};
export const tableGetMyBooked = (params: TableGetMyBookedParams) => {
	return customInstance<TableGetMyBookedResponse[]>({
		url: `/table/booked`,
		method: "GET",
		params,
	});
};

export const getTableGetMyBookedQueryKey = (params: TableGetMyBookedParams) => {
	return [`/table/booked`, ...(params ? [params] : [])] as const;
};

export const getTableGetMyBookedQueryOptions = <
	TData = Awaited<ReturnType<typeof tableGetMyBooked>>,
	TError = ErrorType<ErrorResponse | InternalErrorResponse>,
>(
	params: TableGetMyBookedParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<typeof tableGetMyBooked>>, TError, TData>
		>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getTableGetMyBookedQueryKey(params);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof tableGetMyBooked>>> = () =>
		tableGetMyBooked(params);

	return { queryKey, queryFn, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<typeof tableGetMyBooked>>,
		TError,
		TData
	> & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type TableGetMyBookedQueryResult = NonNullable<Awaited<ReturnType<typeof tableGetMyBooked>>>;
export type TableGetMyBookedQueryError = ErrorType<ErrorResponse | InternalErrorResponse>;

export function createTableGetMyBooked<
	TData = Awaited<ReturnType<typeof tableGetMyBooked>>,
	TError = ErrorType<ErrorResponse | InternalErrorResponse>,
>(
	params: TableGetMyBookedParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<typeof tableGetMyBooked>>, TError, TData>
		>;
	}
): CreateQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {
	const queryOptions = getTableGetMyBookedQueryOptions(params, options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: DataTag<QueryKey, TData, TError>;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
}

export const tableGetAvailable = (params: TableGetAvailableParams) => {
	return customInstance<TableGetAvailableResponse[]>({
		url: `/table/available`,
		method: "GET",
		params,
	});
};

export const getTableGetAvailableQueryKey = (params: TableGetAvailableParams) => {
	return [`/table/available`, ...(params ? [params] : [])] as const;
};

export const getTableGetAvailableQueryOptions = <
	TData = Awaited<ReturnType<typeof tableGetAvailable>>,
	TError = ErrorType<ErrorResponse | InternalErrorResponse>,
>(
	params: TableGetAvailableParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<typeof tableGetAvailable>>, TError, TData>
		>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getTableGetAvailableQueryKey(params);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof tableGetAvailable>>> = () =>
		tableGetAvailable(params);

	return { queryKey, queryFn, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<typeof tableGetAvailable>>,
		TError,
		TData
	> & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type TableGetAvailableQueryResult = NonNullable<
	Awaited<ReturnType<typeof tableGetAvailable>>
>;
export type TableGetAvailableQueryError = ErrorType<ErrorResponse | InternalErrorResponse>;

export function createTableGetAvailable<
	TData = Awaited<ReturnType<typeof tableGetAvailable>>,
	TError = ErrorType<ErrorResponse | InternalErrorResponse>,
>(
	params: TableGetAvailableParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<typeof tableGetAvailable>>, TError, TData>
		>;
	}
): CreateQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {
	const queryOptions = getTableGetAvailableQueryOptions(params, options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: DataTag<QueryKey, TData, TError>;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
}

export const tableCreate = (tableCreateRequest: BodyType<TableCreateRequest>) => {
	return customInstance<EntitiesTable>({
		url: `/table`,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		data: tableCreateRequest,
	});
};

export const getTableCreateMutationOptions = <
	TError = ErrorType<ErrorResponse | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof tableCreate>>,
		TError,
		{ data: BodyType<TableCreateRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<typeof tableCreate>>,
	TError,
	{ data: BodyType<TableCreateRequest> },
	TContext
> => {
	const mutationKey = ["tableCreate"];
	const { mutation: mutationOptions } = options
		? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey
			? options
			: { ...options, mutation: { ...options.mutation, mutationKey } }
		: { mutation: { mutationKey } };

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof tableCreate>>,
		{ data: BodyType<TableCreateRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return tableCreate(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type TableCreateMutationResult = NonNullable<Awaited<ReturnType<typeof tableCreate>>>;
export type TableCreateMutationBody = BodyType<TableCreateRequest>;
export type TableCreateMutationError = ErrorType<ErrorResponse | InternalErrorResponse>;

export const createTableCreate = <
	TError = ErrorType<ErrorResponse | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof tableCreate>>,
		TError,
		{ data: BodyType<TableCreateRequest> },
		TContext
	>;
}): CreateMutationResult<
	Awaited<ReturnType<typeof tableCreate>>,
	TError,
	{ data: BodyType<TableCreateRequest> },
	TContext
> => {
	const mutationOptions = getTableCreateMutationOptions(options);

	return createMutation(mutationOptions);
};
