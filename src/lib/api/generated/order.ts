/**
 * Generated by orval v6.20.0 🍺
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
	ErrorResponse,
	InternalErrorResponse,
	OrderItem,
	OrderViewOrdersParams,
	Request2,
	Request4,
	TableOrder,
} from "./api.schemas";
import { useCustomClient } from "../mutator/useCustomClient";
import type { ErrorType, BodyType } from "../mutator/useCustomClient";

export const useTableOrderCreateHook = () => {
	const tableOrderCreate = useCustomClient<TableOrder>();

	return (request2: BodyType<Request2>) => {
		return tableOrderCreate({
			url: `/order`,
			method: "post",
			headers: { "Content-Type": "application/json" },
			data: request2,
		});
	};
};

export const useTableOrderCreateMutationOptions = <
	TError = ErrorType<ErrorResponse | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<ReturnType<typeof useTableOrderCreateHook>>>,
		TError,
		{ data: BodyType<Request2> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<ReturnType<typeof useTableOrderCreateHook>>>,
	TError,
	{ data: BodyType<Request2> },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const tableOrderCreate = useTableOrderCreateHook();

	const mutationFn: MutationFunction<
		Awaited<ReturnType<ReturnType<typeof useTableOrderCreateHook>>>,
		{ data: BodyType<Request2> }
	> = (props) => {
		const { data } = props ?? {};

		return tableOrderCreate(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type TableOrderCreateMutationResult = NonNullable<
	Awaited<ReturnType<ReturnType<typeof useTableOrderCreateHook>>>
>;
export type TableOrderCreateMutationBody = BodyType<Request2>;
export type TableOrderCreateMutationError = ErrorType<ErrorResponse | InternalErrorResponse>;

export const createTableOrderCreate = <
	TError = ErrorType<ErrorResponse | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<ReturnType<typeof useTableOrderCreateHook>>>,
		TError,
		{ data: BodyType<Request2> },
		TContext
	>;
}) => {
	const mutationOptions = useTableOrderCreateMutationOptions(options);

	return createMutation(mutationOptions);
};
export const useOrderAddItemHook = () => {
	const orderAddItem = useCustomClient<OrderItem>();

	return (orderId: number, request4: BodyType<Request4>) => {
		return orderAddItem({
			url: `/order/${orderId}/additem`,
			method: "post",
			headers: { "Content-Type": "application/json" },
			data: request4,
		});
	};
};

export const useOrderAddItemMutationOptions = <
	TError = ErrorType<ErrorResponse | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<ReturnType<typeof useOrderAddItemHook>>>,
		TError,
		{ orderId: number; data: BodyType<Request4> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<ReturnType<typeof useOrderAddItemHook>>>,
	TError,
	{ orderId: number; data: BodyType<Request4> },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const orderAddItem = useOrderAddItemHook();

	const mutationFn: MutationFunction<
		Awaited<ReturnType<ReturnType<typeof useOrderAddItemHook>>>,
		{ orderId: number; data: BodyType<Request4> }
	> = (props) => {
		const { orderId, data } = props ?? {};

		return orderAddItem(orderId, data);
	};

	return { mutationFn, ...mutationOptions };
};

export type OrderAddItemMutationResult = NonNullable<
	Awaited<ReturnType<ReturnType<typeof useOrderAddItemHook>>>
>;
export type OrderAddItemMutationBody = BodyType<Request4>;
export type OrderAddItemMutationError = ErrorType<ErrorResponse | InternalErrorResponse>;

export const createOrderAddItem = <
	TError = ErrorType<ErrorResponse | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<ReturnType<typeof useOrderAddItemHook>>>,
		TError,
		{ orderId: number; data: BodyType<Request4> },
		TContext
	>;
}) => {
	const mutationOptions = useOrderAddItemMutationOptions(options);

	return createMutation(mutationOptions);
};
export const useOrderViewOrdersHook = () => {
	const orderViewOrders = useCustomClient<TableOrder[]>();

	return (tableId: string | null, params: OrderViewOrdersParams) => {
		return orderViewOrders({ url: `/order/table/${tableId}`, method: "get", params });
	};
};

export const getOrderViewOrdersQueryKey = (
	tableId: string | null,
	params: OrderViewOrdersParams
) => {
	return [`/order/table/${tableId}`, ...(params ? [params] : [])] as const;
};

export const useOrderViewOrdersQueryOptions = <
	TData = Awaited<ReturnType<ReturnType<typeof useOrderViewOrdersHook>>>,
	TError = ErrorType<InternalErrorResponse>,
>(
	tableId: string | null,
	params: OrderViewOrdersParams,
	options?: {
		query?: CreateQueryOptions<
			Awaited<ReturnType<ReturnType<typeof useOrderViewOrdersHook>>>,
			TError,
			TData
		>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getOrderViewOrdersQueryKey(tableId, params);

	const orderViewOrders = useOrderViewOrdersHook();

	const queryFn: QueryFunction<
		Awaited<ReturnType<ReturnType<typeof useOrderViewOrdersHook>>>
	> = () => orderViewOrders(tableId, params);

	return { queryKey, queryFn, enabled: !!tableId, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<ReturnType<typeof useOrderViewOrdersHook>>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type OrderViewOrdersQueryResult = NonNullable<
	Awaited<ReturnType<ReturnType<typeof useOrderViewOrdersHook>>>
>;
export type OrderViewOrdersQueryError = ErrorType<InternalErrorResponse>;

export const createOrderViewOrders = <
	TData = Awaited<ReturnType<ReturnType<typeof useOrderViewOrdersHook>>>,
	TError = ErrorType<InternalErrorResponse>,
>(
	tableId: string | null,
	params: OrderViewOrdersParams,
	options?: {
		query?: CreateQueryOptions<
			Awaited<ReturnType<ReturnType<typeof useOrderViewOrdersHook>>>,
			TError,
			TData
		>;
	}
): CreateQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = useOrderViewOrdersQueryOptions(tableId, params, options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: QueryKey;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
};