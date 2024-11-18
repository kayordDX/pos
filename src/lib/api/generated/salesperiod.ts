// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/**
 * Generated by orval v7.3.0 🍺
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
	EntitiesCashUp,
	EntitiesSalesPeriod,
	ErrorResponse,
	InternalErrorResponse,
	SalesPeriodCashUpCashUp,
	SalesPeriodCashUpParams,
	SalesPeriodCloseRequest,
	SalesPeriodCreateCashUpParams,
	SalesPeriodCreateRequest,
} from "./api.schemas";
import { customInstance } from "../mutator/customInstance.svelte";
import type { ErrorType, BodyType } from "../mutator/customInstance.svelte";

export const salesPeriodGet = (outletId: number) => {
	return customInstance<EntitiesSalesPeriod>({ url: `/salesPeriod/${outletId}`, method: "GET" });
};

export const getSalesPeriodGetQueryKey = (outletId: number) => {
	return [`/salesPeriod/${outletId}`] as const;
};

export const getSalesPeriodGetQueryOptions = <
	TData = Awaited<ReturnType<typeof salesPeriodGet>>,
	TError = ErrorType<InternalErrorResponse>,
>(
	outletId: number,
	options?: {
		query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof salesPeriodGet>>, TError, TData>>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getSalesPeriodGetQueryKey(outletId);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof salesPeriodGet>>> = () =>
		salesPeriodGet(outletId);

	return { queryKey, queryFn, enabled: !!outletId, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<typeof salesPeriodGet>>,
		TError,
		TData
	> & { queryKey: DataTag<QueryKey, TData> };
};

export type SalesPeriodGetQueryResult = NonNullable<Awaited<ReturnType<typeof salesPeriodGet>>>;
export type SalesPeriodGetQueryError = ErrorType<InternalErrorResponse>;

export function createSalesPeriodGet<
	TData = Awaited<ReturnType<typeof salesPeriodGet>>,
	TError = ErrorType<InternalErrorResponse>,
>(
	outletId: number,
	options?: {
		query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof salesPeriodGet>>, TError, TData>>;
	}
): CreateQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {
	const queryOptions = getSalesPeriodGetQueryOptions(outletId, options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: DataTag<QueryKey, TData>;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
}

export const salesPeriodCreateCashUp = (params: SalesPeriodCreateCashUpParams) => {
	return customInstance<EntitiesCashUp>({
		url: `/salesperiod/createCashup`,
		method: "GET",
		params,
	});
};

export const getSalesPeriodCreateCashUpQueryKey = (params: SalesPeriodCreateCashUpParams) => {
	return [`/salesperiod/createCashup`, ...(params ? [params] : [])] as const;
};

export const getSalesPeriodCreateCashUpQueryOptions = <
	TData = Awaited<ReturnType<typeof salesPeriodCreateCashUp>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	params: SalesPeriodCreateCashUpParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<typeof salesPeriodCreateCashUp>>, TError, TData>
		>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getSalesPeriodCreateCashUpQueryKey(params);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof salesPeriodCreateCashUp>>> = () =>
		salesPeriodCreateCashUp(params);

	return { queryKey, queryFn, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<typeof salesPeriodCreateCashUp>>,
		TError,
		TData
	> & { queryKey: DataTag<QueryKey, TData> };
};

export type SalesPeriodCreateCashUpQueryResult = NonNullable<
	Awaited<ReturnType<typeof salesPeriodCreateCashUp>>
>;
export type SalesPeriodCreateCashUpQueryError = ErrorType<void | InternalErrorResponse>;

export function createSalesPeriodCreateCashUp<
	TData = Awaited<ReturnType<typeof salesPeriodCreateCashUp>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	params: SalesPeriodCreateCashUpParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<typeof salesPeriodCreateCashUp>>, TError, TData>
		>;
	}
): CreateQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {
	const queryOptions = getSalesPeriodCreateCashUpQueryOptions(params, options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: DataTag<QueryKey, TData>;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
}

export const salesPeriodCreate = (salesPeriodCreateRequest: BodyType<SalesPeriodCreateRequest>) => {
	return customInstance<EntitiesSalesPeriod>({
		url: `/salesPeriod`,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		data: salesPeriodCreateRequest,
	});
};

export const getSalesPeriodCreateMutationOptions = <
	TError = ErrorType<ErrorResponse | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof salesPeriodCreate>>,
		TError,
		{ data: BodyType<SalesPeriodCreateRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<typeof salesPeriodCreate>>,
	TError,
	{ data: BodyType<SalesPeriodCreateRequest> },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof salesPeriodCreate>>,
		{ data: BodyType<SalesPeriodCreateRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return salesPeriodCreate(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type SalesPeriodCreateMutationResult = NonNullable<
	Awaited<ReturnType<typeof salesPeriodCreate>>
>;
export type SalesPeriodCreateMutationBody = BodyType<SalesPeriodCreateRequest>;
export type SalesPeriodCreateMutationError = ErrorType<ErrorResponse | InternalErrorResponse>;

export const createSalesPeriodCreate = <
	TError = ErrorType<ErrorResponse | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof salesPeriodCreate>>,
		TError,
		{ data: BodyType<SalesPeriodCreateRequest> },
		TContext
	>;
}): CreateMutationResult<
	Awaited<ReturnType<typeof salesPeriodCreate>>,
	TError,
	{ data: BodyType<SalesPeriodCreateRequest> },
	TContext
> => {
	const mutationOptions = getSalesPeriodCreateMutationOptions(options);

	return createMutation(mutationOptions);
};
export const salesPeriodClose = (salesPeriodCloseRequest: BodyType<SalesPeriodCloseRequest>) => {
	return customInstance<EntitiesSalesPeriod>({
		url: `/salesPeriod/close`,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		data: salesPeriodCloseRequest,
	});
};

export const getSalesPeriodCloseMutationOptions = <
	TError = ErrorType<InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof salesPeriodClose>>,
		TError,
		{ data: BodyType<SalesPeriodCloseRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<typeof salesPeriodClose>>,
	TError,
	{ data: BodyType<SalesPeriodCloseRequest> },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof salesPeriodClose>>,
		{ data: BodyType<SalesPeriodCloseRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return salesPeriodClose(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type SalesPeriodCloseMutationResult = NonNullable<
	Awaited<ReturnType<typeof salesPeriodClose>>
>;
export type SalesPeriodCloseMutationBody = BodyType<SalesPeriodCloseRequest>;
export type SalesPeriodCloseMutationError = ErrorType<InternalErrorResponse>;

export const createSalesPeriodClose = <
	TError = ErrorType<InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof salesPeriodClose>>,
		TError,
		{ data: BodyType<SalesPeriodCloseRequest> },
		TContext
	>;
}): CreateMutationResult<
	Awaited<ReturnType<typeof salesPeriodClose>>,
	TError,
	{ data: BodyType<SalesPeriodCloseRequest> },
	TContext
> => {
	const mutationOptions = getSalesPeriodCloseMutationOptions(options);

	return createMutation(mutationOptions);
};
export const salesPeriodCashUp = (params: SalesPeriodCashUpParams) => {
	return customInstance<SalesPeriodCashUpCashUp>({
		url: `/salesperiod/cashup`,
		method: "GET",
		params,
	});
};

export const getSalesPeriodCashUpQueryKey = (params: SalesPeriodCashUpParams) => {
	return [`/salesperiod/cashup`, ...(params ? [params] : [])] as const;
};

export const getSalesPeriodCashUpQueryOptions = <
	TData = Awaited<ReturnType<typeof salesPeriodCashUp>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	params: SalesPeriodCashUpParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<typeof salesPeriodCashUp>>, TError, TData>
		>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getSalesPeriodCashUpQueryKey(params);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof salesPeriodCashUp>>> = () =>
		salesPeriodCashUp(params);

	return { queryKey, queryFn, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<typeof salesPeriodCashUp>>,
		TError,
		TData
	> & { queryKey: DataTag<QueryKey, TData> };
};

export type SalesPeriodCashUpQueryResult = NonNullable<
	Awaited<ReturnType<typeof salesPeriodCashUp>>
>;
export type SalesPeriodCashUpQueryError = ErrorType<void | InternalErrorResponse>;

export function createSalesPeriodCashUp<
	TData = Awaited<ReturnType<typeof salesPeriodCashUp>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	params: SalesPeriodCashUpParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<typeof salesPeriodCashUp>>, TError, TData>
		>;
	}
): CreateQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {
	const queryOptions = getSalesPeriodCashUpQueryOptions(params, options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: DataTag<QueryKey, TData>;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
}
