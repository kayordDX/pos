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
	EntitiesOrderItem,
	InternalErrorResponse,
	OrderAddItemsRequest,
	OrderClearBasketRequest,
	TableOrderGetBasketParams,
	TableOrderGetBasketResponse,
	TableOrderGetBillParams,
	TableOrderGetBillResponse,
	TableOrderRemoveItemRequest,
	TableOrderRemoveItemResponse,
	TableOrderSendToKitchenRequest,
	TableOrderSendToKitchenResponse,
	TableOrderUpdateOrderItemRequest,
	TableOrderUpdateOrderItemResponse,
	TableOrderUpdateTableOrderRequest,
	TableOrderUpdateTableOrderResponse,
} from "./api.schemas";
import { useCustomClient } from "../mutator/useCustomClient";
import type { ErrorType, BodyType } from "../mutator/useCustomClient";

export const useTableOrderUpdateTableOrderHook = () => {
	const tableOrderUpdateTableOrder = useCustomClient<TableOrderUpdateTableOrderResponse>();

	return (tableOrderUpdateTableOrderRequest: BodyType<TableOrderUpdateTableOrderRequest>) => {
		return tableOrderUpdateTableOrder({
			url: `/order/updateTableOrder`,
			method: "POST",
			headers: { "Content-Type": "application/json" },
			data: tableOrderUpdateTableOrderRequest,
		});
	};
};

