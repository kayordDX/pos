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
	CommonModelsPaginatedListOfUserResponse,
	EntitiesUserOutlet,
	ErrorResponse,
	InternalErrorResponse,
	UserAddUserOutletRoleRequest,
	UserAssignOutletRequest,
	UserGetRolesParams,
	UserGetStatusResponse,
	UserUnassignedUsersParams,
	UserUsersParams,
	UserValidateRequest,
	UserValidateResponse,
} from "./api.schemas";
import { customInstance } from "../mutator/customInstance.svelte";
import type { ErrorType, BodyType } from "../mutator/customInstance.svelte";

export const userValidate = (userValidateRequest: BodyType<UserValidateRequest>) => {
	return customInstance<UserValidateResponse>({
		url: `/user/validate`,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		data: userValidateRequest,
	});
};

export const getUserValidateMutationOptions = <
	TError = ErrorType<InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof userValidate>>,
		TError,
		{ data: BodyType<UserValidateRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<typeof userValidate>>,
	TError,
	{ data: BodyType<UserValidateRequest> },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof userValidate>>,
		{ data: BodyType<UserValidateRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return userValidate(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type UserValidateMutationResult = NonNullable<Awaited<ReturnType<typeof userValidate>>>;
export type UserValidateMutationBody = BodyType<UserValidateRequest>;
export type UserValidateMutationError = ErrorType<InternalErrorResponse>;

export const createUserValidate = <
	TError = ErrorType<InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof userValidate>>,
		TError,
		{ data: BodyType<UserValidateRequest> },
		TContext
	>;
}): CreateMutationResult<
	Awaited<ReturnType<typeof userValidate>>,
	TError,
	{ data: BodyType<UserValidateRequest> },
	TContext
> => {
	const mutationOptions = getUserValidateMutationOptions(options);

	return createMutation(mutationOptions);
};
export const userUsers = (params?: UserUsersParams) => {
	return customInstance<CommonModelsPaginatedListOfUserResponse>({
		url: `/user/list`,
		method: "GET",
		params,
	});
};

export const getUserUsersQueryKey = (params?: UserUsersParams) => {
	return [`/user/list`, ...(params ? [params] : [])] as const;
};

export const getUserUsersQueryOptions = <
	TData = Awaited<ReturnType<typeof userUsers>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	params?: UserUsersParams,
	options?: {
		query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof userUsers>>, TError, TData>>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getUserUsersQueryKey(params);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof userUsers>>> = () => userUsers(params);

	return { queryKey, queryFn, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<typeof userUsers>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type UserUsersQueryResult = NonNullable<Awaited<ReturnType<typeof userUsers>>>;
export type UserUsersQueryError = ErrorType<void | InternalErrorResponse>;

export function createUserUsers<
	TData = Awaited<ReturnType<typeof userUsers>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	params?: UserUsersParams,
	options?: {
		query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof userUsers>>, TError, TData>>;
	}
): CreateQueryResult<TData, TError> & { queryKey: QueryKey } {
	const queryOptions = getUserUsersQueryOptions(params, options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: QueryKey;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
}

export const userUnassignedUsers = (params?: UserUnassignedUsersParams) => {
	return customInstance<CommonModelsPaginatedListOfUserResponse>({
		url: `/user/unassigned`,
		method: "GET",
		params,
	});
};

export const getUserUnassignedUsersQueryKey = (params?: UserUnassignedUsersParams) => {
	return [`/user/unassigned`, ...(params ? [params] : [])] as const;
};

export const getUserUnassignedUsersQueryOptions = <
	TData = Awaited<ReturnType<typeof userUnassignedUsers>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	params?: UserUnassignedUsersParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<typeof userUnassignedUsers>>, TError, TData>
		>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getUserUnassignedUsersQueryKey(params);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof userUnassignedUsers>>> = () =>
		userUnassignedUsers(params);

	return { queryKey, queryFn, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<typeof userUnassignedUsers>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type UserUnassignedUsersQueryResult = NonNullable<
	Awaited<ReturnType<typeof userUnassignedUsers>>
>;
export type UserUnassignedUsersQueryError = ErrorType<void | InternalErrorResponse>;

export function createUserUnassignedUsers<
	TData = Awaited<ReturnType<typeof userUnassignedUsers>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	params?: UserUnassignedUsersParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<typeof userUnassignedUsers>>, TError, TData>
		>;
	}
): CreateQueryResult<TData, TError> & { queryKey: QueryKey } {
	const queryOptions = getUserUnassignedUsersQueryOptions(params, options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: QueryKey;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
}

export const userRemoveUserOutletRole = (userId: string, role: string) => {
	return customInstance<unknown>({ url: `/user/role/${userId}/${role}`, method: "DELETE" });
};

export const getUserRemoveUserOutletRoleMutationOptions = <
	TError = ErrorType<ErrorResponse | void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof userRemoveUserOutletRole>>,
		TError,
		{ userId: string; role: string },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<typeof userRemoveUserOutletRole>>,
	TError,
	{ userId: string; role: string },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof userRemoveUserOutletRole>>,
		{ userId: string; role: string }
	> = (props) => {
		const { userId, role } = props ?? {};

		return userRemoveUserOutletRole(userId, role);
	};

	return { mutationFn, ...mutationOptions };
};

export type UserRemoveUserOutletRoleMutationResult = NonNullable<
	Awaited<ReturnType<typeof userRemoveUserOutletRole>>
>;

export type UserRemoveUserOutletRoleMutationError = ErrorType<
	ErrorResponse | void | InternalErrorResponse
>;

export const createUserRemoveUserOutletRole = <
	TError = ErrorType<ErrorResponse | void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof userRemoveUserOutletRole>>,
		TError,
		{ userId: string; role: string },
		TContext
	>;
}): CreateMutationResult<
	Awaited<ReturnType<typeof userRemoveUserOutletRole>>,
	TError,
	{ userId: string; role: string },
	TContext
