// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/**
 * Generated by orval v7.5.0 🍺
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
	CommonModelsPaginatedListOfStockDTO,
	CommonModelsPaginatedListOfStockOrder,
	EntitiesDivision,
	EntitiesStockOrder,
	ErrorResponse,
	InternalErrorResponse,
	StockDivisionGetAllParams,
	StockGetAllGetMenuItemsParams,
	StockOrderCreateRequest,
	StockOrderGetAllParams,
	StockOrderUpdateRequest,
} from "./api.schemas";
import { customInstance } from "../mutator/customInstance.svelte";
import type { ErrorType, BodyType } from "../mutator/customInstance.svelte";

export const stockOrderUpdate = (stockOrderUpdateRequest: BodyType<StockOrderUpdateRequest>) => {
	return customInstance<EntitiesStockOrder>({
		url: `/stock/order`,
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		data: stockOrderUpdateRequest,
	});
};

export const getStockOrderUpdateMutationOptions = <
	TError = ErrorType<ErrorResponse | void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof stockOrderUpdate>>,
		TError,
		{ data: BodyType<StockOrderUpdateRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<typeof stockOrderUpdate>>,
	TError,
	{ data: BodyType<StockOrderUpdateRequest> },
	TContext
> => {
	const mutationKey = ["stockOrderUpdate"];
	const { mutation: mutationOptions } = options
		? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey
			? options
			: { ...options, mutation: { ...options.mutation, mutationKey } }
		: { mutation: { mutationKey } };

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof stockOrderUpdate>>,
		{ data: BodyType<StockOrderUpdateRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return stockOrderUpdate(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type StockOrderUpdateMutationResult = NonNullable<
	Awaited<ReturnType<typeof stockOrderUpdate>>
>;
export type StockOrderUpdateMutationBody = BodyType<StockOrderUpdateRequest>;
export type StockOrderUpdateMutationError = ErrorType<ErrorResponse | void | InternalErrorResponse>;

export const createStockOrderUpdate = <
	TError = ErrorType<ErrorResponse | void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof stockOrderUpdate>>,
		TError,
		{ data: BodyType<StockOrderUpdateRequest> },
		TContext
	>;
}): CreateMutationResult<
	Awaited<ReturnType<typeof stockOrderUpdate>>,
	TError,
	{ data: BodyType<StockOrderUpdateRequest> },
	TContext
> => {
	const mutationOptions = getStockOrderUpdateMutationOptions(options);

	return createMutation(mutationOptions);
};
export const stockOrderGetAll = (params: StockOrderGetAllParams) => {
	return customInstance<CommonModelsPaginatedListOfStockOrder>({
		url: `/stock/order`,
		method: "GET",
		params,
	});
};

export const getStockOrderGetAllQueryKey = (params: StockOrderGetAllParams) => {
	return [`/stock/order`, ...(params ? [params] : [])] as const;
};

export const getStockOrderGetAllQueryOptions = <
	TData = Awaited<ReturnType<typeof stockOrderGetAll>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	params: StockOrderGetAllParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<typeof stockOrderGetAll>>, TError, TData>
		>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getStockOrderGetAllQueryKey(params);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof stockOrderGetAll>>> = () =>
		stockOrderGetAll(params);

	return { queryKey, queryFn, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<typeof stockOrderGetAll>>,
		TError,
		TData
	> & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type StockOrderGetAllQueryResult = NonNullable<Awaited<ReturnType<typeof stockOrderGetAll>>>;
export type StockOrderGetAllQueryError = ErrorType<void | InternalErrorResponse>;

export function createStockOrderGetAll<
	TData = Awaited<ReturnType<typeof stockOrderGetAll>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	params: StockOrderGetAllParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<typeof stockOrderGetAll>>, TError, TData>
		>;
	}
): CreateQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {
	const queryOptions = getStockOrderGetAllQueryOptions(params, options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: DataTag<QueryKey, TData, TError>;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
}

export const stockOrderCreate = (stockOrderCreateRequest: BodyType<StockOrderCreateRequest>) => {
	return customInstance<EntitiesStockOrder>({
		url: `/stock/order`,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		data: stockOrderCreateRequest,
	});
};

export const getStockOrderCreateMutationOptions = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof stockOrderCreate>>,
		TError,
		{ data: BodyType<StockOrderCreateRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<typeof stockOrderCreate>>,
	TError,
	{ data: BodyType<StockOrderCreateRequest> },
	TContext
> => {
	const mutationKey = ["stockOrderCreate"];
	const { mutation: mutationOptions } = options
		? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey
			? options
			: { ...options, mutation: { ...options.mutation, mutationKey } }
		: { mutation: { mutationKey } };

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof stockOrderCreate>>,
		{ data: BodyType<StockOrderCreateRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return stockOrderCreate(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type StockOrderCreateMutationResult = NonNullable<
	Awaited<ReturnType<typeof stockOrderCreate>>
>;
export type StockOrderCreateMutationBody = BodyType<StockOrderCreateRequest>;
export type StockOrderCreateMutationError = ErrorType<void | InternalErrorResponse>;

export const createStockOrderCreate = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof stockOrderCreate>>,
		TError,
		{ data: BodyType<StockOrderCreateRequest> },
		TContext
	>;
}): CreateMutationResult<
	Awaited<ReturnType<typeof stockOrderCreate>>,
	TError,
	{ data: BodyType<StockOrderCreateRequest> },
	TContext
> => {
	const mutationOptions = getStockOrderCreateMutationOptions(options);

	return createMutation(mutationOptions);
};
export const stockOrderDelete = (id: number) => {
	return customInstance<unknown>({ url: `/stock/order/${id}`, method: "DELETE" });
};

export const getStockOrderDeleteMutationOptions = <
	TError = ErrorType<ErrorResponse | void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof stockOrderDelete>>,
		TError,
		{ id: number },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<typeof stockOrderDelete>>,
	TError,
	{ id: number },
	TContext
> => {
	const mutationKey = ["stockOrderDelete"];
	const { mutation: mutationOptions } = options
		? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey
			? options
			: { ...options, mutation: { ...options.mutation, mutationKey } }
		: { mutation: { mutationKey } };

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof stockOrderDelete>>,
		{ id: number }
	> = (props) => {
		const { id } = props ?? {};

		return stockOrderDelete(id);
	};

	return { mutationFn, ...mutationOptions };
};

export type StockOrderDeleteMutationResult = NonNullable<
	Awaited<ReturnType<typeof stockOrderDelete>>
>;

export type StockOrderDeleteMutationError = ErrorType<ErrorResponse | void | InternalErrorResponse>;

export const createStockOrderDelete = <
	TError = ErrorType<ErrorResponse | void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof stockOrderDelete>>,
		TError,
		{ id: number },
		TContext
	>;
}): CreateMutationResult<
	Awaited<ReturnType<typeof stockOrderDelete>>,
	TError,
	{ id: number },
	TContext
> => {
	const mutationOptions = getStockOrderDeleteMutationOptions(options);

	return createMutation(mutationOptions);
};
export const stockGetAllGetMenuItems = (params: StockGetAllGetMenuItemsParams) => {
	return customInstance<CommonModelsPaginatedListOfStockDTO>({
		url: `/stock`,
		method: "GET",
		params,
	});
};

export const getStockGetAllGetMenuItemsQueryKey = (params: StockGetAllGetMenuItemsParams) => {
	return [`/stock`, ...(params ? [params] : [])] as const;
};

export const getStockGetAllGetMenuItemsQueryOptions = <
	TData = Awaited<ReturnType<typeof stockGetAllGetMenuItems>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	params: StockGetAllGetMenuItemsParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<typeof stockGetAllGetMenuItems>>, TError, TData>
		>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getStockGetAllGetMenuItemsQueryKey(params);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof stockGetAllGetMenuItems>>> = () =>
		stockGetAllGetMenuItems(params);

	return { queryKey, queryFn, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<typeof stockGetAllGetMenuItems>>,
		TError,
		TData
	> & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type StockGetAllGetMenuItemsQueryResult = NonNullable<
	Awaited<ReturnType<typeof stockGetAllGetMenuItems>>
>;
export type StockGetAllGetMenuItemsQueryError = ErrorType<void | InternalErrorResponse>;

export function createStockGetAllGetMenuItems<
	TData = Awaited<ReturnType<typeof stockGetAllGetMenuItems>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	params: StockGetAllGetMenuItemsParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<typeof stockGetAllGetMenuItems>>, TError, TData>
		>;
	}
): CreateQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {
	const queryOptions = getStockGetAllGetMenuItemsQueryOptions(params, options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: DataTag<QueryKey, TData, TError>;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
}

export const stockDivisionGetAll = (params: StockDivisionGetAllParams) => {
	return customInstance<EntitiesDivision[]>({ url: `/stock/division`, method: "GET", params });
};

export const getStockDivisionGetAllQueryKey = (params: StockDivisionGetAllParams) => {
	return [`/stock/division`, ...(params ? [params] : [])] as const;
};

export const getStockDivisionGetAllQueryOptions = <
	TData = Awaited<ReturnType<typeof stockDivisionGetAll>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	params: StockDivisionGetAllParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<typeof stockDivisionGetAll>>, TError, TData>
		>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getStockDivisionGetAllQueryKey(params);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof stockDivisionGetAll>>> = () =>
		stockDivisionGetAll(params);

	return { queryKey, queryFn, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<typeof stockDivisionGetAll>>,
		TError,
		TData
	> & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type StockDivisionGetAllQueryResult = NonNullable<
	Awaited<ReturnType<typeof stockDivisionGetAll>>
>;
export type StockDivisionGetAllQueryError = ErrorType<void | InternalErrorResponse>;

export function createStockDivisionGetAll<
	TData = Awaited<ReturnType<typeof stockDivisionGetAll>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	params: StockDivisionGetAllParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<typeof stockDivisionGetAll>>, TError, TData>
		>;
	}
): CreateQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {
	const queryOptions = getStockDivisionGetAllQueryOptions(params, options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: DataTag<QueryKey, TData, TError>;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
}
