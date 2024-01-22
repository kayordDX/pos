// @ts-nocheck
/**
 * Generated by orval v6.23.0 🍺
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
	Business,
	ErrorResponse,
	InternalErrorResponse,
	Request34,
	Request35,
	Request36,
} from "./api.schemas";
import { useCustomClient } from "../mutator/useCustomClient";
import type { ErrorType, BodyType } from "../mutator/useCustomClient";

export const useBusinessGetAllHook = () => {
	const businessGetAll = useCustomClient<Business[]>();

	return () => {
		return businessGetAll({ url: `/business`, method: "GET" });
	};
};

export const getBusinessGetAllQueryKey = () => {
	return [`/business`] as const;
};

export const useBusinessGetAllQueryOptions = <
	TData = Awaited<ReturnType<ReturnType<typeof useBusinessGetAllHook>>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(options?: {
	query?: Partial<
		CreateQueryOptions<Awaited<ReturnType<ReturnType<typeof useBusinessGetAllHook>>>, TError, TData>
	>;
}) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getBusinessGetAllQueryKey();

	const businessGetAll = useBusinessGetAllHook();

	const queryFn: QueryFunction<
		Awaited<ReturnType<ReturnType<typeof useBusinessGetAllHook>>>
	> = () => businessGetAll();

	return { queryKey, queryFn, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<ReturnType<typeof useBusinessGetAllHook>>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type BusinessGetAllQueryResult = NonNullable<
	Awaited<ReturnType<ReturnType<typeof useBusinessGetAllHook>>>
>;
export type BusinessGetAllQueryError = ErrorType<void | InternalErrorResponse>;

export const createBusinessGetAll = <
	TData = Awaited<ReturnType<ReturnType<typeof useBusinessGetAllHook>>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(options?: {
	query?: Partial<
		CreateQueryOptions<Awaited<ReturnType<ReturnType<typeof useBusinessGetAllHook>>>, TError, TData>
	>;
}): CreateQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = useBusinessGetAllQueryOptions(options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: QueryKey;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
};

export const useBusinessEditHook = () => {
	const businessEdit = useCustomClient<unknown>();

	return (request34: BodyType<Request34>) => {
		return businessEdit({
			url: `/business`,
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			data: request34,
		});
	};
};

export const useBusinessEditMutationOptions = <
	TError = ErrorType<ErrorResponse | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<ReturnType<typeof useBusinessEditHook>>>,
		TError,
		{ data: BodyType<Request34> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<ReturnType<typeof useBusinessEditHook>>>,
	TError,
	{ data: BodyType<Request34> },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const businessEdit = useBusinessEditHook();

	const mutationFn: MutationFunction<
		Awaited<ReturnType<ReturnType<typeof useBusinessEditHook>>>,
		{ data: BodyType<Request34> }
	> = (props) => {
		const { data } = props ?? {};

		return businessEdit(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type BusinessEditMutationResult = NonNullable<
	Awaited<ReturnType<ReturnType<typeof useBusinessEditHook>>>
>;
export type BusinessEditMutationBody = BodyType<Request34>;
export type BusinessEditMutationError = ErrorType<ErrorResponse | InternalErrorResponse>;

export const createBusinessEdit = <
	TError = ErrorType<ErrorResponse | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<ReturnType<typeof useBusinessEditHook>>>,
		TError,
		{ data: BodyType<Request34> },
		TContext
	>;
}) => {
	const mutationOptions = useBusinessEditMutationOptions(options);

	return createMutation(mutationOptions);
};
export const useBusinessDeleteHook = () => {
	const businessDelete = useCustomClient<unknown>();

	return (request35: BodyType<Request35>) => {
		return businessDelete({
			url: `/business`,
			method: "DELETE",
			headers: { "Content-Type": "*/*" },
			data: request35,
		});
	};
};

