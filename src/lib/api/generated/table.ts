// @ts-nocheck
/**
 * Generated by orval v6.25.0 🍺
 * Do not edit manually.
 * Kayord.Pos
 * OpenAPI spec version: v1
 */
import { createMutation, createQuery } from "@tanstack/svelte-query";
import type {
	CreateMutationOptions,
	CreateQueryOptions,
	CreateQueryResult,
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
import { useCustomClient } from "../mutator/useCustomClient";
import type { ErrorType, BodyType } from "../mutator/useCustomClient";

export const useTableUpdateHook = () => {
	const tableUpdate = useCustomClient<EntitiesTable>();

	return (tableId: number, tableUpdateRequest: BodyType<TableUpdateRequest>) => {
		return tableUpdate({
			url: `/table/${tableId}`,
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			data: tableUpdateRequest,
		});
	};
};

export const useTableUpdateMutationOptions = <
	TError = ErrorType<ErrorResponse | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<ReturnType<typeof useTableUpdateHook>>>,
		TError,
		{ tableId: number; data: BodyType<TableUpdateRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<ReturnType<typeof useTableUpdateHook>>>,
	TError,
	{ tableId: number; data: BodyType<TableUpdateRequest> },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const tableUpdate = useTableUpdateHook();

	const mutationFn: MutationFunction<
		Awaited<ReturnType<ReturnType<typeof useTableUpdateHook>>>,
		{ tableId: number; data: BodyType<TableUpdateRequest> }
	> = (props) => {
		const { tableId, data } = props ?? {};

		return tableUpdate(tableId, data);
	};

	return { mutationFn, ...mutationOptions };
};

export type TableUpdateMutationResult = NonNullable<
	Awaited<ReturnType<ReturnType<typeof useTableUpdateHook>>>
>;
export type TableUpdateMutationBody = BodyType<TableUpdateRequest>;
export type TableUpdateMutationError = ErrorType<ErrorResponse | InternalErrorResponse>;

export const createTableUpdate = <
	TError = ErrorType<ErrorResponse | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<ReturnType<typeof useTableUpdateHook>>>,
		TError,
		{ tableId: number; data: BodyType<TableUpdateRequest> },
		TContext
	>;
}) => {
	const mutationOptions = useTableUpdateMutationOptions(options);

	return createMutation(mutationOptions);
};
export const useTableGetMyBookedHook = () => {
	const tableGetMyBooked = useCustomClient<TableGetMyBookedResponse[]>();

	return (params: TableGetMyBookedParams) => {
		return tableGetMyBooked({ url: `/table/booked`, method: "GET", params });
	};
};

export const getTableGetMyBookedQueryKey = (params: TableGetMyBookedParams) => {
	return [`/table/booked`, ...(params ? [params] : [])] as const;
};

export const useTableGetMyBookedQueryOptions = <
	TData = Awaited<ReturnType<ReturnType<typeof useTableGetMyBookedHook>>>,
	TError = ErrorType<ErrorResponse | InternalErrorResponse>,
