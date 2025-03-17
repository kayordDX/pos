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
	EntitiesSection,
	ErrorResponse,
	InternalErrorResponse,
	SectionCreateRequest,
	SectionListParams,
	SectionUpdateRequest,
} from "./api.schemas";

import { customInstance } from "../mutator/customInstance.svelte";
import type { ErrorType, BodyType } from "../mutator/customInstance.svelte";

export const sectionUpdate = (
	sectionId: number,
	sectionUpdateRequest: BodyType<SectionUpdateRequest>
) => {
	return customInstance<EntitiesSection>({
		url: `/section/${sectionId}`,
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		data: sectionUpdateRequest,
	});
};

export const getSectionUpdateMutationOptions = <
	TError = ErrorType<ErrorResponse | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof sectionUpdate>>,
		TError,
		{ sectionId: number; data: BodyType<SectionUpdateRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<typeof sectionUpdate>>,
	TError,
	{ sectionId: number; data: BodyType<SectionUpdateRequest> },
	TContext
> => {
	const mutationKey = ["sectionUpdate"];
	const { mutation: mutationOptions } = options
		? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey
			? options
			: { ...options, mutation: { ...options.mutation, mutationKey } }
		: { mutation: { mutationKey } };

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof sectionUpdate>>,
		{ sectionId: number; data: BodyType<SectionUpdateRequest> }
	> = (props) => {
		const { sectionId, data } = props ?? {};

		return sectionUpdate(sectionId, data);
	};

	return { mutationFn, ...mutationOptions };
};

export type SectionUpdateMutationResult = NonNullable<Awaited<ReturnType<typeof sectionUpdate>>>;
export type SectionUpdateMutationBody = BodyType<SectionUpdateRequest>;
export type SectionUpdateMutationError = ErrorType<ErrorResponse | InternalErrorResponse>;

export const createSectionUpdate = <
	TError = ErrorType<ErrorResponse | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof sectionUpdate>>,
		TError,
		{ sectionId: number; data: BodyType<SectionUpdateRequest> },
		TContext
	>;
}): CreateMutationResult<
	Awaited<ReturnType<typeof sectionUpdate>>,
	TError,
	{ sectionId: number; data: BodyType<SectionUpdateRequest> },
	TContext
> => {
	const mutationOptions = getSectionUpdateMutationOptions(options);

	return createMutation(mutationOptions);
};
export const sectionGet = (sectionId: number) => {
	return customInstance<EntitiesSection>({ url: `/section/${sectionId}`, method: "GET" });
};

export const getSectionGetQueryKey = (sectionId: number) => {
	return [`/section/${sectionId}`] as const;
};

export const getSectionGetQueryOptions = <
	TData = Awaited<ReturnType<typeof sectionGet>>,
	TError = ErrorType<ErrorResponse | InternalErrorResponse>,
>(
	sectionId: number,
	options?: {
		query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof sectionGet>>, TError, TData>>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getSectionGetQueryKey(sectionId);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof sectionGet>>> = () =>
		sectionGet(sectionId);

	return { queryKey, queryFn, enabled: !!sectionId, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<typeof sectionGet>>,
		TError,
		TData
	> & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type SectionGetQueryResult = NonNullable<Awaited<ReturnType<typeof sectionGet>>>;
export type SectionGetQueryError = ErrorType<ErrorResponse | InternalErrorResponse>;

export function createSectionGet<
	TData = Awaited<ReturnType<typeof sectionGet>>,
	TError = ErrorType<ErrorResponse | InternalErrorResponse>,
>(
	sectionId: number,
	options?: {
		query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof sectionGet>>, TError, TData>>;
	}
): CreateQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {
	const queryOptions = getSectionGetQueryOptions(sectionId, options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: DataTag<QueryKey, TData, TError>;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
}

export const sectionList = (params: SectionListParams) => {
	return customInstance<EntitiesSection[]>({ url: `/section`, method: "GET", params });
};

export const getSectionListQueryKey = (params: SectionListParams) => {
	return [`/section`, ...(params ? [params] : [])] as const;
};

export const getSectionListQueryOptions = <
	TData = Awaited<ReturnType<typeof sectionList>>,
	TError = ErrorType<ErrorResponse | InternalErrorResponse>,
>(
	params: SectionListParams,
	options?: {
		query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof sectionList>>, TError, TData>>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getSectionListQueryKey(params);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof sectionList>>> = () => sectionList(params);

	return { queryKey, queryFn, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<typeof sectionList>>,
		TError,
		TData
	> & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type SectionListQueryResult = NonNullable<Awaited<ReturnType<typeof sectionList>>>;
export type SectionListQueryError = ErrorType<ErrorResponse | InternalErrorResponse>;

export function createSectionList<
	TData = Awaited<ReturnType<typeof sectionList>>,
	TError = ErrorType<ErrorResponse | InternalErrorResponse>,
>(
	params: SectionListParams,
	options?: {
		query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof sectionList>>, TError, TData>>;
	}
): CreateQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {
	const queryOptions = getSectionListQueryOptions(params, options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: DataTag<QueryKey, TData, TError>;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
}

export const sectionCreate = (sectionCreateRequest: BodyType<SectionCreateRequest>) => {
	return customInstance<EntitiesSection>({
		url: `/section`,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		data: sectionCreateRequest,
	});
};

export const getSectionCreateMutationOptions = <
	TError = ErrorType<ErrorResponse | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof sectionCreate>>,
		TError,
		{ data: BodyType<SectionCreateRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<typeof sectionCreate>>,
	TError,
	{ data: BodyType<SectionCreateRequest> },
	TContext
> => {
	const mutationKey = ["sectionCreate"];
	const { mutation: mutationOptions } = options
		? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey
			? options
			: { ...options, mutation: { ...options.mutation, mutationKey } }
		: { mutation: { mutationKey } };

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof sectionCreate>>,
		{ data: BodyType<SectionCreateRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return sectionCreate(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type SectionCreateMutationResult = NonNullable<Awaited<ReturnType<typeof sectionCreate>>>;
export type SectionCreateMutationBody = BodyType<SectionCreateRequest>;
export type SectionCreateMutationError = ErrorType<ErrorResponse | InternalErrorResponse>;

export const createSectionCreate = <
	TError = ErrorType<ErrorResponse | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof sectionCreate>>,
		TError,
		{ data: BodyType<SectionCreateRequest> },
		TContext
	>;
}): CreateMutationResult<
	Awaited<ReturnType<typeof sectionCreate>>,
	TError,
	{ data: BodyType<SectionCreateRequest> },
	TContext
> => {
	const mutationOptions = getSectionCreateMutationOptions(options);

	return createMutation(mutationOptions);
};
