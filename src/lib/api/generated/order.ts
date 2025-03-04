// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/**
 * Generated by orval v7.6.0 🍺
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
	EntitiesOrderItem,
	InternalErrorResponse,
	OrderAddItemsRequest,
	OrderClearBasketRequest,
	TableOrderCopyItemRequest,
	TableOrderCopyItemResponse,
	TableOrderGetBasketParams,
	TableOrderGetBasketResponse,
	TableOrderGetBillParams,
	TableOrderGetBillResponse,
	TableOrderRemoveItemRequest,
	TableOrderRemoveItemResponse,
	TableOrderSendToKitchenRequest,
	TableOrderSendToKitchenResponse,
	TableOrderUpdateGroupOrderRequest,
	TableOrderUpdateGroupOrderResponse,
	TableOrderUpdateOrderItemRequest,
	TableOrderUpdateOrderItemResponse,
	TableOrderUpdateTableOrderRequest,
	TableOrderUpdateTableOrderResponse,
} from "./api.schemas";

import { customInstance } from "../mutator/customInstance.svelte";
import type { ErrorType, BodyType } from "../mutator/customInstance.svelte";

export const tableOrderUpdateTableOrder = (
	tableOrderUpdateTableOrderRequest: BodyType<TableOrderUpdateTableOrderRequest>
) => {
	return customInstance<TableOrderUpdateTableOrderResponse>({
		url: `/order/updateTableOrder`,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		data: tableOrderUpdateTableOrderRequest,
	});
};