>(
	params: TableGetMyBookedParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<
				Awaited<ReturnType<ReturnType<typeof useTableGetMyBookedHook>>>,
				TError,
				TData
			>
		>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getTableGetMyBookedQueryKey(params);

	const tableGetMyBooked = useTableGetMyBookedHook();

	const queryFn: QueryFunction<
		Awaited<ReturnType<ReturnType<typeof useTableGetMyBookedHook>>>
	> = () => tableGetMyBooked(params);

	return { queryKey, queryFn, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<ReturnType<typeof useTableGetMyBookedHook>>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type TableGetMyBookedQueryResult = NonNullable<
	Awaited<ReturnType<ReturnType<typeof useTableGetMyBookedHook>>>
>;
export type TableGetMyBookedQueryError = ErrorType<ErrorResponse | InternalErrorResponse>;

export const createTableGetMyBooked = <
	TData = Awaited<ReturnType<ReturnType<typeof useTableGetMyBookedHook>>>,
	TError = ErrorType<ErrorResponse | InternalErrorResponse>,
>(
	params: TableGetMyBookedParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<
				Awaited<ReturnType<ReturnType<typeof useTableGetMyBookedHook>>>,
				TError,
				TData
			>
		>;
	}
): CreateQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = useTableGetMyBookedQueryOptions(params, options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: QueryKey;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
};

export const useTableGetAvailableHook = () => {
	const tableGetAvailable = useCustomClient<TableGetAvailableResponse[]>();

	return (params: TableGetAvailableParams) => {
		return tableGetAvailable({ url: `/table/available`, method: "GET", params });
	};
};

export const getTableGetAvailableQueryKey = (params: TableGetAvailableParams) => {
	return [`/table/available`, ...(params ? [params] : [])] as const;
};

export const useTableGetAvailableQueryOptions = <
	TData = Awaited<ReturnType<ReturnType<typeof useTableGetAvailableHook>>>,
	TError = ErrorType<ErrorResponse | InternalErrorResponse>,
>(
	params: TableGetAvailableParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<
				Awaited<ReturnType<ReturnType<typeof useTableGetAvailableHook>>>,
				TError,
				TData
			>
		>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getTableGetAvailableQueryKey(params);

	const tableGetAvailable = useTableGetAvailableHook();

	const queryFn: QueryFunction<
		Awaited<ReturnType<ReturnType<typeof useTableGetAvailableHook>>>
	> = () => tableGetAvailable(params);

	return { queryKey, queryFn, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<ReturnType<typeof useTableGetAvailableHook>>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type TableGetAvailableQueryResult = NonNullable<
	Awaited<ReturnType<ReturnType<typeof useTableGetAvailableHook>>>
>;
export type TableGetAvailableQueryError = ErrorType<ErrorResponse | InternalErrorResponse>;

export const createTableGetAvailable = <
	TData = Awaited<ReturnType<ReturnType<typeof useTableGetAvailableHook>>>,
	TError = ErrorType<ErrorResponse | InternalErrorResponse>,
>(
	params: TableGetAvailableParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<
				Awaited<ReturnType<ReturnType<typeof useTableGetAvailableHook>>>,
				TError,
				TData
			>
		>;
	}
): CreateQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = useTableGetAvailableQueryOptions(params, options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: QueryKey;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
};

export const useTableCreateHook = () => {
	const tableCreate = useCustomClient<EntitiesTable>();

	return (tableCreateRequest: BodyType<TableCreateRequest>) => {
		return tableCreate({
			url: `/table`,
			method: "POST",
			headers: { "Content-Type": "application/json" },
			data: tableCreateRequest,
		});
	};
};

export const useTableCreateMutationOptions = <
	TError = ErrorType<ErrorResponse | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<ReturnType<typeof useTableCreateHook>>>,
		TError,
		{ data: BodyType<TableCreateRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<ReturnType<typeof useTableCreateHook>>>,
	TError,
	{ data: BodyType<TableCreateRequest> },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const tableCreate = useTableCreateHook();

	const mutationFn: MutationFunction<
		Awaited<ReturnType<ReturnType<typeof useTableCreateHook>>>,
		{ data: BodyType<TableCreateRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return tableCreate(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type TableCreateMutationResult = NonNullable<
	Awaited<ReturnType<ReturnType<typeof useTableCreateHook>>>
>;
export type TableCreateMutationBody = BodyType<TableCreateRequest>;
export type TableCreateMutationError = ErrorType<ErrorResponse | InternalErrorResponse>;

export const createTableCreate = <
	TError = ErrorType<ErrorResponse | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<ReturnType<typeof useTableCreateHook>>>,
		TError,
		{ data: BodyType<TableCreateRequest> },
		TContext
	>;
}) => {
	const mutationOptions = useTableCreateMutationOptions(options);

	return createMutation(mutationOptions);
};
