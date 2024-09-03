// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/**
 * Generated by orval v7.1.0 🍺
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
	CashUpUserCloseRequest,
	CashUpUserCreateRequest,
	CashUpUserDetailParams,
	CashUpUserDetailResponse,
	CashUpUserGetResponse,
	CashUpUserItemTypeParams,
	EntitiesCashUpUserItem,
	EntitiesCashUpUserItemType,
	InternalErrorResponse,
} from "./api.schemas";
import { customInstance } from "../mutator/customInstance";
import type { ErrorType, BodyType } from "../mutator/customInstance";

export const cashUpUserItemType = (params: CashUpUserItemTypeParams) => {
	return customInstance<EntitiesCashUpUserItemType[]>({
		url: `/cashUp/user/itemType`,
		method: "GET",
		params,
	});
};

export const getCashUpUserItemTypeQueryKey = (params: CashUpUserItemTypeParams) => {
	return [`/cashUp/user/itemType`, ...(params ? [params] : [])] as const;
};

export const getCashUpUserItemTypeQueryOptions = <
	TData = Awaited<ReturnType<typeof cashUpUserItemType>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	params: CashUpUserItemTypeParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<typeof cashUpUserItemType>>, TError, TData>
		>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getCashUpUserItemTypeQueryKey(params);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof cashUpUserItemType>>> = () =>
		cashUpUserItemType(params);

	return { queryKey, queryFn, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<typeof cashUpUserItemType>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type CashUpUserItemTypeQueryResult = NonNullable<
	Awaited<ReturnType<typeof cashUpUserItemType>>
>;
export type CashUpUserItemTypeQueryError = ErrorType<void | InternalErrorResponse>;

export function createCashUpUserItemType<
	TData = Awaited<ReturnType<typeof cashUpUserItemType>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	params: CashUpUserItemTypeParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<typeof cashUpUserItemType>>, TError, TData>
		>;
	}
): CreateQueryResult<TData, TError> & { queryKey: QueryKey } {
	const queryOptions = getCashUpUserItemTypeQueryOptions(params, options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: QueryKey;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
}

export const cashUpUserGet = (outletId: number) => {
	return customInstance<CashUpUserGetResponse>({ url: `/cashUp/user/${outletId}`, method: "GET" });
};

export const getCashUpUserGetQueryKey = (outletId: number) => {
	return [`/cashUp/user/${outletId}`] as const;
};

export const getCashUpUserGetQueryOptions = <
	TData = Awaited<ReturnType<typeof cashUpUserGet>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	outletId: number,
	options?: {
		query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof cashUpUserGet>>, TError, TData>>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getCashUpUserGetQueryKey(outletId);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof cashUpUserGet>>> = () =>
		cashUpUserGet(outletId);

	return { queryKey, queryFn, enabled: !!outletId, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<typeof cashUpUserGet>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type CashUpUserGetQueryResult = NonNullable<Awaited<ReturnType<typeof cashUpUserGet>>>;
export type CashUpUserGetQueryError = ErrorType<void | InternalErrorResponse>;

export function createCashUpUserGet<
	TData = Awaited<ReturnType<typeof cashUpUserGet>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	outletId: number,
	options?: {
		query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof cashUpUserGet>>, TError, TData>>;
	}
): CreateQueryResult<TData, TError> & { queryKey: QueryKey } {
	const queryOptions = getCashUpUserGetQueryOptions(outletId, options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: QueryKey;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
}

export const cashUpUserDetail = (
	userId: string,
	outletId: number,
	params: CashUpUserDetailParams
) => {
	return customInstance<CashUpUserDetailResponse>({
		url: `/cashUp/user/detail/${userId}/${outletId}`,
		method: "GET",
		params,
	});
};

export const getCashUpUserDetailQueryKey = (
	userId: string,
	outletId: number,
	params: CashUpUserDetailParams
) => {
	return [`/cashUp/user/detail/${userId}/${outletId}`, ...(params ? [params] : [])] as const;
};

export const getCashUpUserDetailQueryOptions = <
	TData = Awaited<ReturnType<typeof cashUpUserDetail>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	userId: string,
	outletId: number,
	params: CashUpUserDetailParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<typeof cashUpUserDetail>>, TError, TData>
		>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getCashUpUserDetailQueryKey(userId, outletId, params);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof cashUpUserDetail>>> = () =>
		cashUpUserDetail(userId, outletId, params);

	return {
		queryKey,
		queryFn,
		enabled: !!(userId && outletId),
		...queryOptions,
	} as CreateQueryOptions<Awaited<ReturnType<typeof cashUpUserDetail>>, TError, TData> & {
		queryKey: QueryKey;
	};
};

export type CashUpUserDetailQueryResult = NonNullable<Awaited<ReturnType<typeof cashUpUserDetail>>>;
export type CashUpUserDetailQueryError = ErrorType<void | InternalErrorResponse>;

export function createCashUpUserDetail<
	TData = Awaited<ReturnType<typeof cashUpUserDetail>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	userId: string,
	outletId: number,
	params: CashUpUserDetailParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<typeof cashUpUserDetail>>, TError, TData>
		>;
	}
): CreateQueryResult<TData, TError> & { queryKey: QueryKey } {
	const queryOptions = getCashUpUserDetailQueryOptions(userId, outletId, params, options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: QueryKey;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
}

export const cashUpUserDelete = (id: number) => {
	return customInstance<EntitiesCashUpUserItem>({ url: `/cashUp/user/${id}`, method: "DELETE" });
};

export const getCashUpUserDeleteMutationOptions = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof cashUpUserDelete>>,
		TError,
		{ id: number },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<typeof cashUpUserDelete>>,
	TError,
	{ id: number },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof cashUpUserDelete>>,
		{ id: number }
	> = (props) => {
		const { id } = props ?? {};

		return cashUpUserDelete(id);
	};

	return { mutationFn, ...mutationOptions };
};

