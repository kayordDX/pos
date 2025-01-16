// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/**
 * Generated by orval v7.4.1 🍺
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
	BusinessCreateRequest,
	BusinessDeleteRequest,
	BusinessEditRequest,
	EntitiesBusiness,
	ErrorResponse,
	InternalErrorResponse,
} from "./api.schemas";
import { customInstance } from "../mutator/customInstance.svelte";
import type { ErrorType, BodyType } from "../mutator/customInstance.svelte";

export const businessGetAll = () => {
	return customInstance<EntitiesBusiness[]>({ url: `/business`, method: "GET" });
};

export const getBusinessGetAllQueryKey = () => {
	return [`/business`] as const;
};

export const getBusinessGetAllQueryOptions = <
	TData = Awaited<ReturnType<typeof businessGetAll>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(options?: {
	query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof businessGetAll>>, TError, TData>>;
}) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getBusinessGetAllQueryKey();

	const queryFn: QueryFunction<Awaited<ReturnType<typeof businessGetAll>>> = () => businessGetAll();

	return { queryKey, queryFn, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<typeof businessGetAll>>,
		TError,
		TData
	> & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type BusinessGetAllQueryResult = NonNullable<Awaited<ReturnType<typeof businessGetAll>>>;
export type BusinessGetAllQueryError = ErrorType<void | InternalErrorResponse>;

export function createBusinessGetAll<
	TData = Awaited<ReturnType<typeof businessGetAll>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(options?: {
	query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof businessGetAll>>, TError, TData>>;
}): CreateQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {
	const queryOptions = getBusinessGetAllQueryOptions(options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: DataTag<QueryKey, TData, TError>;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
}

export const businessEdit = (businessEditRequest: BodyType<BusinessEditRequest>) => {
	return customInstance<unknown>({
		url: `/business`,
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		data: businessEditRequest,
	});
};

export const getBusinessEditMutationOptions = <
	TData = Awaited<ReturnType<typeof businessEdit>>,
	TError = ErrorType<ErrorResponse | void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		TData,
		TError,
		{ data: BodyType<BusinessEditRequest> },
		TContext
	>;
}) => {
	const mutationKey = ["businessEdit"];
	const { mutation: mutationOptions } = options
		? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey
			? options
			: { ...options, mutation: { ...options.mutation, mutationKey } }
		: { mutation: { mutationKey } };

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof businessEdit>>,
		{ data: BodyType<BusinessEditRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return businessEdit(data);
	};

	return { mutationFn, ...mutationOptions } as CreateMutationOptions<
		TData,
		TError,
		{ data: BodyType<BusinessEditRequest> },
		TContext
	>;
};

export type BusinessEditMutationResult = NonNullable<Awaited<ReturnType<typeof businessEdit>>>;
export type BusinessEditMutationBody = BodyType<BusinessEditRequest>;
export type BusinessEditMutationError = ErrorType<ErrorResponse | void | InternalErrorResponse>;

export const createBusinessEdit = <
	TData = Awaited<ReturnType<typeof businessEdit>>,
	TError = ErrorType<ErrorResponse | void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		TData,
		TError,
		{ data: BodyType<BusinessEditRequest> },
		TContext
	>;
}): CreateMutationResult<TData, TError, { data: BodyType<BusinessEditRequest> }, TContext> => {
	const mutationOptions = getBusinessEditMutationOptions(options);

	return createMutation(mutationOptions);
};
export const businessDelete = (businessDeleteRequest: BodyType<BusinessDeleteRequest>) => {
	return customInstance<unknown>({
		url: `/business`,
		method: "DELETE",
		headers: { "Content-Type": "*/*" },
		data: businessDeleteRequest,
	});
};

export const getBusinessDeleteMutationOptions = <
	TData = Awaited<ReturnType<typeof businessDelete>>,
	TError = ErrorType<ErrorResponse | void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		TData,
		TError,
		{ data: BodyType<BusinessDeleteRequest> },
		TContext
	>;
}) => {
	const mutationKey = ["businessDelete"];
	const { mutation: mutationOptions } = options
		? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey
			? options
			: { ...options, mutation: { ...options.mutation, mutationKey } }
		: { mutation: { mutationKey } };

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof businessDelete>>,
		{ data: BodyType<BusinessDeleteRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return businessDelete(data);
	};

	return { mutationFn, ...mutationOptions } as CreateMutationOptions<
		TData,
		TError,
		{ data: BodyType<BusinessDeleteRequest> },
		TContext
	>;
};

