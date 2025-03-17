// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/**
 * Generated by orval v7.7.0 🍺
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
	DTOSupplierDTO,
	EntitiesSupplier,
	ErrorResponse,
	InternalErrorResponse,
	SupplierCreateRequest,
	SupplierGetAllParams,
	SupplierUpdateRequest,
} from "./api.schemas";

import { customInstance } from "../mutator/customInstance.svelte";
import type { ErrorType, BodyType } from "../mutator/customInstance.svelte";

export const supplierUpdate = (supplierUpdateRequest: BodyType<SupplierUpdateRequest>) => {
	return customInstance<void>({
		url: `/supplier`,
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		data: supplierUpdateRequest,
	});
};

export const getSupplierUpdateMutationOptions = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof supplierUpdate>>,
		TError,
		{ data: BodyType<SupplierUpdateRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<typeof supplierUpdate>>,
	TError,
	{ data: BodyType<SupplierUpdateRequest> },
	TContext
> => {
	const mutationKey = ["supplierUpdate"];
	const { mutation: mutationOptions } = options
		? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey
			? options
			: { ...options, mutation: { ...options.mutation, mutationKey } }
		: { mutation: { mutationKey } };

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof supplierUpdate>>,
		{ data: BodyType<SupplierUpdateRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return supplierUpdate(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type SupplierUpdateMutationResult = NonNullable<Awaited<ReturnType<typeof supplierUpdate>>>;
export type SupplierUpdateMutationBody = BodyType<SupplierUpdateRequest>;
export type SupplierUpdateMutationError = ErrorType<void | InternalErrorResponse>;

export const createSupplierUpdate = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof supplierUpdate>>,
		TError,
		{ data: BodyType<SupplierUpdateRequest> },
		TContext
	>;
}): CreateMutationResult<
	Awaited<ReturnType<typeof supplierUpdate>>,
	TError,
	{ data: BodyType<SupplierUpdateRequest> },
	TContext
> => {
	const mutationOptions = getSupplierUpdateMutationOptions(options);

	return createMutation(mutationOptions);
};
export const supplierGetAll = (params: SupplierGetAllParams) => {
	return customInstance<DTOSupplierDTO[]>({ url: `/supplier`, method: "GET", params });
};

export const getSupplierGetAllQueryKey = (params: SupplierGetAllParams) => {
	return [`/supplier`, ...(params ? [params] : [])] as const;
};

export const getSupplierGetAllQueryOptions = <
	TData = Awaited<ReturnType<typeof supplierGetAll>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	params: SupplierGetAllParams,
	options?: {
		query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof supplierGetAll>>, TError, TData>>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getSupplierGetAllQueryKey(params);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof supplierGetAll>>> = () =>
		supplierGetAll(params);

	return { queryKey, queryFn, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<typeof supplierGetAll>>,
		TError,
		TData
	> & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type SupplierGetAllQueryResult = NonNullable<Awaited<ReturnType<typeof supplierGetAll>>>;
export type SupplierGetAllQueryError = ErrorType<void | InternalErrorResponse>;

export function createSupplierGetAll<
	TData = Awaited<ReturnType<typeof supplierGetAll>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	params: SupplierGetAllParams,
	options?: {
		query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof supplierGetAll>>, TError, TData>>;
	}
): CreateQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {
	const queryOptions = getSupplierGetAllQueryOptions(params, options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: DataTag<QueryKey, TData, TError>;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
}

export const supplierCreate = (supplierCreateRequest: BodyType<SupplierCreateRequest>) => {
	return customInstance<EntitiesSupplier>({
		url: `/supplier`,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		data: supplierCreateRequest,
	});
};

export const getSupplierCreateMutationOptions = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof supplierCreate>>,
		TError,
		{ data: BodyType<SupplierCreateRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<typeof supplierCreate>>,
	TError,
	{ data: BodyType<SupplierCreateRequest> },
	TContext
> => {
	const mutationKey = ["supplierCreate"];
	const { mutation: mutationOptions } = options
		? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey
			? options
			: { ...options, mutation: { ...options.mutation, mutationKey } }
		: { mutation: { mutationKey } };

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof supplierCreate>>,
		{ data: BodyType<SupplierCreateRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return supplierCreate(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type SupplierCreateMutationResult = NonNullable<Awaited<ReturnType<typeof supplierCreate>>>;
export type SupplierCreateMutationBody = BodyType<SupplierCreateRequest>;
export type SupplierCreateMutationError = ErrorType<void | InternalErrorResponse>;

export const createSupplierCreate = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof supplierCreate>>,
		TError,
		{ data: BodyType<SupplierCreateRequest> },
		TContext
	>;
}): CreateMutationResult<
	Awaited<ReturnType<typeof supplierCreate>>,
	TError,
	{ data: BodyType<SupplierCreateRequest> },
	TContext
> => {
	const mutationOptions = getSupplierCreateMutationOptions(options);

	return createMutation(mutationOptions);
};
export const supplierDelete = (id: number) => {
	return customInstance<void>({ url: `/supplier/${id}`, method: "DELETE" });
};

export const getSupplierDeleteMutationOptions = <
	TError = ErrorType<ErrorResponse | void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof supplierDelete>>,
		TError,
		{ id: number },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<typeof supplierDelete>>,
	TError,
	{ id: number },
	TContext
> => {
	const mutationKey = ["supplierDelete"];
	const { mutation: mutationOptions } = options
		? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey
			? options
			: { ...options, mutation: { ...options.mutation, mutationKey } }
		: { mutation: { mutationKey } };

	const mutationFn: MutationFunction<Awaited<ReturnType<typeof supplierDelete>>, { id: number }> = (
		props
	) => {
		const { id } = props ?? {};

		return supplierDelete(id);
	};

	return { mutationFn, ...mutationOptions };
};

export type SupplierDeleteMutationResult = NonNullable<Awaited<ReturnType<typeof supplierDelete>>>;

export type SupplierDeleteMutationError = ErrorType<ErrorResponse | void | InternalErrorResponse>;

export const createSupplierDelete = <
	TError = ErrorType<ErrorResponse | void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof supplierDelete>>,
		TError,
		{ id: number },
		TContext
	>;
}): CreateMutationResult<
	Awaited<ReturnType<typeof supplierDelete>>,
	TError,
	{ id: number },
	TContext
> => {
	const mutationOptions = getSupplierDeleteMutationOptions(options);

	return createMutation(mutationOptions);
};