export const getTableOrderUpdateTableOrderMutationOptions = <
	TError = ErrorType<InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof tableOrderUpdateTableOrder>>,
		TError,
		{ data: BodyType<TableOrderUpdateTableOrderRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<typeof tableOrderUpdateTableOrder>>,
	TError,
	{ data: BodyType<TableOrderUpdateTableOrderRequest> },
	TContext
> => {
	const mutationKey = ["tableOrderUpdateTableOrder"];
	const { mutation: mutationOptions } = options
		? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey
			? options
			: { ...options, mutation: { ...options.mutation, mutationKey } }
		: { mutation: { mutationKey } };

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof tableOrderUpdateTableOrder>>,
		{ data: BodyType<TableOrderUpdateTableOrderRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return tableOrderUpdateTableOrder(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type TableOrderUpdateTableOrderMutationResult = NonNullable<
	Awaited<ReturnType<typeof tableOrderUpdateTableOrder>>
>;
export type TableOrderUpdateTableOrderMutationBody = BodyType<TableOrderUpdateTableOrderRequest>;
export type TableOrderUpdateTableOrderMutationError = ErrorType<InternalErrorResponse>;

export const createTableOrderUpdateTableOrder = <
	TError = ErrorType<InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof tableOrderUpdateTableOrder>>,
		TError,
		{ data: BodyType<TableOrderUpdateTableOrderRequest> },
		TContext
	>;
}): CreateMutationResult<
	Awaited<ReturnType<typeof tableOrderUpdateTableOrder>>,
	TError,
	{ data: BodyType<TableOrderUpdateTableOrderRequest> },
	TContext
> => {
	const mutationOptions = getTableOrderUpdateTableOrderMutationOptions(options);

	return createMutation(mutationOptions);
};
export const tableOrderUpdateOrderItem = (
	tableOrderUpdateOrderItemRequest: BodyType<TableOrderUpdateOrderItemRequest>
) => {
	return customInstance<TableOrderUpdateOrderItemResponse>({
		url: `/order/updateOrderItem`,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		data: tableOrderUpdateOrderItemRequest,
	});
};

export const getTableOrderUpdateOrderItemMutationOptions = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof tableOrderUpdateOrderItem>>,
		TError,
		{ data: BodyType<TableOrderUpdateOrderItemRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<typeof tableOrderUpdateOrderItem>>,
	TError,
	{ data: BodyType<TableOrderUpdateOrderItemRequest> },
	TContext
> => {
	const mutationKey = ["tableOrderUpdateOrderItem"];
	const { mutation: mutationOptions } = options
		? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey
			? options
			: { ...options, mutation: { ...options.mutation, mutationKey } }
		: { mutation: { mutationKey } };

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof tableOrderUpdateOrderItem>>,
		{ data: BodyType<TableOrderUpdateOrderItemRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return tableOrderUpdateOrderItem(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type TableOrderUpdateOrderItemMutationResult = NonNullable<
	Awaited<ReturnType<typeof tableOrderUpdateOrderItem>>
>;
export type TableOrderUpdateOrderItemMutationBody = BodyType<TableOrderUpdateOrderItemRequest>;
export type TableOrderUpdateOrderItemMutationError = ErrorType<void | InternalErrorResponse>;

export const createTableOrderUpdateOrderItem = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof tableOrderUpdateOrderItem>>,
		TError,
		{ data: BodyType<TableOrderUpdateOrderItemRequest> },
		TContext
	>;
}): CreateMutationResult<
	Awaited<ReturnType<typeof tableOrderUpdateOrderItem>>,
	TError,
	{ data: BodyType<TableOrderUpdateOrderItemRequest> },
	TContext
> => {
	const mutationOptions = getTableOrderUpdateOrderItemMutationOptions(options);

	return createMutation(mutationOptions);
};
export const tableOrderUpdateGroupOrder = (
	tableOrderUpdateGroupOrderRequest: BodyType<TableOrderUpdateGroupOrderRequest>
) => {
	return customInstance<TableOrderUpdateGroupOrderResponse>({
		url: `/order/updateOrderGroup`,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		data: tableOrderUpdateGroupOrderRequest,
	});
};

export const getTableOrderUpdateGroupOrderMutationOptions = <
	TError = ErrorType<InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof tableOrderUpdateGroupOrder>>,
		TError,
		{ data: BodyType<TableOrderUpdateGroupOrderRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<typeof tableOrderUpdateGroupOrder>>,
	TError,
	{ data: BodyType<TableOrderUpdateGroupOrderRequest> },
	TContext
> => {
	const mutationKey = ["tableOrderUpdateGroupOrder"];
	const { mutation: mutationOptions } = options
		? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey
			? options
			: { ...options, mutation: { ...options.mutation, mutationKey } }
		: { mutation: { mutationKey } };

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof tableOrderUpdateGroupOrder>>,
		{ data: BodyType<TableOrderUpdateGroupOrderRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return tableOrderUpdateGroupOrder(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type TableOrderUpdateGroupOrderMutationResult = NonNullable<
	Awaited<ReturnType<typeof tableOrderUpdateGroupOrder>>
>;
export type TableOrderUpdateGroupOrderMutationBody = BodyType<TableOrderUpdateGroupOrderRequest>;
export type TableOrderUpdateGroupOrderMutationError = ErrorType<InternalErrorResponse>;

export const createTableOrderUpdateGroupOrder = <
	TError = ErrorType<InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof tableOrderUpdateGroupOrder>>,
		TError,
		{ data: BodyType<TableOrderUpdateGroupOrderRequest> },
		TContext
	>;
}): CreateMutationResult<
	Awaited<ReturnType<typeof tableOrderUpdateGroupOrder>>,
	TError,
	{ data: BodyType<TableOrderUpdateGroupOrderRequest> },
	TContext
> => {
	const mutationOptions = getTableOrderUpdateGroupOrderMutationOptions(options);

	return createMutation(mutationOptions);
};
export const tableOrderSendToKitchen = (
	tableOrderSendToKitchenRequest: BodyType<TableOrderSendToKitchenRequest>
) => {
	return customInstance<TableOrderSendToKitchenResponse>({
		url: `/order/sendKitchen`,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		data: tableOrderSendToKitchenRequest,
	});
};

export const getTableOrderSendToKitchenMutationOptions = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof tableOrderSendToKitchen>>,
		TError,
		{ data: BodyType<TableOrderSendToKitchenRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<typeof tableOrderSendToKitchen>>,
	TError,
	{ data: BodyType<TableOrderSendToKitchenRequest> },
	TContext
> => {
	const mutationKey = ["tableOrderSendToKitchen"];
	const { mutation: mutationOptions } = options
		? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey
			? options
			: { ...options, mutation: { ...options.mutation, mutationKey } }
		: { mutation: { mutationKey } };

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof tableOrderSendToKitchen>>,
		{ data: BodyType<TableOrderSendToKitchenRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return tableOrderSendToKitchen(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type TableOrderSendToKitchenMutationResult = NonNullable<
	Awaited<ReturnType<typeof tableOrderSendToKitchen>>
>;
export type TableOrderSendToKitchenMutationBody = BodyType<TableOrderSendToKitchenRequest>;
export type TableOrderSendToKitchenMutationError = ErrorType<void | InternalErrorResponse>;

export const createTableOrderSendToKitchen = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof tableOrderSendToKitchen>>,
		TError,
		{ data: BodyType<TableOrderSendToKitchenRequest> },
		TContext
	>;
}): CreateMutationResult<
	Awaited<ReturnType<typeof tableOrderSendToKitchen>>,
	TError,
	{ data: BodyType<TableOrderSendToKitchenRequest> },
	TContext
> => {
	const mutationOptions = getTableOrderSendToKitchenMutationOptions(options);

	return createMutation(mutationOptions);
};
export const tableOrderRemoveItem = (
	tableOrderRemoveItemRequest: BodyType<TableOrderRemoveItemRequest>
) => {
	return customInstance<TableOrderRemoveItemResponse>({
		url: `/order/removeItem`,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		data: tableOrderRemoveItemRequest,
	});
};

export const getTableOrderRemoveItemMutationOptions = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof tableOrderRemoveItem>>,
		TError,
		{ data: BodyType<TableOrderRemoveItemRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<typeof tableOrderRemoveItem>>,
	TError,
	{ data: BodyType<TableOrderRemoveItemRequest> },
	TContext
> => {
	const mutationKey = ["tableOrderRemoveItem"];
	const { mutation: mutationOptions } = options
		? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey
			? options
			: { ...options, mutation: { ...options.mutation, mutationKey } }
		: { mutation: { mutationKey } };

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof tableOrderRemoveItem>>,
		{ data: BodyType<TableOrderRemoveItemRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return tableOrderRemoveItem(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type TableOrderRemoveItemMutationResult = NonNullable<
	Awaited<ReturnType<typeof tableOrderRemoveItem>>
>;
export type TableOrderRemoveItemMutationBody = BodyType<TableOrderRemoveItemRequest>;
export type TableOrderRemoveItemMutationError = ErrorType<void | InternalErrorResponse>;

export const createTableOrderRemoveItem = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof tableOrderRemoveItem>>,
		TError,
		{ data: BodyType<TableOrderRemoveItemRequest> },
		TContext
	>;
}): CreateMutationResult<
	Awaited<ReturnType<typeof tableOrderRemoveItem>>,
	TError,
	{ data: BodyType<TableOrderRemoveItemRequest> },
	TContext
> => {
	const mutationOptions = getTableOrderRemoveItemMutationOptions(options);

	return createMutation(mutationOptions);
};
export const tableOrderGetBill = (params: TableOrderGetBillParams) => {
	return customInstance<TableOrderGetBillResponse>({
		url: `/order/getBill`,
		method: "GET",
		params,
	});
};

export const getTableOrderGetBillQueryKey = (params: TableOrderGetBillParams) => {
	return [`/order/getBill`, ...(params ? [params] : [])] as const;
};

export const getTableOrderGetBillQueryOptions = <
	TData = Awaited<ReturnType<typeof tableOrderGetBill>>,
	TError = ErrorType<InternalErrorResponse>,
>(
	params: TableOrderGetBillParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<typeof tableOrderGetBill>>, TError, TData>
		>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getTableOrderGetBillQueryKey(params);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof tableOrderGetBill>>> = () =>
		tableOrderGetBill(params);

	return { queryKey, queryFn, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<typeof tableOrderGetBill>>,
		TError,
		TData
	> & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type TableOrderGetBillQueryResult = NonNullable<
	Awaited<ReturnType<typeof tableOrderGetBill>>
>;
export type TableOrderGetBillQueryError = ErrorType<InternalErrorResponse>;

export function createTableOrderGetBill<
	TData = Awaited<ReturnType<typeof tableOrderGetBill>>,
	TError = ErrorType<InternalErrorResponse>,
>(
	params: TableOrderGetBillParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<typeof tableOrderGetBill>>, TError, TData>
		>;
	}
): CreateQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {
	const queryOptions = getTableOrderGetBillQueryOptions(params, options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: DataTag<QueryKey, TData, TError>;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
}

export const tableOrderGetBasket = (params: TableOrderGetBasketParams) => {
	return customInstance<TableOrderGetBasketResponse>({
		url: `/order/getBasket`,
		method: "GET",
		params,
	});
};

export const getTableOrderGetBasketQueryKey = (params: TableOrderGetBasketParams) => {
	return [`/order/getBasket`, ...(params ? [params] : [])] as const;
};

export const getTableOrderGetBasketQueryOptions = <
	TData = Awaited<ReturnType<typeof tableOrderGetBasket>>,
	TError = ErrorType<InternalErrorResponse>,
>(
	params: TableOrderGetBasketParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<typeof tableOrderGetBasket>>, TError, TData>
		>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getTableOrderGetBasketQueryKey(params);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof tableOrderGetBasket>>> = () =>
		tableOrderGetBasket(params);

	return { queryKey, queryFn, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<typeof tableOrderGetBasket>>,
		TError,
		TData
	> & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type TableOrderGetBasketQueryResult = NonNullable<
	Awaited<ReturnType<typeof tableOrderGetBasket>>
>;
export type TableOrderGetBasketQueryError = ErrorType<InternalErrorResponse>;

export function createTableOrderGetBasket<
	TData = Awaited<ReturnType<typeof tableOrderGetBasket>>,
	TError = ErrorType<InternalErrorResponse>,
>(
	params: TableOrderGetBasketParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<typeof tableOrderGetBasket>>, TError, TData>
		>;
	}
): CreateQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {
	const queryOptions = getTableOrderGetBasketQueryOptions(params, options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: DataTag<QueryKey, TData, TError>;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
}

export const tableOrderCopyItem = (
	tableOrderCopyItemRequest: BodyType<TableOrderCopyItemRequest>
) => {
	return customInstance<TableOrderCopyItemResponse>({
		url: `/order/copyItem`,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		data: tableOrderCopyItemRequest,
	});
};

export const getTableOrderCopyItemMutationOptions = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof tableOrderCopyItem>>,
		TError,
		{ data: BodyType<TableOrderCopyItemRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<typeof tableOrderCopyItem>>,
	TError,
	{ data: BodyType<TableOrderCopyItemRequest> },
	TContext
> => {
	const mutationKey = ["tableOrderCopyItem"];
	const { mutation: mutationOptions } = options
		? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey
			? options
			: { ...options, mutation: { ...options.mutation, mutationKey } }
		: { mutation: { mutationKey } };

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof tableOrderCopyItem>>,
		{ data: BodyType<TableOrderCopyItemRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return tableOrderCopyItem(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type TableOrderCopyItemMutationResult = NonNullable<
	Awaited<ReturnType<typeof tableOrderCopyItem>>
>;
export type TableOrderCopyItemMutationBody = BodyType<TableOrderCopyItemRequest>;
export type TableOrderCopyItemMutationError = ErrorType<void | InternalErrorResponse>;

export const createTableOrderCopyItem = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof tableOrderCopyItem>>,
		TError,
		{ data: BodyType<TableOrderCopyItemRequest> },
		TContext
	>;
}): CreateMutationResult<
	Awaited<ReturnType<typeof tableOrderCopyItem>>,
	TError,
	{ data: BodyType<TableOrderCopyItemRequest> },
	TContext
> => {
	const mutationOptions = getTableOrderCopyItemMutationOptions(options);

	return createMutation(mutationOptions);
};
export const orderClearBasket = (orderClearBasketRequest: BodyType<OrderClearBasketRequest>) => {
	return customInstance<EntitiesOrderItem>({
		url: `/order/clearBasket`,
		method: "DELETE",
		headers: { "Content-Type": "*/*" },
		data: orderClearBasketRequest,
	});
};

export const getOrderClearBasketMutationOptions = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof orderClearBasket>>,
		TError,
		{ data: BodyType<OrderClearBasketRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<typeof orderClearBasket>>,
	TError,
	{ data: BodyType<OrderClearBasketRequest> },
	TContext
> => {
	const mutationKey = ["orderClearBasket"];
	const { mutation: mutationOptions } = options
		? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey
			? options
			: { ...options, mutation: { ...options.mutation, mutationKey } }
		: { mutation: { mutationKey } };

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof orderClearBasket>>,
		{ data: BodyType<OrderClearBasketRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return orderClearBasket(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type OrderClearBasketMutationResult = NonNullable<
	Awaited<ReturnType<typeof orderClearBasket>>
>;
export type OrderClearBasketMutationBody = BodyType<OrderClearBasketRequest>;
export type OrderClearBasketMutationError = ErrorType<void | InternalErrorResponse>;

export const createOrderClearBasket = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof orderClearBasket>>,
		TError,
		{ data: BodyType<OrderClearBasketRequest> },
		TContext
	>;
}): CreateMutationResult<
	Awaited<ReturnType<typeof orderClearBasket>>,
	TError,
	{ data: BodyType<OrderClearBasketRequest> },
	TContext
> => {
	const mutationOptions = getOrderClearBasketMutationOptions(options);

	return createMutation(mutationOptions);
};
export const orderAddItems = (orderAddItemsRequest: BodyType<OrderAddItemsRequest>) => {
	return customInstance<EntitiesOrderItem>({
		url: `/order/addItems`,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		data: orderAddItemsRequest,
	});
};

export const getOrderAddItemsMutationOptions = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof orderAddItems>>,
		TError,
		{ data: BodyType<OrderAddItemsRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<typeof orderAddItems>>,
	TError,
	{ data: BodyType<OrderAddItemsRequest> },
	TContext
> => {
	const mutationKey = ["orderAddItems"];
	const { mutation: mutationOptions } = options
		? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey
			? options
			: { ...options, mutation: { ...options.mutation, mutationKey } }
		: { mutation: { mutationKey } };

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof orderAddItems>>,
		{ data: BodyType<OrderAddItemsRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return orderAddItems(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type OrderAddItemsMutationResult = NonNullable<Awaited<ReturnType<typeof orderAddItems>>>;
export type OrderAddItemsMutationBody = BodyType<OrderAddItemsRequest>;
export type OrderAddItemsMutationError = ErrorType<void | InternalErrorResponse>;

export const createOrderAddItems = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof orderAddItems>>,
		TError,
		{ data: BodyType<OrderAddItemsRequest> },
		TContext
	>;
}): CreateMutationResult<
	Awaited<ReturnType<typeof orderAddItems>>,
	TError,
	{ data: BodyType<OrderAddItemsRequest> },
	TContext
> => {
	const mutationOptions = getOrderAddItemsMutationOptions(options);

	return createMutation(mutationOptions);
};
