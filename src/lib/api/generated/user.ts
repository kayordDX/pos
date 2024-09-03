// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/**
 * Generated by orval v7.1.0 🍺
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
	EntitiesUserOutlet,
	InternalErrorResponse,
	UserAssignOutletRequest,
	UserGetRolesParams,
	UserGetStatusResponse,
	UserValidateRequest,
	UserValidateResponse,
} from "./api.schemas";
import { customInstance } from "../mutator/customInstance";
import type { ErrorType, BodyType } from "../mutator/customInstance";

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
	TError = ErrorType<InternalErrorResponse>,
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
export type UserGetRolesQueryError = ErrorType<InternalErrorResponse>;

export function createUserGetRoles<
	TData = Awaited<ReturnType<typeof userGetRoles>>,
	TError = ErrorType<InternalErrorResponse>,
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
