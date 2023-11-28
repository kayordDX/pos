/**
 * Generated by orval v6.21.0 🍺
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
	ErrorResponse,
	InternalErrorResponse,
	Outlet,
	Request21,
	Request22,
} from "./api.schemas";
import { useCustomClient } from "../mutator/useCustomClient";
import type { ErrorType, BodyType } from "../mutator/useCustomClient";

export const useOutletListHook = () => {
	const outletList = useCustomClient<Outlet[]>();

	return () => {
		return outletList({ url: `/outlet`, method: "GET" });
	};
};

export const getOutletListQueryKey = () => {
	return [`/outlet`] as const;
};

export const useOutletListQueryOptions = <
	TData = Awaited<ReturnType<ReturnType<typeof useOutletListHook>>>,
	TError = ErrorType<InternalErrorResponse>,
>(options?: {
	query?: CreateQueryOptions<
		Awaited<ReturnType<ReturnType<typeof useOutletListHook>>>,
		TError,
		TData
	>;
}) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getOutletListQueryKey();

	const outletList = useOutletListHook();

	const queryFn: QueryFunction<Awaited<ReturnType<ReturnType<typeof useOutletListHook>>>> = () =>
		outletList();

	return { queryKey, queryFn, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<ReturnType<typeof useOutletListHook>>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type OutletListQueryResult = NonNullable<
	Awaited<ReturnType<ReturnType<typeof useOutletListHook>>>
>;
export type OutletListQueryError = ErrorType<InternalErrorResponse>;

export const createOutletList = <
	TData = Awaited<ReturnType<ReturnType<typeof useOutletListHook>>>,
	TError = ErrorType<InternalErrorResponse>,
>(options?: {
	query?: CreateQueryOptions<
		Awaited<ReturnType<ReturnType<typeof useOutletListHook>>>,
		TError,
		TData
	>;
}): CreateQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = useOutletListQueryOptions(options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: QueryKey;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
};

export const useOutletCreateHook = () => {
	const outletCreate = useCustomClient<Outlet>();

	return (request22: BodyType<Request22>) => {
		return outletCreate({
			url: `/outlet`,
			method: "POST",
			headers: { "Content-Type": "application/json" },
			data: request22,
		});
	};
};

export const useOutletCreateMutationOptions = <
	TError = ErrorType<ErrorResponse | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<ReturnType<typeof useOutletCreateHook>>>,
		TError,
		{ data: BodyType<Request22> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<ReturnType<typeof useOutletCreateHook>>>,
	TError,
	{ data: BodyType<Request22> },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const outletCreate = useOutletCreateHook();

	const mutationFn: MutationFunction<
		Awaited<ReturnType<ReturnType<typeof useOutletCreateHook>>>,
		{ data: BodyType<Request22> }
	> = (props) => {
		const { data } = props ?? {};

		return outletCreate(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type OutletCreateMutationResult = NonNullable<
	Awaited<ReturnType<ReturnType<typeof useOutletCreateHook>>>
>;
export type OutletCreateMutationBody = BodyType<Request22>;
export type OutletCreateMutationError = ErrorType<ErrorResponse | InternalErrorResponse>;

export const createOutletCreate = <
	TError = ErrorType<ErrorResponse | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<ReturnType<typeof useOutletCreateHook>>>,
		TError,
		{ data: BodyType<Request22> },
		TContext
	>;
}) => {
	const mutationOptions = useOutletCreateMutationOptions(options);

	return createMutation(mutationOptions);
};
export const useOutletUpdateHook = () => {
	const outletUpdate = useCustomClient<Outlet>();

	return (id: number, request21: BodyType<Request21>) => {
		return outletUpdate({
			url: `/outlet/${id}`,
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			data: request21,
		});
	};
};

export const useOutletUpdateMutationOptions = <
	TError = ErrorType<ErrorResponse | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<ReturnType<typeof useOutletUpdateHook>>>,
		TError,
		{ id: number; data: BodyType<Request21> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<ReturnType<typeof useOutletUpdateHook>>>,
	TError,
	{ id: number; data: BodyType<Request21> },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const outletUpdate = useOutletUpdateHook();

	const mutationFn: MutationFunction<
		Awaited<ReturnType<ReturnType<typeof useOutletUpdateHook>>>,
		{ id: number; data: BodyType<Request21> }
	> = (props) => {
		const { id, data } = props ?? {};

		return outletUpdate(id, data);
	};

	return { mutationFn, ...mutationOptions };
};

export type OutletUpdateMutationResult = NonNullable<
	Awaited<ReturnType<ReturnType<typeof useOutletUpdateHook>>>
>;
export type OutletUpdateMutationBody = BodyType<Request21>;
export type OutletUpdateMutationError = ErrorType<ErrorResponse | InternalErrorResponse>;

export const createOutletUpdate = <
	TError = ErrorType<ErrorResponse | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<ReturnType<typeof useOutletUpdateHook>>>,
		TError,
		{ id: number; data: BodyType<Request21> },
		TContext
	>;
}) => {
	const mutationOptions = useOutletUpdateMutationOptions(options);

	return createMutation(mutationOptions);
};
export const useOutletGetHook = () => {
	const outletGet = useCustomClient<Outlet>();

	return (id: string | null) => {
		return outletGet({ url: `/outlet/${id}`, method: "GET" });
	};
};

export const getOutletGetQueryKey = (id: string | null) => {
	return [`/outlet/${id}`] as const;
};

export const useOutletGetQueryOptions = <
	TData = Awaited<ReturnType<ReturnType<typeof useOutletGetHook>>>,
	TError = ErrorType<InternalErrorResponse>,
>(
	id: string | null,
	options?: {
		query?: CreateQueryOptions<
			Awaited<ReturnType<ReturnType<typeof useOutletGetHook>>>,
			TError,
			TData
		>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getOutletGetQueryKey(id);

	const outletGet = useOutletGetHook();

	const queryFn: QueryFunction<Awaited<ReturnType<ReturnType<typeof useOutletGetHook>>>> = () =>
		outletGet(id);

	return { queryKey, queryFn, enabled: !!id, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<ReturnType<typeof useOutletGetHook>>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type OutletGetQueryResult = NonNullable<
	Awaited<ReturnType<ReturnType<typeof useOutletGetHook>>>
>;
export type OutletGetQueryError = ErrorType<InternalErrorResponse>;

export const createOutletGet = <
	TData = Awaited<ReturnType<ReturnType<typeof useOutletGetHook>>>,
	TError = ErrorType<InternalErrorResponse>,
>(
	id: string | null,
	options?: {
		query?: CreateQueryOptions<
			Awaited<ReturnType<ReturnType<typeof useOutletGetHook>>>,
			TError,
			TData
		>;
	}
): CreateQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = useOutletGetQueryOptions(id, options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: QueryKey;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
};