export type BusinessDeleteMutationResult = NonNullable<Awaited<ReturnType<typeof businessDelete>>>;
export type BusinessDeleteMutationBody = BodyType<BusinessDeleteRequest>;
export type BusinessDeleteMutationError = ErrorType<ErrorResponse | void | InternalErrorResponse>;

export const createBusinessDelete = <
	TData = Awaited<ReturnType<typeof businessDelete>>,
	TError = ErrorType<ErrorResponse | void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		TData,
		TError,
		{ data: BodyType<BusinessDeleteRequest> },
		TContext
	>;
}): CreateMutationResult<TData, TError, { data: BodyType<BusinessDeleteRequest> }, TContext> => {
	const mutationOptions = getBusinessDeleteMutationOptions(options);

	return createMutation(mutationOptions);
};
export const businessCreate = (businessCreateRequest: BodyType<BusinessCreateRequest>) => {
	return customInstance<EntitiesBusiness>({
		url: `/business`,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		data: businessCreateRequest,
	});
};

export const getBusinessCreateMutationOptions = <
	TData = Awaited<ReturnType<typeof businessCreate>>,
	TError = ErrorType<ErrorResponse | void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		TData,
		TError,
		{ data: BodyType<BusinessCreateRequest> },
		TContext
	>;
}) => {
	const mutationKey = ["businessCreate"];
	const { mutation: mutationOptions } = options
		? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey
			? options
			: { ...options, mutation: { ...options.mutation, mutationKey } }
		: { mutation: { mutationKey } };

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof businessCreate>>,
		{ data: BodyType<BusinessCreateRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return businessCreate(data);
	};

	return { mutationFn, ...mutationOptions } as CreateMutationOptions<
		TData,
		TError,
		{ data: BodyType<BusinessCreateRequest> },
		TContext
	>;
};

export type BusinessCreateMutationResult = NonNullable<Awaited<ReturnType<typeof businessCreate>>>;
export type BusinessCreateMutationBody = BodyType<BusinessCreateRequest>;
export type BusinessCreateMutationError = ErrorType<ErrorResponse | void | InternalErrorResponse>;

export const createBusinessCreate = <
	TData = Awaited<ReturnType<typeof businessCreate>>,
	TError = ErrorType<ErrorResponse | void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		TData,
		TError,
		{ data: BodyType<BusinessCreateRequest> },
		TContext
	>;
}): CreateMutationResult<TData, TError, { data: BodyType<BusinessCreateRequest> }, TContext> => {
	const mutationOptions = getBusinessCreateMutationOptions(options);

	return createMutation(mutationOptions);
};
export const businessGet = (id: number) => {
	return customInstance<EntitiesBusiness>({ url: `/business/${id}`, method: "GET" });
};

export const getBusinessGetQueryKey = (id: number) => {
	return [`/business/${id}`] as const;
};

export const getBusinessGetQueryOptions = <
	TData = Awaited<ReturnType<typeof businessGet>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	id: number,
	options?: {
		query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof businessGet>>, TError, TData>>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getBusinessGetQueryKey(id);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof businessGet>>> = () => businessGet(id);

	return { queryKey, queryFn, enabled: !!id, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<typeof businessGet>>,
		TError,
		TData
	> & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type BusinessGetQueryResult = NonNullable<Awaited<ReturnType<typeof businessGet>>>;
export type BusinessGetQueryError = ErrorType<void | InternalErrorResponse>;

export function createBusinessGet<
	TData = Awaited<ReturnType<typeof businessGet>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	id: number,
	options?: {
		query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof businessGet>>, TError, TData>>;
	}
): CreateQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {
	const queryOptions = getBusinessGetQueryOptions(id, options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: DataTag<QueryKey, TData, TError>;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
}
