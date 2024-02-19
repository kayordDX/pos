// @ts-nocheck
/**
 * Generated by orval v6.25.0 🍺
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
	EntitiesSection,
	ErrorResponse,
	InternalErrorResponse,
	SectionCreateRequest,
	SectionListParams,
	SectionUpdateRequest,
} from "./api.schemas";
import { useCustomClient } from "../mutator/useCustomClient";
import type { ErrorType, BodyType } from "../mutator/useCustomClient";

export const useSectionUpdateHook = () => {
	const sectionUpdate = useCustomClient<EntitiesSection>();

	return (sectionId: string | null, sectionUpdateRequest: BodyType<SectionUpdateRequest>) => {
		return sectionUpdate({
			url: `/section/${sectionId}`,
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			data: sectionUpdateRequest,
		});
	};
};

export const useSectionUpdateMutationOptions = <
	TError = ErrorType<ErrorResponse | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<ReturnType<typeof useSectionUpdateHook>>>,
		TError,
		{ sectionId: string | null; data: BodyType<SectionUpdateRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<ReturnType<typeof useSectionUpdateHook>>>,
	TError,
	{ sectionId: string | null; data: BodyType<SectionUpdateRequest> },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const sectionUpdate = useSectionUpdateHook();

	const mutationFn: MutationFunction<
		Awaited<ReturnType<ReturnType<typeof useSectionUpdateHook>>>,
		{ sectionId: string | null; data: BodyType<SectionUpdateRequest> }
	> = (props) => {
		const { sectionId, data } = props ?? {};

		return sectionUpdate(sectionId, data);
	};

	return { mutationFn, ...mutationOptions };
};

export type SectionUpdateMutationResult = NonNullable<
	Awaited<ReturnType<ReturnType<typeof useSectionUpdateHook>>>
>;
export type SectionUpdateMutationBody = BodyType<SectionUpdateRequest>;
export type SectionUpdateMutationError = ErrorType<ErrorResponse | InternalErrorResponse>;

export const createSectionUpdate = <
	TError = ErrorType<ErrorResponse | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<ReturnType<typeof useSectionUpdateHook>>>,
		TError,
		{ sectionId: string | null; data: BodyType<SectionUpdateRequest> },
		TContext
	>;
}) => {
	const mutationOptions = useSectionUpdateMutationOptions(options);

	return createMutation(mutationOptions);
};
export const useSectionGetHook = () => {
	const sectionGet = useCustomClient<EntitiesSection>();

	return (sectionId: number) => {
		return sectionGet({ url: `/section/${sectionId}`, method: "GET" });
	};
};

export const getSectionGetQueryKey = (sectionId: number) => {
	return [`/section/${sectionId}`] as const;
};

export const useSectionGetQueryOptions = <
	TData = Awaited<ReturnType<ReturnType<typeof useSectionGetHook>>>,
	TError = ErrorType<ErrorResponse | InternalErrorResponse>,
>(
	sectionId: number,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<ReturnType<typeof useSectionGetHook>>>, TError, TData>
		>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getSectionGetQueryKey(sectionId);

	const sectionGet = useSectionGetHook();

	const queryFn: QueryFunction<Awaited<ReturnType<ReturnType<typeof useSectionGetHook>>>> = () =>
		sectionGet(sectionId);

	return { queryKey, queryFn, enabled: !!sectionId, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<ReturnType<typeof useSectionGetHook>>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type SectionGetQueryResult = NonNullable<
	Awaited<ReturnType<ReturnType<typeof useSectionGetHook>>>
>;
export type SectionGetQueryError = ErrorType<ErrorResponse | InternalErrorResponse>;

export const createSectionGet = <
	TData = Awaited<ReturnType<ReturnType<typeof useSectionGetHook>>>,
	TError = ErrorType<ErrorResponse | InternalErrorResponse>,
>(
	sectionId: number,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<ReturnType<typeof useSectionGetHook>>>, TError, TData>
		>;
	}
): CreateQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = useSectionGetQueryOptions(sectionId, options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: QueryKey;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
};

export const useSectionListHook = () => {
	const sectionList = useCustomClient<EntitiesSection[]>();

	return (params: SectionListParams) => {
		return sectionList({ url: `/section`, method: "GET", params });
	};
};

export const getSectionListQueryKey = (params: SectionListParams) => {
	return [`/section`, ...(params ? [params] : [])] as const;
};

export const useSectionListQueryOptions = <
	TData = Awaited<ReturnType<ReturnType<typeof useSectionListHook>>>,
	TError = ErrorType<ErrorResponse | InternalErrorResponse>,
>(
	params: SectionListParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<ReturnType<typeof useSectionListHook>>>, TError, TData>
		>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getSectionListQueryKey(params);

	const sectionList = useSectionListHook();

	const queryFn: QueryFunction<Awaited<ReturnType<ReturnType<typeof useSectionListHook>>>> = () =>
		sectionList(params);

	return { queryKey, queryFn, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<ReturnType<typeof useSectionListHook>>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type SectionListQueryResult = NonNullable<
	Awaited<ReturnType<ReturnType<typeof useSectionListHook>>>
>;
export type SectionListQueryError = ErrorType<ErrorResponse | InternalErrorResponse>;

export const createSectionList = <
	TData = Awaited<ReturnType<ReturnType<typeof useSectionListHook>>>,
	TError = ErrorType<ErrorResponse | InternalErrorResponse>,
>(
	params: SectionListParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<ReturnType<typeof useSectionListHook>>>, TError, TData>
		>;
	}
): CreateQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = useSectionListQueryOptions(params, options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: QueryKey;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
};

export const useSectionCreateHook = () => {
	const sectionCreate = useCustomClient<EntitiesSection>();

	return (sectionCreateRequest: BodyType<SectionCreateRequest>) => {
		return sectionCreate({
			url: `/section`,
			method: "POST",
			headers: { "Content-Type": "application/json" },
			data: sectionCreateRequest,
		});
	};
};

export const useSectionCreateMutationOptions = <
	TError = ErrorType<ErrorResponse | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<ReturnType<typeof useSectionCreateHook>>>,
		TError,
		{ data: BodyType<SectionCreateRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<ReturnType<typeof useSectionCreateHook>>>,
	TError,
	{ data: BodyType<SectionCreateRequest> },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const sectionCreate = useSectionCreateHook();

	const mutationFn: MutationFunction<
		Awaited<ReturnType<ReturnType<typeof useSectionCreateHook>>>,
		{ data: BodyType<SectionCreateRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return sectionCreate(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type SectionCreateMutationResult = NonNullable<
	Awaited<ReturnType<ReturnType<typeof useSectionCreateHook>>>
>;
export type SectionCreateMutationBody = BodyType<SectionCreateRequest>;
export type SectionCreateMutationError = ErrorType<ErrorResponse | InternalErrorResponse>;

export const createSectionCreate = <
	TError = ErrorType<ErrorResponse | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<ReturnType<typeof useSectionCreateHook>>>,
		TError,
		{ data: BodyType<SectionCreateRequest> },
		TContext
	>;
}) => {
	const mutationOptions = useSectionCreateMutationOptions(options);

	return createMutation(mutationOptions);
};
