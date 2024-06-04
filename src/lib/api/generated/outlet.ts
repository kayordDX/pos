// @ts-nocheck
/**
 * Generated by orval v6.29.1 🍺
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
	EntitiesOutlet,
	EntitiesPaymentType,
	ErrorResponse,
	InternalErrorResponse,
	OutletCreateRequest,
	OutletUpdateRequest,
} from "./api.schemas";
import { customInstance } from "../mutator/customInstance";
import type { ErrorType, BodyType } from "../mutator/customInstance";

export const outletUpdate = (id: number, outletUpdateRequest: BodyType<OutletUpdateRequest>) => {
	return customInstance<EntitiesOutlet>({
		url: `/outlet/${id}`,
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		data: outletUpdateRequest,
	});
};

export const getOutletUpdateMutationOptions = <
	TError = ErrorType<ErrorResponse | void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof outletUpdate>>,
		TError,
		{ id: number; data: BodyType<OutletUpdateRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<typeof outletUpdate>>,
	TError,
	{ id: number; data: BodyType<OutletUpdateRequest> },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof outletUpdate>>,
		{ id: number; data: BodyType<OutletUpdateRequest> }
	> = (props) => {
		const { id, data } = props ?? {};

		return outletUpdate(id, data);
	};

	return { mutationFn, ...mutationOptions };
};

export type OutletUpdateMutationResult = NonNullable<Awaited<ReturnType<typeof outletUpdate>>>;
export type OutletUpdateMutationBody = BodyType<OutletUpdateRequest>;
export type OutletUpdateMutationError = ErrorType<ErrorResponse | void | InternalErrorResponse>;

export const createOutletUpdate = <
	TError = ErrorType<ErrorResponse | void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof outletUpdate>>,
		TError,
		{ id: number; data: BodyType<OutletUpdateRequest> },
		TContext
	>;
}): CreateMutationResult<
	Awaited<ReturnType<typeof outletUpdate>>,
	TError,
	{ id: number; data: BodyType<OutletUpdateRequest> },
	TContext
> => {
	const mutationOptions = getOutletUpdateMutationOptions(options);

	return createMutation(mutationOptions);
};
export const outletGet = (id: number) => {
	return customInstance<EntitiesOutlet>({ url: `/outlet/${id}`, method: "GET" });
};

export const getOutletGetQueryKey = (id: number) => {
	return [`/outlet/${id}`] as const;
};

export const getOutletGetQueryOptions = <
	TData = Awaited<ReturnType<typeof outletGet>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	id: number,
	options?: {
		query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof outletGet>>, TError, TData>>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getOutletGetQueryKey(id);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof outletGet>>> = () => outletGet(id);

	return { queryKey, queryFn, enabled: !!id, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<typeof outletGet>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type OutletGetQueryResult = NonNullable<Awaited<ReturnType<typeof outletGet>>>;
export type OutletGetQueryError = ErrorType<void | InternalErrorResponse>;

export const createOutletGet = <
	TData = Awaited<ReturnType<typeof outletGet>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	id: number,
	options?: {
		query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof outletGet>>, TError, TData>>;
	}
): CreateQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = getOutletGetQueryOptions(id, options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: QueryKey;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
};

export const outletGetPaymentType = (id: number) => {
	return customInstance<EntitiesPaymentType[]>({
		url: `/outlet/paymentTypes/${id}`,
		method: "GET",
	});
};

export const getOutletGetPaymentTypeQueryKey = (id: number) => {
	return [`/outlet/paymentTypes/${id}`] as const;
};

export const getOutletGetPaymentTypeQueryOptions = <
	TData = Awaited<ReturnType<typeof outletGetPaymentType>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	id: number,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<typeof outletGetPaymentType>>, TError, TData>
		>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getOutletGetPaymentTypeQueryKey(id);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof outletGetPaymentType>>> = () =>
		outletGetPaymentType(id);

	return { queryKey, queryFn, enabled: !!id, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<typeof outletGetPaymentType>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type OutletGetPaymentTypeQueryResult = NonNullable<
	Awaited<ReturnType<typeof outletGetPaymentType>>
>;
export type OutletGetPaymentTypeQueryError = ErrorType<void | InternalErrorResponse>;

export const createOutletGetPaymentType = <
	TData = Awaited<ReturnType<typeof outletGetPaymentType>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	id: number,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<typeof outletGetPaymentType>>, TError, TData>
		>;
	}
): CreateQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = getOutletGetPaymentTypeQueryOptions(id, options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: QueryKey;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
};

export const outletList = () => {
	return customInstance<EntitiesOutlet[]>({ url: `/outlet`, method: "GET" });
};

export const getOutletListQueryKey = () => {
	return [`/outlet`] as const;
};

export const getOutletListQueryOptions = <
	TData = Awaited<ReturnType<typeof outletList>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(options?: {
	query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof outletList>>, TError, TData>>;
}) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getOutletListQueryKey();

	const queryFn: QueryFunction<Awaited<ReturnType<typeof outletList>>> = () => outletList();

	return { queryKey, queryFn, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<typeof outletList>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type OutletListQueryResult = NonNullable<Awaited<ReturnType<typeof outletList>>>;
export type OutletListQueryError = ErrorType<void | InternalErrorResponse>;

export const createOutletList = <
	TData = Awaited<ReturnType<typeof outletList>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(options?: {
	query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof outletList>>, TError, TData>>;
}): CreateQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = getOutletListQueryOptions(options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: QueryKey;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
};

export const outletCreate = (outletCreateRequest: BodyType<OutletCreateRequest>) => {
	return customInstance<EntitiesOutlet>({
		url: `/outlet`,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		data: outletCreateRequest,
	});
};

export const getOutletCreateMutationOptions = <
	TError = ErrorType<ErrorResponse | void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof outletCreate>>,
		TError,
		{ data: BodyType<OutletCreateRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<typeof outletCreate>>,
	TError,
	{ data: BodyType<OutletCreateRequest> },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof outletCreate>>,
		{ data: BodyType<OutletCreateRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return outletCreate(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type OutletCreateMutationResult = NonNullable<Awaited<ReturnType<typeof outletCreate>>>;
export type OutletCreateMutationBody = BodyType<OutletCreateRequest>;
export type OutletCreateMutationError = ErrorType<ErrorResponse | void | InternalErrorResponse>;

export const createOutletCreate = <
	TError = ErrorType<ErrorResponse | void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof outletCreate>>,
		TError,
		{ data: BodyType<OutletCreateRequest> },
		TContext
	>;
}): CreateMutationResult<
	Awaited<ReturnType<typeof outletCreate>>,
	TError,
	{ data: BodyType<OutletCreateRequest> },
	TContext
> => {
	const mutationOptions = getOutletCreateMutationOptions(options);

	return createMutation(mutationOptions);
};
