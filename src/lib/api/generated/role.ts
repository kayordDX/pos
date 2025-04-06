// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/**
 * Generated by orval v7.8.0 🍺
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

import type { EntitiesRole, InternalErrorResponse, RoleCreateRequest } from "./api.schemas";

import { customInstance } from "../mutator/customInstance.svelte";
import type { ErrorType, BodyType } from "../mutator/customInstance.svelte";

export const roleCreate = (roleCreateRequest: BodyType<RoleCreateRequest>) => {
	return customInstance<void>({
		url: `/role/createRole`,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		data: roleCreateRequest,
	});
};

export const getRoleCreateMutationOptions = <
	TError = ErrorType<InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof roleCreate>>,
		TError,
		{ data: BodyType<RoleCreateRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<typeof roleCreate>>,
	TError,
	{ data: BodyType<RoleCreateRequest> },
	TContext
> => {
	const mutationKey = ["roleCreate"];
	const { mutation: mutationOptions } = options
		? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey
			? options
			: { ...options, mutation: { ...options.mutation, mutationKey } }
		: { mutation: { mutationKey } };

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof roleCreate>>,
		{ data: BodyType<RoleCreateRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return roleCreate(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type RoleCreateMutationResult = NonNullable<Awaited<ReturnType<typeof roleCreate>>>;
export type RoleCreateMutationBody = BodyType<RoleCreateRequest>;
export type RoleCreateMutationError = ErrorType<InternalErrorResponse>;

export const createRoleCreate = <TError = ErrorType<InternalErrorResponse>, TContext = unknown>(
	options?: {
		mutation?: CreateMutationOptions<
			Awaited<ReturnType<typeof roleCreate>>,
			TError,
			{ data: BodyType<RoleCreateRequest> },
			TContext
		>;
	},
	queryClient?: QueryClient
): CreateMutationResult<
	Awaited<ReturnType<typeof roleCreate>>,
	TError,
	{ data: BodyType<RoleCreateRequest> },
	TContext
> => {
	const mutationOptions = getRoleCreateMutationOptions(options);

	return createMutation(mutationOptions, queryClient);
};
export const roleGetAll = (outletId: number) => {
	return customInstance<EntitiesRole[]>({ url: `/role/${outletId}`, method: "GET" });
};

export const getRoleGetAllQueryKey = (outletId: number) => {
	return [`/role/${outletId}`] as const;
};

export const getRoleGetAllQueryOptions = <
	TData = Awaited<ReturnType<typeof roleGetAll>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	outletId: number,
	options?: {
		query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof roleGetAll>>, TError, TData>>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getRoleGetAllQueryKey(outletId);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof roleGetAll>>> = () => roleGetAll(outletId);

	return { queryKey, queryFn, enabled: !!outletId, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<typeof roleGetAll>>,
		TError,
		TData
	> & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type RoleGetAllQueryResult = NonNullable<Awaited<ReturnType<typeof roleGetAll>>>;
export type RoleGetAllQueryError = ErrorType<void | InternalErrorResponse>;

export function createRoleGetAll<
	TData = Awaited<ReturnType<typeof roleGetAll>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	outletId: number,
	options?: {
		query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof roleGetAll>>, TError, TData>>;
	},
	queryClient?: QueryClient
): CreateQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {
	const queryOptions = getRoleGetAllQueryOptions(outletId, options);

	const query = createQuery(queryOptions, queryClient) as CreateQueryResult<TData, TError> & {
		queryKey: DataTag<QueryKey, TData, TError>;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
}
