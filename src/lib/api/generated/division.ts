// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/**
 * Generated by orval v7.10.0 🍺
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
	QueryClient,
	QueryFunction,
	QueryKey,
} from "@tanstack/svelte-query";

import type {
	DivisionCreateRequest,
	DivisionEditRequest,
	DivisionGetAllParams,
	DivisionGetUsersParams,
	DivisionGetUsersResponse,
	EntitiesDivision,
	ErrorResponse,
	InternalErrorResponse,
} from "./api.schemas";

import { customInstance } from "../mutator/customInstance.svelte";
import type { ErrorType, BodyType } from "../mutator/customInstance.svelte";

export const divisionGetUsers = (divisionId: number, params?: DivisionGetUsersParams) => {
	return customInstance<DivisionGetUsersResponse[]>({
		url: `/division/users/${divisionId}`,
		method: "GET",
		params,
	});
};

export const getDivisionGetUsersQueryKey = (
	divisionId: number,
	params?: DivisionGetUsersParams
) => {
	return [`/division/users/${divisionId}`, ...(params ? [params] : [])] as const;
};

export const getDivisionGetUsersQueryOptions = <
	TData = Awaited<ReturnType<typeof divisionGetUsers>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	divisionId: number,
	params?: DivisionGetUsersParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<typeof divisionGetUsers>>, TError, TData>
		>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getDivisionGetUsersQueryKey(divisionId, params);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof divisionGetUsers>>> = () =>
		divisionGetUsers(divisionId, params);

	return { queryKey, queryFn, enabled: !!divisionId, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<typeof divisionGetUsers>>,
		TError,
		TData
	> & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type DivisionGetUsersQueryResult = NonNullable<Awaited<ReturnType<typeof divisionGetUsers>>>;
export type DivisionGetUsersQueryError = ErrorType<void | InternalErrorResponse>;

export function createDivisionGetUsers<
	TData = Awaited<ReturnType<typeof divisionGetUsers>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	divisionId: number,
	params?: DivisionGetUsersParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<typeof divisionGetUsers>>, TError, TData>
		>;
	},
	queryClient?: QueryClient
): CreateQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {
	const queryOptions = getDivisionGetUsersQueryOptions(divisionId, params, options);

	const query = createQuery(queryOptions, queryClient) as CreateQueryResult<TData, TError> & {
		queryKey: DataTag<QueryKey, TData, TError>;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
}

export const divisionGetAll = (params: DivisionGetAllParams) => {
	return customInstance<EntitiesDivision[]>({ url: `/division`, method: "GET", params });
};

export const getDivisionGetAllQueryKey = (params: DivisionGetAllParams) => {
	return [`/division`, ...(params ? [params] : [])] as const;
};

export const getDivisionGetAllQueryOptions = <
	TData = Awaited<ReturnType<typeof divisionGetAll>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	params: DivisionGetAllParams,
	options?: {
		query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof divisionGetAll>>, TError, TData>>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getDivisionGetAllQueryKey(params);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof divisionGetAll>>> = () =>
		divisionGetAll(params);

	return { queryKey, queryFn, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<typeof divisionGetAll>>,
		TError,
		TData
	> & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type DivisionGetAllQueryResult = NonNullable<Awaited<ReturnType<typeof divisionGetAll>>>;
export type DivisionGetAllQueryError = ErrorType<void | InternalErrorResponse>;

export function createDivisionGetAll<
	TData = Awaited<ReturnType<typeof divisionGetAll>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	params: DivisionGetAllParams,
	options?: {
		query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof divisionGetAll>>, TError, TData>>;
	},
	queryClient?: QueryClient
): CreateQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {
	const queryOptions = getDivisionGetAllQueryOptions(params, options);

	const query = createQuery(queryOptions, queryClient) as CreateQueryResult<TData, TError> & {
		queryKey: DataTag<QueryKey, TData, TError>;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
}

export const divisionEdit = (divisionEditRequest: BodyType<DivisionEditRequest>) => {
	return customInstance<void>({
		url: `/division`,
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		data: divisionEditRequest,
	});
};

export const getDivisionEditMutationOptions = <
	TError = ErrorType<ErrorResponse | void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof divisionEdit>>,
		TError,
		{ data: BodyType<DivisionEditRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<typeof divisionEdit>>,
	TError,
	{ data: BodyType<DivisionEditRequest> },
	TContext
> => {
	const mutationKey = ["divisionEdit"];
	const { mutation: mutationOptions } = options
		? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey
			? options
			: { ...options, mutation: { ...options.mutation, mutationKey } }
		: { mutation: { mutationKey } };

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof divisionEdit>>,
		{ data: BodyType<DivisionEditRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return divisionEdit(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type DivisionEditMutationResult = NonNullable<Awaited<ReturnType<typeof divisionEdit>>>;
export type DivisionEditMutationBody = BodyType<DivisionEditRequest>;
export type DivisionEditMutationError = ErrorType<ErrorResponse | void | InternalErrorResponse>;

export const createDivisionEdit = <
	TError = ErrorType<ErrorResponse | void | InternalErrorResponse>,
	TContext = unknown,
>(
	options?: {
		mutation?: CreateMutationOptions<
			Awaited<ReturnType<typeof divisionEdit>>,
			TError,
			{ data: BodyType<DivisionEditRequest> },
			TContext
		>;
	},
	queryClient?: QueryClient
): CreateMutationResult<
	Awaited<ReturnType<typeof divisionEdit>>,
	TError,
	{ data: BodyType<DivisionEditRequest> },
	TContext
> => {
	const mutationOptions = getDivisionEditMutationOptions(options);

	return createMutation(mutationOptions, queryClient);
};
export const divisionCreate = (divisionCreateRequest: BodyType<DivisionCreateRequest>) => {
	return customInstance<EntitiesDivision>({
		url: `/division`,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		data: divisionCreateRequest,
	});
};

export const getDivisionCreateMutationOptions = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof divisionCreate>>,
		TError,
		{ data: BodyType<DivisionCreateRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<typeof divisionCreate>>,
	TError,
	{ data: BodyType<DivisionCreateRequest> },
	TContext
> => {
	const mutationKey = ["divisionCreate"];
	const { mutation: mutationOptions } = options
		? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey
			? options
			: { ...options, mutation: { ...options.mutation, mutationKey } }
		: { mutation: { mutationKey } };

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof divisionCreate>>,
		{ data: BodyType<DivisionCreateRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return divisionCreate(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type DivisionCreateMutationResult = NonNullable<Awaited<ReturnType<typeof divisionCreate>>>;
export type DivisionCreateMutationBody = BodyType<DivisionCreateRequest>;
export type DivisionCreateMutationError = ErrorType<void | InternalErrorResponse>;

export const createDivisionCreate = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(
	options?: {
		mutation?: CreateMutationOptions<
			Awaited<ReturnType<typeof divisionCreate>>,
			TError,
			{ data: BodyType<DivisionCreateRequest> },
			TContext
		>;
	},
	queryClient?: QueryClient
): CreateMutationResult<
	Awaited<ReturnType<typeof divisionCreate>>,
	TError,
	{ data: BodyType<DivisionCreateRequest> },
	TContext
> => {
	const mutationOptions = getDivisionCreateMutationOptions(options);

	return createMutation(mutationOptions, queryClient);
};
