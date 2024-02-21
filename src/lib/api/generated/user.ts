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
	EntitiesUserOutlet,
	InternalErrorResponse,
	UserAssignOutletRequest,
	UserGetNotificationsUserNotificationDTO,
	UserGetRolesParams,
	UserGetStatusResponse,
	UserValidateRequest,
	UserValidateResponse,
} from "./api.schemas";
import { useCustomClient } from "../mutator/useCustomClient";
import type { ErrorType, BodyType } from "../mutator/useCustomClient";

export const useUserValidateHook = () => {
	const userValidate = useCustomClient<UserValidateResponse>();

	return (userValidateRequest: BodyType<UserValidateRequest>) => {
		return userValidate({
			url: `/user/validate`,
			method: "POST",
			headers: { "Content-Type": "application/json" },
			data: userValidateRequest,
		});
	};
};

export const useUserValidateMutationOptions = <
	TError = ErrorType<InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<ReturnType<typeof useUserValidateHook>>>,
		TError,
		{ data: BodyType<UserValidateRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<ReturnType<typeof useUserValidateHook>>>,
	TError,
	{ data: BodyType<UserValidateRequest> },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const userValidate = useUserValidateHook();

	const mutationFn: MutationFunction<
		Awaited<ReturnType<ReturnType<typeof useUserValidateHook>>>,
		{ data: BodyType<UserValidateRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return userValidate(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type UserValidateMutationResult = NonNullable<
	Awaited<ReturnType<ReturnType<typeof useUserValidateHook>>>
>;
export type UserValidateMutationBody = BodyType<UserValidateRequest>;
export type UserValidateMutationError = ErrorType<InternalErrorResponse>;

export const createUserValidate = <
	TError = ErrorType<InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<ReturnType<typeof useUserValidateHook>>>,
		TError,
		{ data: BodyType<UserValidateRequest> },
		TContext
	>;
}) => {
	const mutationOptions = useUserValidateMutationOptions(options);

	return createMutation(mutationOptions);
};
export const useUserGetStatusHook = () => {
	const userGetStatus = useCustomClient<UserGetStatusResponse>();

	return () => {
		return userGetStatus({ url: `/user/getStatus`, method: "GET" });
	};
};

export const getUserGetStatusQueryKey = () => {
	return [`/user/getStatus`] as const;
};

export const useUserGetStatusQueryOptions = <
	TData = Awaited<ReturnType<ReturnType<typeof useUserGetStatusHook>>>,
	TError = ErrorType<InternalErrorResponse>,
>(options?: {
	query?: Partial<
		CreateQueryOptions<Awaited<ReturnType<ReturnType<typeof useUserGetStatusHook>>>, TError, TData>
	>;
}) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getUserGetStatusQueryKey();

	const userGetStatus = useUserGetStatusHook();

	const queryFn: QueryFunction<Awaited<ReturnType<ReturnType<typeof useUserGetStatusHook>>>> = () =>
		userGetStatus();

	return { queryKey, queryFn, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<ReturnType<typeof useUserGetStatusHook>>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type UserGetStatusQueryResult = NonNullable<
	Awaited<ReturnType<ReturnType<typeof useUserGetStatusHook>>>
>;
export type UserGetStatusQueryError = ErrorType<InternalErrorResponse>;

export const createUserGetStatus = <
	TData = Awaited<ReturnType<ReturnType<typeof useUserGetStatusHook>>>,
	TError = ErrorType<InternalErrorResponse>,
>(options?: {
	query?: Partial<
		CreateQueryOptions<Awaited<ReturnType<ReturnType<typeof useUserGetStatusHook>>>, TError, TData>
	>;
}): CreateQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = useUserGetStatusQueryOptions(options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: QueryKey;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
};

export const useUserGetRolesHook = () => {
	const userGetRoles = useCustomClient<string[]>();

	return (params: UserGetRolesParams) => {
		return userGetRoles({ url: `/user/getRoles`, method: "GET", params });
	};
};

export const getUserGetRolesQueryKey = (params: UserGetRolesParams) => {
	return [`/user/getRoles`, ...(params ? [params] : [])] as const;
};

export const useUserGetRolesQueryOptions = <
	TData = Awaited<ReturnType<ReturnType<typeof useUserGetRolesHook>>>,
	TError = ErrorType<InternalErrorResponse>,
>(
	params: UserGetRolesParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<ReturnType<typeof useUserGetRolesHook>>>, TError, TData>
		>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getUserGetRolesQueryKey(params);

	const userGetRoles = useUserGetRolesHook();

	const queryFn: QueryFunction<Awaited<ReturnType<ReturnType<typeof useUserGetRolesHook>>>> = () =>
		userGetRoles(params);

	return { queryKey, queryFn, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<ReturnType<typeof useUserGetRolesHook>>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type UserGetRolesQueryResult = NonNullable<
	Awaited<ReturnType<ReturnType<typeof useUserGetRolesHook>>>
>;
export type UserGetRolesQueryError = ErrorType<InternalErrorResponse>;

export const createUserGetRoles = <
	TData = Awaited<ReturnType<ReturnType<typeof useUserGetRolesHook>>>,
	TError = ErrorType<InternalErrorResponse>,
>(
	params: UserGetRolesParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<ReturnType<typeof useUserGetRolesHook>>>, TError, TData>
		>;
	}
): CreateQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = useUserGetRolesQueryOptions(params, options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: QueryKey;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
};

export const useUserGetNotificationsHook = () => {
	const userGetNotifications = useCustomClient<UserGetNotificationsUserNotificationDTO[]>();

	return () => {
		return userGetNotifications({ url: `/user/getNotifications`, method: "GET" });
	};
};

export const getUserGetNotificationsQueryKey = () => {
	return [`/user/getNotifications`] as const;
};

export const useUserGetNotificationsQueryOptions = <
	TData = Awaited<ReturnType<ReturnType<typeof useUserGetNotificationsHook>>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(options?: {
	query?: Partial<
		CreateQueryOptions<
			Awaited<ReturnType<ReturnType<typeof useUserGetNotificationsHook>>>,
			TError,
			TData
		>
	>;
}) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getUserGetNotificationsQueryKey();

	const userGetNotifications = useUserGetNotificationsHook();

	const queryFn: QueryFunction<
		Awaited<ReturnType<ReturnType<typeof useUserGetNotificationsHook>>>
	> = () => userGetNotifications();

	return { queryKey, queryFn, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<ReturnType<typeof useUserGetNotificationsHook>>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type UserGetNotificationsQueryResult = NonNullable<
	Awaited<ReturnType<ReturnType<typeof useUserGetNotificationsHook>>>
>;
export type UserGetNotificationsQueryError = ErrorType<void | InternalErrorResponse>;

export const createUserGetNotifications = <
	TData = Awaited<ReturnType<ReturnType<typeof useUserGetNotificationsHook>>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(options?: {
	query?: Partial<
		CreateQueryOptions<
			Awaited<ReturnType<ReturnType<typeof useUserGetNotificationsHook>>>,
			TError,
			TData
		>
	>;
}): CreateQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = useUserGetNotificationsQueryOptions(options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: QueryKey;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
};

export const useUserAssignOutletHook = () => {
	const userAssignOutlet = useCustomClient<EntitiesUserOutlet>();

	return (userAssignOutletRequest: BodyType<UserAssignOutletRequest>) => {
		return userAssignOutlet({
			url: `/user/assignOutlet`,
			method: "POST",
			headers: { "Content-Type": "application/json" },
			data: userAssignOutletRequest,
		});
	};
};

export const useUserAssignOutletMutationOptions = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<ReturnType<typeof useUserAssignOutletHook>>>,
		TError,
		{ data: BodyType<UserAssignOutletRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<ReturnType<typeof useUserAssignOutletHook>>>,
	TError,
	{ data: BodyType<UserAssignOutletRequest> },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const userAssignOutlet = useUserAssignOutletHook();

	const mutationFn: MutationFunction<
		Awaited<ReturnType<ReturnType<typeof useUserAssignOutletHook>>>,
		{ data: BodyType<UserAssignOutletRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return userAssignOutlet(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type UserAssignOutletMutationResult = NonNullable<
	Awaited<ReturnType<ReturnType<typeof useUserAssignOutletHook>>>
>;
export type UserAssignOutletMutationBody = BodyType<UserAssignOutletRequest>;
export type UserAssignOutletMutationError = ErrorType<void | InternalErrorResponse>;

export const createUserAssignOutlet = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<ReturnType<typeof useUserAssignOutletHook>>>,
		TError,
		{ data: BodyType<UserAssignOutletRequest> },
		TContext
	>;
}) => {
	const mutationOptions = useUserAssignOutletMutationOptions(options);

	return createMutation(mutationOptions);
};
