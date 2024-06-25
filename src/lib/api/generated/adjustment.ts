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
	AdjustmentCreateRequest,
	EntitiesAdjustmentType,
	InternalErrorResponse,
} from "./api.schemas";
import { customInstance } from "../mutator/customInstance";
import type { ErrorType, BodyType } from "../mutator/customInstance";

export const adjustmentGetAll = (outletId: number) => {
	return customInstance<EntitiesAdjustmentType[]>({
		url: `/adjustment/${outletId}`,
		method: "GET",
	});
};

export const getAdjustmentGetAllQueryKey = (outletId: number) => {
	return [`/adjustment/${outletId}`] as const;
};

export const getAdjustmentGetAllQueryOptions = <
	TData = Awaited<ReturnType<typeof adjustmentGetAll>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	outletId: number,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<typeof adjustmentGetAll>>, TError, TData>
		>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getAdjustmentGetAllQueryKey(outletId);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof adjustmentGetAll>>> = () =>
		adjustmentGetAll(outletId);

	return { queryKey, queryFn, enabled: !!outletId, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<typeof adjustmentGetAll>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type AdjustmentGetAllQueryResult = NonNullable<Awaited<ReturnType<typeof adjustmentGetAll>>>;
export type AdjustmentGetAllQueryError = ErrorType<void | InternalErrorResponse>;

export const createAdjustmentGetAll = <
	TData = Awaited<ReturnType<typeof adjustmentGetAll>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	outletId: number,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<typeof adjustmentGetAll>>, TError, TData>
		>;
	}
): CreateQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = getAdjustmentGetAllQueryOptions(outletId, options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: QueryKey;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
};

export const adjustmentCreate = (adjustmentCreateRequest: BodyType<AdjustmentCreateRequest>) => {
	return customInstance<unknown>({
		url: `/adjustment`,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		data: adjustmentCreateRequest,
	});
};

export const getAdjustmentCreateMutationOptions = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof adjustmentCreate>>,
		TError,
		{ data: BodyType<AdjustmentCreateRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<typeof adjustmentCreate>>,
	TError,
	{ data: BodyType<AdjustmentCreateRequest> },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof adjustmentCreate>>,
		{ data: BodyType<AdjustmentCreateRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return adjustmentCreate(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type AdjustmentCreateMutationResult = NonNullable<
	Awaited<ReturnType<typeof adjustmentCreate>>
>;
export type AdjustmentCreateMutationBody = BodyType<AdjustmentCreateRequest>;
export type AdjustmentCreateMutationError = ErrorType<void | InternalErrorResponse>;

export const createAdjustmentCreate = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof adjustmentCreate>>,
		TError,
		{ data: BodyType<AdjustmentCreateRequest> },
		TContext
	>;
}): CreateMutationResult<
	Awaited<ReturnType<typeof adjustmentCreate>>,
	TError,
	{ data: BodyType<AdjustmentCreateRequest> },
	TContext
> => {
	const mutationOptions = getAdjustmentCreateMutationOptions(options);

	return createMutation(mutationOptions);
};