> => {
	const mutationOptions = getUserRemoveUserOutletRoleMutationOptions(options);

	return createMutation(mutationOptions);
};
export const userRemoveUserOutlet = (userId: string) => {
	return customInstance<unknown>({ url: `/user/outlet/${userId}`, method: "DELETE" });
};

export const getUserRemoveUserOutletMutationOptions = <
	TError = ErrorType<ErrorResponse | void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof userRemoveUserOutlet>>,
		TError,
		{ userId: string },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<typeof userRemoveUserOutlet>>,
	TError,
	{ userId: string },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof userRemoveUserOutlet>>,
		{ userId: string }
	> = (props) => {
		const { userId } = props ?? {};

		return userRemoveUserOutlet(userId);
	};

	return { mutationFn, ...mutationOptions };
};

export type UserRemoveUserOutletMutationResult = NonNullable<
	Awaited<ReturnType<typeof userRemoveUserOutlet>>
>;

export type UserRemoveUserOutletMutationError = ErrorType<
	ErrorResponse | void | InternalErrorResponse
>;

export const createUserRemoveUserOutlet = <
	TError = ErrorType<ErrorResponse | void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof userRemoveUserOutlet>>,
		TError,
		{ userId: string },
		TContext
	>;
}): CreateMutationResult<
	Awaited<ReturnType<typeof userRemoveUserOutlet>>,
	TError,
	{ userId: string },
	TContext
> => {
	const mutationOptions = getUserRemoveUserOutletMutationOptions(options);

	return createMutation(mutationOptions);
};
export const userGetStatus = () => {
	return customInstance<UserGetStatusResponse>({ url: `/user/getStatus`, method: "GET" });
};

export const getUserGetStatusQueryKey = () => {
	return [`/user/getStatus`] as const;
};

export const getUserGetStatusQueryOptions = <
	TData = Awaited<ReturnType<typeof userGetStatus>>,
	TError = ErrorType<InternalErrorResponse>,
