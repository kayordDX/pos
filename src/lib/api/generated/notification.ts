// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/**
 * Generated by orval v7.4.1 🍺
 * Do not edit manually.
 * Kayord.Pos
 * OpenAPI spec version: v1
 */
import { createMutation } from "@tanstack/svelte-query";
import type {
	CreateMutationOptions,
	CreateMutationResult,
	MutationFunction,
} from "@tanstack/svelte-query";
import type {
	InternalErrorResponse,
	NotificationAddUserRequest,
	NotificationTestNewRequest,
	NotificationTestRequest,
	NotificationUserRequest,
} from "./api.schemas";
import { customInstance } from "../mutator/customInstance.svelte";
import type { ErrorType, BodyType } from "../mutator/customInstance.svelte";

export const notificationUser = (notificationUserRequest: BodyType<NotificationUserRequest>) => {
	return customInstance<boolean>({
		url: `/notification/user`,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		data: notificationUserRequest,
	});
};

export const getNotificationUserMutationOptions = <
	TData = Awaited<ReturnType<typeof notificationUser>>,
	TError = ErrorType<InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		TData,
		TError,
		{ data: BodyType<NotificationUserRequest> },
		TContext
	>;
}) => {
	const mutationKey = ["notificationUser"];
	const { mutation: mutationOptions } = options
		? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey
			? options
			: { ...options, mutation: { ...options.mutation, mutationKey } }
		: { mutation: { mutationKey } };

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof notificationUser>>,
		{ data: BodyType<NotificationUserRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return notificationUser(data);
	};

	return { mutationFn, ...mutationOptions } as CreateMutationOptions<
		TData,
		TError,
		{ data: BodyType<NotificationUserRequest> },
		TContext
	>;
};

export type NotificationUserMutationResult = NonNullable<
	Awaited<ReturnType<typeof notificationUser>>
>;
export type NotificationUserMutationBody = BodyType<NotificationUserRequest>;
export type NotificationUserMutationError = ErrorType<InternalErrorResponse>;

export const createNotificationUser = <
	TData = Awaited<ReturnType<typeof notificationUser>>,
	TError = ErrorType<InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		TData,
		TError,
		{ data: BodyType<NotificationUserRequest> },
		TContext
	>;
}): CreateMutationResult<TData, TError, { data: BodyType<NotificationUserRequest> }, TContext> => {
	const mutationOptions = getNotificationUserMutationOptions(options);

	return createMutation(mutationOptions);
};
export const notificationTestNew = (
	notificationTestNewRequest: BodyType<NotificationTestNewRequest>
) => {
	return customInstance<boolean>({
		url: `/notification/testNew`,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		data: notificationTestNewRequest,
	});
};

export const getNotificationTestNewMutationOptions = <
	TData = Awaited<ReturnType<typeof notificationTestNew>>,
	TError = ErrorType<InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		TData,
		TError,
		{ data: BodyType<NotificationTestNewRequest> },
		TContext
	>;
}) => {
	const mutationKey = ["notificationTestNew"];
	const { mutation: mutationOptions } = options
		? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey
			? options
			: { ...options, mutation: { ...options.mutation, mutationKey } }
		: { mutation: { mutationKey } };

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof notificationTestNew>>,
		{ data: BodyType<NotificationTestNewRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return notificationTestNew(data);
	};

	return { mutationFn, ...mutationOptions } as CreateMutationOptions<
		TData,
		TError,
		{ data: BodyType<NotificationTestNewRequest> },
		TContext
	>;
};

export type NotificationTestNewMutationResult = NonNullable<
	Awaited<ReturnType<typeof notificationTestNew>>
>;
export type NotificationTestNewMutationBody = BodyType<NotificationTestNewRequest>;
export type NotificationTestNewMutationError = ErrorType<InternalErrorResponse>;

export const createNotificationTestNew = <
	TData = Awaited<ReturnType<typeof notificationTestNew>>,
	TError = ErrorType<InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		TData,
		TError,
		{ data: BodyType<NotificationTestNewRequest> },
		TContext
	>;
}): CreateMutationResult<
	TData,
	TError,
	{ data: BodyType<NotificationTestNewRequest> },
	TContext
> => {
	const mutationOptions = getNotificationTestNewMutationOptions(options);

	return createMutation(mutationOptions);
};
export const notificationTest = (notificationTestRequest: BodyType<NotificationTestRequest>) => {
	return customInstance<boolean>({
		url: `/notification/test`,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		data: notificationTestRequest,
	});
};