export const useTableOrderUpdateTableOrderMutationOptions = <
	TError = ErrorType<InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<ReturnType<typeof useTableOrderUpdateTableOrderHook>>>,
		TError,
		{ data: BodyType<TableOrderUpdateTableOrderRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<ReturnType<typeof useTableOrderUpdateTableOrderHook>>>,
	TError,
	{ data: BodyType<TableOrderUpdateTableOrderRequest> },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const tableOrderUpdateTableOrder = useTableOrderUpdateTableOrderHook();

	const mutationFn: MutationFunction<
		Awaited<ReturnType<ReturnType<typeof useTableOrderUpdateTableOrderHook>>>,
		{ data: BodyType<TableOrderUpdateTableOrderRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return tableOrderUpdateTableOrder(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type TableOrderUpdateTableOrderMutationResult = NonNullable<
	Awaited<ReturnType<ReturnType<typeof useTableOrderUpdateTableOrderHook>>>
>;
export type TableOrderUpdateTableOrderMutationBody = BodyType<TableOrderUpdateTableOrderRequest>;
export type TableOrderUpdateTableOrderMutationError = ErrorType<InternalErrorResponse>;

export const createTableOrderUpdateTableOrder = <
	TError = ErrorType<InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<ReturnType<typeof useTableOrderUpdateTableOrderHook>>>,
		TError,
		{ data: BodyType<TableOrderUpdateTableOrderRequest> },
		TContext
	>;
}) => {
	const mutationOptions = useTableOrderUpdateTableOrderMutationOptions(options);

	return createMutation(mutationOptions);
};
export const useTableOrderUpdateOrderItemHook = () => {
	const tableOrderUpdateOrderItem = useCustomClient<TableOrderUpdateOrderItemResponse>();

	return (tableOrderUpdateOrderItemRequest: BodyType<TableOrderUpdateOrderItemRequest>) => {
		return tableOrderUpdateOrderItem({
			url: `/order/updateOrderItem`,
			method: "POST",
			headers: { "Content-Type": "application/json" },
			data: tableOrderUpdateOrderItemRequest,
		});
	};
};

export const useTableOrderUpdateOrderItemMutationOptions = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<ReturnType<typeof useTableOrderUpdateOrderItemHook>>>,
		TError,
		{ data: BodyType<TableOrderUpdateOrderItemRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<ReturnType<typeof useTableOrderUpdateOrderItemHook>>>,
	TError,
	{ data: BodyType<TableOrderUpdateOrderItemRequest> },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const tableOrderUpdateOrderItem = useTableOrderUpdateOrderItemHook();

	const mutationFn: MutationFunction<
		Awaited<ReturnType<ReturnType<typeof useTableOrderUpdateOrderItemHook>>>,
		{ data: BodyType<TableOrderUpdateOrderItemRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return tableOrderUpdateOrderItem(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type TableOrderUpdateOrderItemMutationResult = NonNullable<
	Awaited<ReturnType<ReturnType<typeof useTableOrderUpdateOrderItemHook>>>
>;
export type TableOrderUpdateOrderItemMutationBody = BodyType<TableOrderUpdateOrderItemRequest>;
export type TableOrderUpdateOrderItemMutationError = ErrorType<void | InternalErrorResponse>;

export const createTableOrderUpdateOrderItem = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<ReturnType<typeof useTableOrderUpdateOrderItemHook>>>,
		TError,
		{ data: BodyType<TableOrderUpdateOrderItemRequest> },
		TContext
	>;
}) => {
	const mutationOptions = useTableOrderUpdateOrderItemMutationOptions(options);

	return createMutation(mutationOptions);
};
export const useTableOrderSendToKitchenHook = () => {
	const tableOrderSendToKitchen = useCustomClient<TableOrderSendToKitchenResponse>();

	return (tableOrderSendToKitchenRequest: BodyType<TableOrderSendToKitchenRequest>) => {
		return tableOrderSendToKitchen({
			url: `/order/sendKitchen`,
			method: "POST",
			headers: { "Content-Type": "application/json" },
			data: tableOrderSendToKitchenRequest,
		});
	};
};

export const useTableOrderSendToKitchenMutationOptions = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<ReturnType<typeof useTableOrderSendToKitchenHook>>>,
		TError,
		{ data: BodyType<TableOrderSendToKitchenRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<ReturnType<typeof useTableOrderSendToKitchenHook>>>,
	TError,
	{ data: BodyType<TableOrderSendToKitchenRequest> },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const tableOrderSendToKitchen = useTableOrderSendToKitchenHook();

	const mutationFn: MutationFunction<
		Awaited<ReturnType<ReturnType<typeof useTableOrderSendToKitchenHook>>>,
		{ data: BodyType<TableOrderSendToKitchenRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return tableOrderSendToKitchen(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type TableOrderSendToKitchenMutationResult = NonNullable<
	Awaited<ReturnType<ReturnType<typeof useTableOrderSendToKitchenHook>>>
>;
export type TableOrderSendToKitchenMutationBody = BodyType<TableOrderSendToKitchenRequest>;
export type TableOrderSendToKitchenMutationError = ErrorType<void | InternalErrorResponse>;

export const createTableOrderSendToKitchen = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<ReturnType<typeof useTableOrderSendToKitchenHook>>>,
		TError,
		{ data: BodyType<TableOrderSendToKitchenRequest> },
		TContext
	>;
}) => {
	const mutationOptions = useTableOrderSendToKitchenMutationOptions(options);

	return createMutation(mutationOptions);
};
export const useTableOrderRemoveItemHook = () => {
	const tableOrderRemoveItem = useCustomClient<TableOrderRemoveItemResponse>();

	return (tableOrderRemoveItemRequest: BodyType<TableOrderRemoveItemRequest>) => {
		return tableOrderRemoveItem({
			url: `/order/removeItem`,
			method: "POST",
			headers: { "Content-Type": "application/json" },
			data: tableOrderRemoveItemRequest,
		});
	};
};

export const useTableOrderRemoveItemMutationOptions = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<ReturnType<typeof useTableOrderRemoveItemHook>>>,
		TError,
		{ data: BodyType<TableOrderRemoveItemRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<ReturnType<typeof useTableOrderRemoveItemHook>>>,
	TError,
	{ data: BodyType<TableOrderRemoveItemRequest> },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const tableOrderRemoveItem = useTableOrderRemoveItemHook();

	const mutationFn: MutationFunction<
		Awaited<ReturnType<ReturnType<typeof useTableOrderRemoveItemHook>>>,
		{ data: BodyType<TableOrderRemoveItemRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return tableOrderRemoveItem(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type TableOrderRemoveItemMutationResult = NonNullable<
	Awaited<ReturnType<ReturnType<typeof useTableOrderRemoveItemHook>>>
>;
export type TableOrderRemoveItemMutationBody = BodyType<TableOrderRemoveItemRequest>;
export type TableOrderRemoveItemMutationError = ErrorType<void | InternalErrorResponse>;

export const createTableOrderRemoveItem = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<ReturnType<typeof useTableOrderRemoveItemHook>>>,
		TError,
		{ data: BodyType<TableOrderRemoveItemRequest> },
		TContext
	>;
}) => {
	const mutationOptions = useTableOrderRemoveItemMutationOptions(options);

	return createMutation(mutationOptions);
};
export const useTableOrderGetBillHook = () => {
	const tableOrderGetBill = useCustomClient<TableOrderGetBillResponse>();

	return (params: TableOrderGetBillParams) => {
		return tableOrderGetBill({ url: `/order/getBill`, method: "GET", params });
	};
};

export const getTableOrderGetBillQueryKey = (params: TableOrderGetBillParams) => {
	return [`/order/getBill`, ...(params ? [params] : [])] as const;
};

export const useTableOrderGetBillQueryOptions = <
	TData = Awaited<ReturnType<ReturnType<typeof useTableOrderGetBillHook>>>,
	TError = ErrorType<InternalErrorResponse>,
>(
	params: TableOrderGetBillParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<
				Awaited<ReturnType<ReturnType<typeof useTableOrderGetBillHook>>>,
				TError,
				TData
			>
		>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getTableOrderGetBillQueryKey(params);

	const tableOrderGetBill = useTableOrderGetBillHook();

	const queryFn: QueryFunction<
		Awaited<ReturnType<ReturnType<typeof useTableOrderGetBillHook>>>
	> = () => tableOrderGetBill(params);

	return { queryKey, queryFn, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<ReturnType<typeof useTableOrderGetBillHook>>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type TableOrderGetBillQueryResult = NonNullable<
	Awaited<ReturnType<ReturnType<typeof useTableOrderGetBillHook>>>
>;
export type TableOrderGetBillQueryError = ErrorType<InternalErrorResponse>;

export const createTableOrderGetBill = <
	TData = Awaited<ReturnType<ReturnType<typeof useTableOrderGetBillHook>>>,
	TError = ErrorType<InternalErrorResponse>,
>(
	params: TableOrderGetBillParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<
				Awaited<ReturnType<ReturnType<typeof useTableOrderGetBillHook>>>,
				TError,
				TData
			>
		>;
	}
): CreateQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = useTableOrderGetBillQueryOptions(params, options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: QueryKey;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
};

export const useTableOrderGetBasketHook = () => {
	const tableOrderGetBasket = useCustomClient<TableOrderGetBasketResponse>();

	return (params: TableOrderGetBasketParams) => {
		return tableOrderGetBasket({ url: `/order/getBasket`, method: "GET", params });
	};
};

export const getTableOrderGetBasketQueryKey = (params: TableOrderGetBasketParams) => {
	return [`/order/getBasket`, ...(params ? [params] : [])] as const;
};

export const useTableOrderGetBasketQueryOptions = <
	TData = Awaited<ReturnType<ReturnType<typeof useTableOrderGetBasketHook>>>,
	TError = ErrorType<InternalErrorResponse>,
>(
	params: TableOrderGetBasketParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<
				Awaited<ReturnType<ReturnType<typeof useTableOrderGetBasketHook>>>,
				TError,
				TData
			>
		>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getTableOrderGetBasketQueryKey(params);

	const tableOrderGetBasket = useTableOrderGetBasketHook();

	const queryFn: QueryFunction<
		Awaited<ReturnType<ReturnType<typeof useTableOrderGetBasketHook>>>
	> = () => tableOrderGetBasket(params);

	return { queryKey, queryFn, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<ReturnType<typeof useTableOrderGetBasketHook>>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type TableOrderGetBasketQueryResult = NonNullable<
	Awaited<ReturnType<ReturnType<typeof useTableOrderGetBasketHook>>>
>;
export type TableOrderGetBasketQueryError = ErrorType<InternalErrorResponse>;

export const createTableOrderGetBasket = <
	TData = Awaited<ReturnType<ReturnType<typeof useTableOrderGetBasketHook>>>,
	TError = ErrorType<InternalErrorResponse>,
>(
	params: TableOrderGetBasketParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<
				Awaited<ReturnType<ReturnType<typeof useTableOrderGetBasketHook>>>,
				TError,
				TData
			>
		>;
	}
): CreateQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = useTableOrderGetBasketQueryOptions(params, options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: QueryKey;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
};

export const useOrderClearBasketHook = () => {
	const orderClearBasket = useCustomClient<EntitiesOrderItem>();

	return (orderClearBasketRequest: BodyType<OrderClearBasketRequest>) => {
		return orderClearBasket({
			url: `/order/clearBasket`,
			method: "DELETE",
			headers: { "Content-Type": "*/*" },
			data: orderClearBasketRequest,
		});
	};
};

export const useOrderClearBasketMutationOptions = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<ReturnType<typeof useOrderClearBasketHook>>>,
		TError,
		{ data: BodyType<OrderClearBasketRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<ReturnType<typeof useOrderClearBasketHook>>>,
	TError,
	{ data: BodyType<OrderClearBasketRequest> },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const orderClearBasket = useOrderClearBasketHook();

	const mutationFn: MutationFunction<
		Awaited<ReturnType<ReturnType<typeof useOrderClearBasketHook>>>,
		{ data: BodyType<OrderClearBasketRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return orderClearBasket(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type OrderClearBasketMutationResult = NonNullable<
	Awaited<ReturnType<ReturnType<typeof useOrderClearBasketHook>>>
>;
export type OrderClearBasketMutationBody = BodyType<OrderClearBasketRequest>;
export type OrderClearBasketMutationError = ErrorType<void | InternalErrorResponse>;

export const createOrderClearBasket = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<ReturnType<typeof useOrderClearBasketHook>>>,
		TError,
		{ data: BodyType<OrderClearBasketRequest> },
		TContext
	>;
}) => {
	const mutationOptions = useOrderClearBasketMutationOptions(options);

	return createMutation(mutationOptions);
};
export const useOrderAddItemsHook = () => {
	const orderAddItems = useCustomClient<EntitiesOrderItem>();

	return (orderAddItemsRequest: BodyType<OrderAddItemsRequest>) => {
		return orderAddItems({
			url: `/order/addItems`,
			method: "POST",
			headers: { "Content-Type": "application/json" },
			data: orderAddItemsRequest,
		});
	};
};

export const useOrderAddItemsMutationOptions = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<ReturnType<typeof useOrderAddItemsHook>>>,
		TError,
		{ data: BodyType<OrderAddItemsRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<ReturnType<typeof useOrderAddItemsHook>>>,
	TError,
	{ data: BodyType<OrderAddItemsRequest> },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const orderAddItems = useOrderAddItemsHook();

	const mutationFn: MutationFunction<
		Awaited<ReturnType<ReturnType<typeof useOrderAddItemsHook>>>,
		{ data: BodyType<OrderAddItemsRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return orderAddItems(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type OrderAddItemsMutationResult = NonNullable<
	Awaited<ReturnType<ReturnType<typeof useOrderAddItemsHook>>>
>;
export type OrderAddItemsMutationBody = BodyType<OrderAddItemsRequest>;
export type OrderAddItemsMutationError = ErrorType<void | InternalErrorResponse>;

export const createOrderAddItems = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<ReturnType<typeof useOrderAddItemsHook>>>,
		TError,
		{ data: BodyType<OrderAddItemsRequest> },
		TContext
	>;
}) => {
	const mutationOptions = useOrderAddItemsMutationOptions(options);

	return createMutation(mutationOptions);
};
