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
	DTOOptionDTO,
	DTOOptionGroupBasicDTO,
	ErrorResponse,
	InternalErrorResponse,
	OptionCreateRequest,
	OptionGroupCreateRequest,
	OptionGroupUpdateRequest,
	OptionUpdateRequest,
} from "./api.schemas";
import { customInstance } from "../mutator/customInstance.svelte";
import type { ErrorType, BodyType } from "../mutator/customInstance.svelte";

export const optionUpdate = (optionUpdateRequest: BodyType<OptionUpdateRequest>) => {
	return customInstance<unknown>({
		url: `/option`,
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		data: optionUpdateRequest,
	});
};

export const getOptionUpdateMutationOptions = <
	TData = Awaited<ReturnType<typeof optionUpdate>>,
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		TData,
		TError,
		{ data: BodyType<OptionUpdateRequest> },
		TContext
	>;
}) => {
	const mutationKey = ["optionUpdate"];
	const { mutation: mutationOptions } = options
		? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey
			? options
			: { ...options, mutation: { ...options.mutation, mutationKey } }
		: { mutation: { mutationKey } };

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof optionUpdate>>,
		{ data: BodyType<OptionUpdateRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return optionUpdate(data);
	};

	return { mutationFn, ...mutationOptions } as CreateMutationOptions<
		TData,
		TError,
		{ data: BodyType<OptionUpdateRequest> },
		TContext
	>;
};

export type OptionUpdateMutationResult = NonNullable<Awaited<ReturnType<typeof optionUpdate>>>;
export type OptionUpdateMutationBody = BodyType<OptionUpdateRequest>;
export type OptionUpdateMutationError = ErrorType<void | InternalErrorResponse>;

export const createOptionUpdate = <
	TData = Awaited<ReturnType<typeof optionUpdate>>,
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		TData,
		TError,
		{ data: BodyType<OptionUpdateRequest> },
		TContext
	>;
}): CreateMutationResult<TData, TError, { data: BodyType<OptionUpdateRequest> }, TContext> => {
	const mutationOptions = getOptionUpdateMutationOptions(options);

	return createMutation(mutationOptions);
};
export const optionGroup = () => {
	return customInstance<DTOOptionGroupBasicDTO[]>({ url: `/option`, method: "GET" });
};

export const getOptionGroupQueryKey = () => {
	return [`/option`] as const;
};

export const getOptionGroupQueryOptions = <
	TData = Awaited<ReturnType<typeof optionGroup>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(options?: {
	query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof optionGroup>>, TError, TData>>;
}) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getOptionGroupQueryKey();

	const queryFn: QueryFunction<Awaited<ReturnType<typeof optionGroup>>> = () => optionGroup();

	return { queryKey, queryFn, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<typeof optionGroup>>,
		TError,
		TData
	> & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type OptionGroupQueryResult = NonNullable<Awaited<ReturnType<typeof optionGroup>>>;
export type OptionGroupQueryError = ErrorType<void | InternalErrorResponse>;

export function createOptionGroup<
	TData = Awaited<ReturnType<typeof optionGroup>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(options?: {
	query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof optionGroup>>, TError, TData>>;
}): CreateQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {
	const queryOptions = getOptionGroupQueryOptions(options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: DataTag<QueryKey, TData, TError>;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
}

export const optionCreate = (optionCreateRequest: BodyType<OptionCreateRequest>) => {
	return customInstance<unknown>({
		url: `/option`,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		data: optionCreateRequest,
	});
};

export const getOptionCreateMutationOptions = <
	TData = Awaited<ReturnType<typeof optionCreate>>,
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		TData,
		TError,
		{ data: BodyType<OptionCreateRequest> },
		TContext
	>;
}) => {
	const mutationKey = ["optionCreate"];
	const { mutation: mutationOptions } = options
		? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey
			? options
			: { ...options, mutation: { ...options.mutation, mutationKey } }
		: { mutation: { mutationKey } };

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof optionCreate>>,
		{ data: BodyType<OptionCreateRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return optionCreate(data);
	};

	return { mutationFn, ...mutationOptions } as CreateMutationOptions<
		TData,
		TError,
		{ data: BodyType<OptionCreateRequest> },
		TContext
	>;
};