export const getNotificationTestMutationOptions = <
	TData = Awaited<ReturnType<typeof notificationTest>>,
	TError = ErrorType<InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		TData,
		TError,
		{ data: BodyType<NotificationTestRequest> },
		TContext
	>;
}) => {
	const mutationKey = ["notificationTest"];
	const { mutation: mutationOptions } = options
		? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey
			? options
			: { ...options, mutation: { ...options.mutation, mutationKey } }
		: { mutation: { mutationKey } };

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof notificationTest>>,
		{ data: BodyType<NotificationTestRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return notificationTest(data);
	};

	return { mutationFn, ...mutationOptions } as CreateMutationOptions<
		TData,
		TError,
		{ data: BodyType<NotificationTestRequest> },
		TContext
	>;
};

export type NotificationTestMutationResult = NonNullable<
	Awaited<ReturnType<typeof notificationTest>>
>;
export type NotificationTestMutationBody = BodyType<NotificationTestRequest>;
export type NotificationTestMutationError = ErrorType<InternalErrorResponse>;

export const createNotificationTest = <
	TData = Awaited<ReturnType<typeof notificationTest>>,
	TError = ErrorType<InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		TData,
		TError,
		{ data: BodyType<NotificationTestRequest> },
		TContext
	>;
}): CreateMutationResult<TData, TError, { data: BodyType<NotificationTestRequest> }, TContext> => {
	const mutationOptions = getNotificationTestMutationOptions(options);

	return createMutation(mutationOptions);
};
export const notificationSound = () => {
	return customInstance<boolean>({ url: `/notification/sound`, method: "POST" });
};

export const getNotificationSoundMutationOptions = <
	TData = Awaited<ReturnType<typeof notificationSound>>,
	TError = ErrorType<InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<TData, TError, void, TContext>;
}) => {
	const mutationKey = ["notificationSound"];
	const { mutation: mutationOptions } = options
		? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey
			? options
			: { ...options, mutation: { ...options.mutation, mutationKey } }
		: { mutation: { mutationKey } };

	const mutationFn: MutationFunction<Awaited<ReturnType<typeof notificationSound>>, void> = () => {
		return notificationSound();
	};

	return { mutationFn, ...mutationOptions } as CreateMutationOptions<TData, TError, void, TContext>;
};

export type NotificationSoundMutationResult = NonNullable<
	Awaited<ReturnType<typeof notificationSound>>
>;

export type NotificationSoundMutationError = ErrorType<InternalErrorResponse>;

export const createNotificationSound = <
	TData = Awaited<ReturnType<typeof notificationSound>>,
	TError = ErrorType<InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<TData, TError, void, TContext>;
}): CreateMutationResult<TData, TError, void, TContext> => {
	const mutationOptions = getNotificationSoundMutationOptions(options);

	return createMutation(mutationOptions);
};
export const notificationAddUser = (
	notificationAddUserRequest: BodyType<NotificationAddUserRequest>
) => {
	return customInstance<boolean>({
		url: `/notification/addUser`,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		data: notificationAddUserRequest,
	});
};

export const getNotificationAddUserMutationOptions = <
	TData = Awaited<ReturnType<typeof notificationAddUser>>,
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		TData,
		TError,
		{ data: BodyType<NotificationAddUserRequest> },
		TContext
	>;
}) => {
	const mutationKey = ["notificationAddUser"];
	const { mutation: mutationOptions } = options
		? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey
			? options
			: { ...options, mutation: { ...options.mutation, mutationKey } }
		: { mutation: { mutationKey } };

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof notificationAddUser>>,
		{ data: BodyType<NotificationAddUserRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return notificationAddUser(data);
	};

	return { mutationFn, ...mutationOptions } as CreateMutationOptions<
		TData,
		TError,
		{ data: BodyType<NotificationAddUserRequest> },
		TContext
	>;
};

export type NotificationAddUserMutationResult = NonNullable<
	Awaited<ReturnType<typeof notificationAddUser>>
>;
export type NotificationAddUserMutationBody = BodyType<NotificationAddUserRequest>;
export type NotificationAddUserMutationError = ErrorType<void | InternalErrorResponse>;

export const createNotificationAddUser = <
	TData = Awaited<ReturnType<typeof notificationAddUser>>,
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		TData,
		TError,
		{ data: BodyType<NotificationAddUserRequest> },
		TContext
	>;
}): CreateMutationResult<
	TData,
	TError,
	{ data: BodyType<NotificationAddUserRequest> },
	TContext
> => {
	const mutationOptions = getNotificationAddUserMutationOptions(options);

	return createMutation(mutationOptions);
};