export const useBusinessDeleteMutationOptions = <
	TError = ErrorType<ErrorResponse | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<ReturnType<typeof useBusinessDeleteHook>>>,
		TError,
		{ data: BodyType<Request35> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<ReturnType<typeof useBusinessDeleteHook>>>,
	TError,
	{ data: BodyType<Request35> },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const businessDelete = useBusinessDeleteHook();

	const mutationFn: MutationFunction<
		Awaited<ReturnType<ReturnType<typeof useBusinessDeleteHook>>>,
		{ data: BodyType<Request35> }
	> = (props) => {
		const { data } = props ?? {};

		return businessDelete(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type BusinessDeleteMutationResult = NonNullable<
	Awaited<ReturnType<ReturnType<typeof useBusinessDeleteHook>>>
>;
export type BusinessDeleteMutationBody = BodyType<Request35>;
export type BusinessDeleteMutationError = ErrorType<ErrorResponse | InternalErrorResponse>;

export const createBusinessDelete = <
	TError = ErrorType<ErrorResponse | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<ReturnType<typeof useBusinessDeleteHook>>>,
		TError,
		{ data: BodyType<Request35> },
		TContext
	>;
}) => {
	const mutationOptions = useBusinessDeleteMutationOptions(options);

	return createMutation(mutationOptions);
};
export const useBusinessCreateHook = () => {
	const businessCreate = useCustomClient<Business>();

	return (request36: BodyType<Request36>) => {
		return businessCreate({
			url: `/business`,
			method: "POST",
			headers: { "Content-Type": "application/json" },
			data: request36,
		});
	};
};

export const useBusinessCreateMutationOptions = <
	TError = ErrorType<ErrorResponse | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<ReturnType<typeof useBusinessCreateHook>>>,
		TError,
		{ data: BodyType<Request36> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<ReturnType<typeof useBusinessCreateHook>>>,
	TError,
	{ data: BodyType<Request36> },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const businessCreate = useBusinessCreateHook();

	const mutationFn: MutationFunction<
		Awaited<ReturnType<ReturnType<typeof useBusinessCreateHook>>>,
		{ data: BodyType<Request36> }
	> = (props) => {
		const { data } = props ?? {};

		return businessCreate(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type BusinessCreateMutationResult = NonNullable<
	Awaited<ReturnType<ReturnType<typeof useBusinessCreateHook>>>
>;
export type BusinessCreateMutationBody = BodyType<Request36>;
export type BusinessCreateMutationError = ErrorType<ErrorResponse | InternalErrorResponse>;

export const createBusinessCreate = <
	TError = ErrorType<ErrorResponse | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<ReturnType<typeof useBusinessCreateHook>>>,
		TError,
		{ data: BodyType<Request36> },
		TContext
	>;
}) => {
	const mutationOptions = useBusinessCreateMutationOptions(options);

	return createMutation(mutationOptions);
};
export const useBusinessGetHook = () => {
	const businessGet = useCustomClient<Business>();

	return (id: number) => {
		return businessGet({ url: `/business/${id}`, method: "GET" });
	};
};

export const getBusinessGetQueryKey = (id: number) => {
	return [`/business/${id}`] as const;
};

export const useBusinessGetQueryOptions = <
	TData = Awaited<ReturnType<ReturnType<typeof useBusinessGetHook>>>,
	TError = ErrorType<InternalErrorResponse>,
>(
	id: number,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<ReturnType<typeof useBusinessGetHook>>>, TError, TData>
		>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getBusinessGetQueryKey(id);

	const businessGet = useBusinessGetHook();

	const queryFn: QueryFunction<Awaited<ReturnType<ReturnType<typeof useBusinessGetHook>>>> = () =>
		businessGet(id);

	return { queryKey, queryFn, enabled: !!id, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<ReturnType<typeof useBusinessGetHook>>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type BusinessGetQueryResult = NonNullable<
	Awaited<ReturnType<ReturnType<typeof useBusinessGetHook>>>
>;
export type BusinessGetQueryError = ErrorType<InternalErrorResponse>;

export const createBusinessGet = <
	TData = Awaited<ReturnType<ReturnType<typeof useBusinessGetHook>>>,
	TError = ErrorType<InternalErrorResponse>,
>(
	id: number,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<ReturnType<typeof useBusinessGetHook>>>, TError, TData>
		>;
	}
): CreateQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = useBusinessGetQueryOptions(id, options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: QueryKey;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
};