>(options?: {
	query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof userGetStatus>>, TError, TData>>;
}) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getUserGetStatusQueryKey();

	const queryFn: QueryFunction<Awaited<ReturnType<typeof userGetStatus>>> = () => userGetStatus();

	return { queryKey, queryFn, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<typeof userGetStatus>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type UserGetStatusQueryResult = NonNullable<Awaited<ReturnType<typeof userGetStatus>>>;
export type UserGetStatusQueryError = ErrorType<InternalErrorResponse>;

export function createUserGetStatus<
	TData = Awaited<ReturnType<typeof userGetStatus>>,
	TError = ErrorType<InternalErrorResponse>,
>(options?: {
	query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof userGetStatus>>, TError, TData>>;
}): CreateQueryResult<TData, TError> & { queryKey: QueryKey } {
	const queryOptions = getUserGetStatusQueryOptions(options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: QueryKey;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
}

export const userGetRoles = (params: UserGetRolesParams) => {
	return customInstance<string[]>({ url: `/user/getRoles`, method: "GET", params });
};

export const getUserGetRolesQueryKey = (params: UserGetRolesParams) => {
	return [`/user/getRoles`, ...(params ? [params] : [])] as const;
};

export const getUserGetRolesQueryOptions = <
	TData = Awaited<ReturnType<typeof userGetRoles>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	params: UserGetRolesParams,
	options?: {
		query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof userGetRoles>>, TError, TData>>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getUserGetRolesQueryKey(params);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof userGetRoles>>> = () =>
		userGetRoles(params);

	return { queryKey, queryFn, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<typeof userGetRoles>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type UserGetRolesQueryResult = NonNullable<Awaited<ReturnType<typeof userGetRoles>>>;
export type UserGetRolesQueryError = ErrorType<void | InternalErrorResponse>;

export function createUserGetRoles<
	TData = Awaited<ReturnType<typeof userGetRoles>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	params: UserGetRolesParams,
	options?: {
		query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof userGetRoles>>, TError, TData>>;
	}
): CreateQueryResult<TData, TError> & { queryKey: QueryKey } {
	const queryOptions = getUserGetRolesQueryOptions(params, options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: QueryKey;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
}

export const userAssignOutlet = (userAssignOutletRequest: BodyType<UserAssignOutletRequest>) => {
	return customInstance<EntitiesUserOutlet>({
		url: `/user/assignOutlet`,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		data: userAssignOutletRequest,
	});
};

export const getUserAssignOutletMutationOptions = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof userAssignOutlet>>,
		TError,
		{ data: BodyType<UserAssignOutletRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<typeof userAssignOutlet>>,
	TError,
	{ data: BodyType<UserAssignOutletRequest> },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof userAssignOutlet>>,
		{ data: BodyType<UserAssignOutletRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return userAssignOutlet(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type UserAssignOutletMutationResult = NonNullable<
	Awaited<ReturnType<typeof userAssignOutlet>>
>;
export type UserAssignOutletMutationBody = BodyType<UserAssignOutletRequest>;
export type UserAssignOutletMutationError = ErrorType<void | InternalErrorResponse>;

export const createUserAssignOutlet = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof userAssignOutlet>>,
		TError,
		{ data: BodyType<UserAssignOutletRequest> },
		TContext
	>;
}): CreateMutationResult<
	Awaited<ReturnType<typeof userAssignOutlet>>,
	TError,
	{ data: BodyType<UserAssignOutletRequest> },
	TContext
> => {
	const mutationOptions = getUserAssignOutletMutationOptions(options);

	return createMutation(mutationOptions);
};
export const userAddUserOutletRole = (
	userAddUserOutletRoleRequest: BodyType<UserAddUserOutletRoleRequest>
) => {
	return customInstance<unknown>({
		url: `/user/role`,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		data: userAddUserOutletRoleRequest,
	});
};

export const getUserAddUserOutletRoleMutationOptions = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof userAddUserOutletRole>>,
		TError,
		{ data: BodyType<UserAddUserOutletRoleRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<typeof userAddUserOutletRole>>,
	TError,
	{ data: BodyType<UserAddUserOutletRoleRequest> },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof userAddUserOutletRole>>,
		{ data: BodyType<UserAddUserOutletRoleRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return userAddUserOutletRole(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type UserAddUserOutletRoleMutationResult = NonNullable<
	Awaited<ReturnType<typeof userAddUserOutletRole>>
>;
export type UserAddUserOutletRoleMutationBody = BodyType<UserAddUserOutletRoleRequest>;
export type UserAddUserOutletRoleMutationError = ErrorType<void | InternalErrorResponse>;

export const createUserAddUserOutletRole = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof userAddUserOutletRole>>,
		TError,
		{ data: BodyType<UserAddUserOutletRoleRequest> },
		TContext
	>;
}): CreateMutationResult<
	Awaited<ReturnType<typeof userAddUserOutletRole>>,
	TError,
	{ data: BodyType<UserAddUserOutletRoleRequest> },
	TContext
> => {
	const mutationOptions = getUserAddUserOutletRoleMutationOptions(options);

	return createMutation(mutationOptions);
};
