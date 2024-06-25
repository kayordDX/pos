// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/**
 * Generated by orval v6.31.0 🍺
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
	CashUpUserCreateRequest,
	CashUpUserDetailParams,
	CashUpUserDetailResponse,
	CashUpUserGetResponse,
	EntitiesCashUpUserItem,
	EntitiesCashUpUserItemType,
	InternalErrorResponse,
} from "./api.schemas";
import { customInstance } from "../mutator/customInstance";
import type { ErrorType, BodyType } from "../mutator/customInstance";

export const cashUpUserItemType = (isAuto: boolean) => {
	return customInstance<EntitiesCashUpUserItemType[]>({
		url: `/cashUp/user/itemType/${isAuto}`,
		method: "GET",
	});
};

export const getCashUpUserItemTypeQueryKey = (isAuto: boolean) => {
	return [`/cashUp/user/itemType/${isAuto}`] as const;
};

export const getCashUpUserItemTypeQueryOptions = <
	TData = Awaited<ReturnType<typeof cashUpUserItemType>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	isAuto: boolean,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<typeof cashUpUserItemType>>, TError, TData>
		>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getCashUpUserItemTypeQueryKey(isAuto);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof cashUpUserItemType>>> = () =>
		cashUpUserItemType(isAuto);

	return { queryKey, queryFn, enabled: !!isAuto, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<typeof cashUpUserItemType>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type CashUpUserItemTypeQueryResult = NonNullable<
	Awaited<ReturnType<typeof cashUpUserItemType>>
>;
export type CashUpUserItemTypeQueryError = ErrorType<void | InternalErrorResponse>;

export const createCashUpUserItemType = <
	TData = Awaited<ReturnType<typeof cashUpUserItemType>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	isAuto: boolean,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<typeof cashUpUserItemType>>, TError, TData>
		>;
	}
): CreateQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = getCashUpUserItemTypeQueryOptions(isAuto, options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: QueryKey;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
};

export const cashUpUserGet = (outletId: number) => {
	return customInstance<CashUpUserGetResponse[]>({
		url: `/cashUp/user/${outletId}`,
		method: "GET",
	});
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

export const createCashUpUserGet = <
	TData = Awaited<ReturnType<typeof cashUpUserGet>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	outletId: number,
	options?: {
		query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof cashUpUserGet>>, TError, TData>>;
	}
): CreateQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = getCashUpUserGetQueryOptions(outletId, options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: QueryKey;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
};

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

export const createCashUpUserDetail = <
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
): CreateQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = getCashUpUserDetailQueryOptions(userId, outletId, params, options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: QueryKey;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
};

export const cashUpUserCreate = (cashUpUserCreateRequest: BodyType<CashUpUserCreateRequest>) => {
	return customInstance<EntitiesCashUpUserItem>({
		url: `/cashUp/user/create`,
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
