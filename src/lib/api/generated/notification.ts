// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/**
 * Generated by orval v7.1.1 🍺
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
import { customInstance } from "../mutator/customInstance";
import type { ErrorType, BodyType } from "../mutator/customInstance";

export const notificationUser = (notificationUserRequest: BodyType<NotificationUserRequest>) => {
	return customInstance<boolean>({
		url: `/notification/user`,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		data: notificationUserRequest,
	});
};

export const getNotificationUserMutationOptions = <
	TError = ErrorType<InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof notificationUser>>,
		TError,
		{ data: BodyType<NotificationUserRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<typeof notificationUser>>,
	TError,
	{ data: BodyType<NotificationUserRequest> },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof notificationUser>>,
		{ data: BodyType<NotificationUserRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return notificationUser(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type NotificationUserMutationResult = NonNullable<
	Awaited<ReturnType<typeof notificationUser>>
>;
export type NotificationUserMutationBody = BodyType<NotificationUserRequest>;
export type NotificationUserMutationError = ErrorType<InternalErrorResponse>;

export const createNotificationUser = <
	TError = ErrorType<InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof notificationUser>>,
		TError,
		{ data: BodyType<NotificationUserRequest> },
		TContext
	>;
}): CreateMutationResult<
	Awaited<ReturnType<typeof notificationUser>>,
	TError,
	{ data: BodyType<NotificationUserRequest> },
	TContext
> => {
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
	TError = ErrorType<InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof notificationTestNew>>,
		TError,
		{ data: BodyType<NotificationTestNewRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<typeof notificationTestNew>>,
	TError,
	{ data: BodyType<NotificationTestNewRequest> },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof notificationTestNew>>,
		{ data: BodyType<NotificationTestNewRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return notificationTestNew(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type NotificationTestNewMutationResult = NonNullable<
	Awaited<ReturnType<typeof notificationTestNew>>
>;
export type NotificationTestNewMutationBody = BodyType<NotificationTestNewRequest>;
export type NotificationTestNewMutationError = ErrorType<InternalErrorResponse>;

export const createNotificationTestNew = <
	TError = ErrorType<InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof notificationTestNew>>,
		TError,
		{ data: BodyType<NotificationTestNewRequest> },
		TContext
	>;
}): CreateMutationResult<
	Awaited<ReturnType<typeof notificationTestNew>>,
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
	TError = ErrorType<InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof notificationTest>>,
		TError,
		{ data: BodyType<NotificationTestRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<typeof notificationTest>>,
	TError,
	{ data: BodyType<NotificationTestRequest> },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof notificationTest>>,
		{ data: BodyType<NotificationTestRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return notificationTest(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type NotificationTestMutationResult = NonNullable<
	Awaited<ReturnType<typeof notificationTest>>
>;
export type NotificationTestMutationBody = BodyType<NotificationTestRequest>;
export type NotificationTestMutationError = ErrorType<InternalErrorResponse>;

export const createNotificationTest = <
	TError = ErrorType<InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof notificationTest>>,
		TError,
		{ data: BodyType<NotificationTestRequest> },
		TContext
	>;
}): CreateMutationResult<
	Awaited<ReturnType<typeof notificationTest>>,
	TError,
	{ data: BodyType<NotificationTestRequest> },
	TContext
> => {
	const mutationOptions = getNotificationTestMutationOptions(options);

	return createMutation(mutationOptions);
};
export const notificationSound = () => {
	return customInstance<boolean>({ url: `/notification/sound`, method: "POST" });
};

export const getNotificationSoundMutationOptions = <
	TError = ErrorType<InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof notificationSound>>,
		TError,
		void,
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<typeof notificationSound>>,
	TError,
	void,
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const mutationFn: MutationFunction<Awaited<ReturnType<typeof notificationSound>>, void> = () => {
		return notificationSound();
	};

	return { mutationFn, ...mutationOptions };
};

export type NotificationSoundMutationResult = NonNullable<
	Awaited<ReturnType<typeof notificationSound>>
>;

export type NotificationSoundMutationError = ErrorType<InternalErrorResponse>;

export const createNotificationSound = <
	TError = ErrorType<InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof notificationSound>>,
		TError,
		void,
		TContext
	>;
}): CreateMutationResult<Awaited<ReturnType<typeof notificationSound>>, TError, void, TContext> => {
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
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof notificationAddUser>>,
		TError,
		{ data: BodyType<NotificationAddUserRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<typeof notificationAddUser>>,
	TError,
	{ data: BodyType<NotificationAddUserRequest> },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof notificationAddUser>>,
		{ data: BodyType<NotificationAddUserRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return notificationAddUser(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type NotificationAddUserMutationResult = NonNullable<
	Awaited<ReturnType<typeof notificationAddUser>>
>;
export type NotificationAddUserMutationBody = BodyType<NotificationAddUserRequest>;
export type NotificationAddUserMutationError = ErrorType<void | InternalErrorResponse>;

export const createNotificationAddUser = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof notificationAddUser>>,
		TError,
		{ data: BodyType<NotificationAddUserRequest> },
		TContext
	>;
}): CreateMutationResult<
	Awaited<ReturnType<typeof notificationAddUser>>,
	TError,
	{ data: BodyType<NotificationAddUserRequest> },
	TContext
> => {
	const mutationOptions = getNotificationAddUserMutationOptions(options);

	return createMutation(mutationOptions);
};
