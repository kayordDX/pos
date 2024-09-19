// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/**
 * Generated by orval v7.1.1 🍺
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
	EntitiesRole,
	InternalErrorResponse,
	RoleAddUserInRoleRequest,
	RoleCreateRequest,
} from "./api.schemas";
import { customInstance } from "../mutator/customInstance";
import type { ErrorType, BodyType } from "../mutator/customInstance";

export const roleCreate = (roleCreateRequest: BodyType<RoleCreateRequest>) => {
	return customInstance<unknown>({
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
	const { mutation: mutationOptions } = options ?? {};

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

export const createRoleCreate = <
	TError = ErrorType<InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof roleCreate>>,
		TError,
		{ data: BodyType<RoleCreateRequest> },
		TContext
	>;
}): CreateMutationResult<
	Awaited<ReturnType<typeof roleCreate>>,
	TError,
	{ data: BodyType<RoleCreateRequest> },
	TContext
> => {
	const mutationOptions = getRoleCreateMutationOptions(options);

	return createMutation(mutationOptions);
};
export const roleAddUserInRole = (roleAddUserInRoleRequest: BodyType<RoleAddUserInRoleRequest>) => {
	return customInstance<unknown>({
		url: `/role/addUserInRole`,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		data: roleAddUserInRoleRequest,
	});
};

export const getRoleAddUserInRoleMutationOptions = <
	TError = ErrorType<InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof roleAddUserInRole>>,
		TError,
		{ data: BodyType<RoleAddUserInRoleRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<typeof roleAddUserInRole>>,
	TError,
	{ data: BodyType<RoleAddUserInRoleRequest> },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof roleAddUserInRole>>,
		{ data: BodyType<RoleAddUserInRoleRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return roleAddUserInRole(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type RoleAddUserInRoleMutationResult = NonNullable<
	Awaited<ReturnType<typeof roleAddUserInRole>>
>;
export type RoleAddUserInRoleMutationBody = BodyType<RoleAddUserInRoleRequest>;
export type RoleAddUserInRoleMutationError = ErrorType<InternalErrorResponse>;

export const createRoleAddUserInRole = <
	TError = ErrorType<InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof roleAddUserInRole>>,
		TError,
		{ data: BodyType<RoleAddUserInRoleRequest> },
		TContext
	>;
}): CreateMutationResult<
	Awaited<ReturnType<typeof roleAddUserInRole>>,
	TError,
	{ data: BodyType<RoleAddUserInRoleRequest> },
	TContext
> => {
	const mutationOptions = getRoleAddUserInRoleMutationOptions(options);

	return createMutation(mutationOptions);
};
export const roleGetAll = () => {
	return customInstance<EntitiesRole[]>({ url: `/role`, method: "GET" });
};

export const getRoleGetAllQueryKey = () => {
	return [`/role`] as const;
};

export const getRoleGetAllQueryOptions = <
	TData = Awaited<ReturnType<typeof roleGetAll>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(options?: {
	query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof roleGetAll>>, TError, TData>>;
}) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getRoleGetAllQueryKey();

	const queryFn: QueryFunction<Awaited<ReturnType<typeof roleGetAll>>> = () => roleGetAll();

	return { queryKey, queryFn, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<typeof roleGetAll>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type RoleGetAllQueryResult = NonNullable<Awaited<ReturnType<typeof roleGetAll>>>;
export type RoleGetAllQueryError = ErrorType<void | InternalErrorResponse>;

export function createRoleGetAll<
	TData = Awaited<ReturnType<typeof roleGetAll>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(options?: {
	query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof roleGetAll>>, TError, TData>>;
}): CreateQueryResult<TData, TError> & { queryKey: QueryKey } {
	const queryOptions = getRoleGetAllQueryOptions(options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: QueryKey;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
}