export type CashUpUserDeleteMutationResult = NonNullable<
	Awaited<ReturnType<typeof cashUpUserDelete>>
>;

export type CashUpUserDeleteMutationError = ErrorType<void | InternalErrorResponse>;

export const createCashUpUserDelete = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof cashUpUserDelete>>,
		TError,
		{ id: number },
		TContext
	>;
}): CreateMutationResult<
	Awaited<ReturnType<typeof cashUpUserDelete>>,
	TError,
	{ id: number },
	TContext
> => {
	const mutationOptions = getCashUpUserDeleteMutationOptions(options);

	return createMutation(mutationOptions);
};
export const cashUpUserCreate = (cashUpUserCreateRequest: BodyType<CashUpUserCreateRequest>) => {
	return customInstance<EntitiesCashUpUserItem>({
		url: `/cashUp/user`,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		data: cashUpUserCreateRequest,
	});
};

export const getCashUpUserCreateMutationOptions = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof cashUpUserCreate>>,
		TError,
		{ data: BodyType<CashUpUserCreateRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<typeof cashUpUserCreate>>,
	TError,
	{ data: BodyType<CashUpUserCreateRequest> },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof cashUpUserCreate>>,
		{ data: BodyType<CashUpUserCreateRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return cashUpUserCreate(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type CashUpUserCreateMutationResult = NonNullable<
	Awaited<ReturnType<typeof cashUpUserCreate>>
>;
export type CashUpUserCreateMutationBody = BodyType<CashUpUserCreateRequest>;
export type CashUpUserCreateMutationError = ErrorType<void | InternalErrorResponse>;

export const createCashUpUserCreate = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof cashUpUserCreate>>,
		TError,
		{ data: BodyType<CashUpUserCreateRequest> },
		TContext
	>;
}): CreateMutationResult<
	Awaited<ReturnType<typeof cashUpUserCreate>>,
	TError,
	{ data: BodyType<CashUpUserCreateRequest> },
	TContext
> => {
	const mutationOptions = getCashUpUserCreateMutationOptions(options);

	return createMutation(mutationOptions);
};
export const cashUpUserClose = (cashUpUserCloseRequest: BodyType<CashUpUserCloseRequest>) => {
	return customInstance<CashUpUserDetailResponse>({
		url: `/cashUp/close`,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		data: cashUpUserCloseRequest,
	});
};

export const getCashUpUserCloseMutationOptions = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof cashUpUserClose>>,
		TError,
		{ data: BodyType<CashUpUserCloseRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<typeof cashUpUserClose>>,
	TError,
	{ data: BodyType<CashUpUserCloseRequest> },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof cashUpUserClose>>,
		{ data: BodyType<CashUpUserCloseRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return cashUpUserClose(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type CashUpUserCloseMutationResult = NonNullable<
	Awaited<ReturnType<typeof cashUpUserClose>>
>;
export type CashUpUserCloseMutationBody = BodyType<CashUpUserCloseRequest>;
export type CashUpUserCloseMutationError = ErrorType<void | InternalErrorResponse>;

export const createCashUpUserClose = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof cashUpUserClose>>,
		TError,
		{ data: BodyType<CashUpUserCloseRequest> },
		TContext
	>;
}): CreateMutationResult<
	Awaited<ReturnType<typeof cashUpUserClose>>,
	TError,
	{ data: BodyType<CashUpUserCloseRequest> },
	TContext
> => {
	const mutationOptions = getCashUpUserCloseMutationOptions(options);

	return createMutation(mutationOptions);
};