export type OptionCreateMutationResult = NonNullable<Awaited<ReturnType<typeof optionCreate>>>;
export type OptionCreateMutationBody = BodyType<OptionCreateRequest>;
export type OptionCreateMutationError = ErrorType<void | InternalErrorResponse>;

export const createOptionCreate = <
	TData = Awaited<ReturnType<typeof optionCreate>>,
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		TData,
		TError,
		{ data: BodyType<OptionCreateRequest> },
		TContext
	>;
}): CreateMutationResult<TData, TError, { data: BodyType<OptionCreateRequest> }, TContext> => {
	const mutationOptions = getOptionCreateMutationOptions(options);

	return createMutation(mutationOptions);
};
export const optionItems = (id: number) => {
	return customInstance<DTOOptionDTO[]>({ url: `/option/${id}`, method: "GET" });
};

export const getOptionItemsQueryKey = (id: number) => {
	return [`/option/${id}`] as const;
};

export const getOptionItemsQueryOptions = <
	TData = Awaited<ReturnType<typeof optionItems>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	id: number,
	options?: {
		query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof optionItems>>, TError, TData>>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getOptionItemsQueryKey(id);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof optionItems>>> = () => optionItems(id);

	return { queryKey, queryFn, enabled: !!id, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<typeof optionItems>>,
		TError,
		TData
	> & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type OptionItemsQueryResult = NonNullable<Awaited<ReturnType<typeof optionItems>>>;
export type OptionItemsQueryError = ErrorType<void | InternalErrorResponse>;

export function createOptionItems<
	TData = Awaited<ReturnType<typeof optionItems>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	id: number,
	options?: {
		query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof optionItems>>, TError, TData>>;
	}
): CreateQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {
	const queryOptions = getOptionItemsQueryOptions(id, options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: DataTag<QueryKey, TData, TError>;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
}

export const optionDelete = (id: number) => {
	return customInstance<unknown>({ url: `/option/${id}`, method: "DELETE" });
};

export const getOptionDeleteMutationOptions = <
	TData = Awaited<ReturnType<typeof optionDelete>>,
	TError = ErrorType<ErrorResponse | void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<TData, TError, { id: number }, TContext>;
}) => {
	const mutationKey = ["optionDelete"];
	const { mutation: mutationOptions } = options
		? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey
			? options
			: { ...options, mutation: { ...options.mutation, mutationKey } }
		: { mutation: { mutationKey } };

	const mutationFn: MutationFunction<Awaited<ReturnType<typeof optionDelete>>, { id: number }> = (
		props
	) => {
		const { id } = props ?? {};

		return optionDelete(id);
	};

	return { mutationFn, ...mutationOptions } as CreateMutationOptions<
		TData,
		TError,
		{ id: number },
		TContext
	>;
};

export type OptionDeleteMutationResult = NonNullable<Awaited<ReturnType<typeof optionDelete>>>;

export type OptionDeleteMutationError = ErrorType<ErrorResponse | void | InternalErrorResponse>;

export const createOptionDelete = <
	TData = Awaited<ReturnType<typeof optionDelete>>,
	TError = ErrorType<ErrorResponse | void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<TData, TError, { id: number }, TContext>;
}): CreateMutationResult<TData, TError, { id: number }, TContext> => {
	const mutationOptions = getOptionDeleteMutationOptions(options);

	return createMutation(mutationOptions);
};
export const optionGroupUpdate = (optionGroupUpdateRequest: BodyType<OptionGroupUpdateRequest>) => {
	return customInstance<unknown>({
		url: `/option/group`,
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		data: optionGroupUpdateRequest,
	});
};

export const getOptionGroupUpdateMutationOptions = <
	TData = Awaited<ReturnType<typeof optionGroupUpdate>>,
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		TData,
		TError,
		{ data: BodyType<OptionGroupUpdateRequest> },
		TContext
	>;
}) => {
	const mutationKey = ["optionGroupUpdate"];
	const { mutation: mutationOptions } = options
		? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey
			? options
			: { ...options, mutation: { ...options.mutation, mutationKey } }
		: { mutation: { mutationKey } };

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof optionGroupUpdate>>,
		{ data: BodyType<OptionGroupUpdateRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return optionGroupUpdate(data);
	};

	return { mutationFn, ...mutationOptions } as CreateMutationOptions<
		TData,
		TError,
		{ data: BodyType<OptionGroupUpdateRequest> },
		TContext
	>;
};

export type OptionGroupUpdateMutationResult = NonNullable<
	Awaited<ReturnType<typeof optionGroupUpdate>>
>;
export type OptionGroupUpdateMutationBody = BodyType<OptionGroupUpdateRequest>;
export type OptionGroupUpdateMutationError = ErrorType<void | InternalErrorResponse>;

export const createOptionGroupUpdate = <
	TData = Awaited<ReturnType<typeof optionGroupUpdate>>,
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		TData,
		TError,
		{ data: BodyType<OptionGroupUpdateRequest> },
		TContext
	>;
}): CreateMutationResult<TData, TError, { data: BodyType<OptionGroupUpdateRequest> }, TContext> => {
	const mutationOptions = getOptionGroupUpdateMutationOptions(options);

	return createMutation(mutationOptions);
};
export const optionGroupCreate = (optionGroupCreateRequest: BodyType<OptionGroupCreateRequest>) => {
	return customInstance<unknown>({
		url: `/option/group`,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		data: optionGroupCreateRequest,
	});
};

export const getOptionGroupCreateMutationOptions = <
	TData = Awaited<ReturnType<typeof optionGroupCreate>>,
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		TData,
		TError,
		{ data: BodyType<OptionGroupCreateRequest> },
		TContext
	>;
}) => {
	const mutationKey = ["optionGroupCreate"];
	const { mutation: mutationOptions } = options
		? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey
			? options
			: { ...options, mutation: { ...options.mutation, mutationKey } }
		: { mutation: { mutationKey } };

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof optionGroupCreate>>,
		{ data: BodyType<OptionGroupCreateRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return optionGroupCreate(data);
	};

	return { mutationFn, ...mutationOptions } as CreateMutationOptions<
		TData,
		TError,
		{ data: BodyType<OptionGroupCreateRequest> },
		TContext
	>;
};

export type OptionGroupCreateMutationResult = NonNullable<
	Awaited<ReturnType<typeof optionGroupCreate>>
>;
export type OptionGroupCreateMutationBody = BodyType<OptionGroupCreateRequest>;
export type OptionGroupCreateMutationError = ErrorType<void | InternalErrorResponse>;

export const createOptionGroupCreate = <
	TData = Awaited<ReturnType<typeof optionGroupCreate>>,
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		TData,
		TError,
		{ data: BodyType<OptionGroupCreateRequest> },
		TContext
	>;
}): CreateMutationResult<TData, TError, { data: BodyType<OptionGroupCreateRequest> }, TContext> => {
	const mutationOptions = getOptionGroupCreateMutationOptions(options);

	return createMutation(mutationOptions);
};
export const optionGroupDelete = (id: number) => {
	return customInstance<unknown>({ url: `/option/group/${id}`, method: "DELETE" });
};

export const getOptionGroupDeleteMutationOptions = <
	TData = Awaited<ReturnType<typeof optionGroupDelete>>,
	TError = ErrorType<ErrorResponse | void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<TData, TError, { id: number }, TContext>;
}) => {
	const mutationKey = ["optionGroupDelete"];
	const { mutation: mutationOptions } = options
		? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey
			? options
			: { ...options, mutation: { ...options.mutation, mutationKey } }
		: { mutation: { mutationKey } };

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof optionGroupDelete>>,
		{ id: number }
	> = (props) => {
		const { id } = props ?? {};

		return optionGroupDelete(id);
	};

	return { mutationFn, ...mutationOptions } as CreateMutationOptions<
		TData,
		TError,
		{ id: number },
		TContext
	>;
};

export type OptionGroupDeleteMutationResult = NonNullable<
	Awaited<ReturnType<typeof optionGroupDelete>>
>;

export type OptionGroupDeleteMutationError = ErrorType<
	ErrorResponse | void | InternalErrorResponse
>;

export const createOptionGroupDelete = <
	TData = Awaited<ReturnType<typeof optionGroupDelete>>,
	TError = ErrorType<ErrorResponse | void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<TData, TError, { id: number }, TContext>;
}): CreateMutationResult<TData, TError, { id: number }, TContext> => {
	const mutationOptions = getOptionGroupDeleteMutationOptions(options);

	return createMutation(mutationOptions);
};
