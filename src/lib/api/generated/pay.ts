// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/**
 * Generated by orval v7.2.0 🍺
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
	CommonWrapperResultOfResponse,
	CommonWrapperResultOfStatusResultDto,
	EntitiesHaloConfig,
	EntitiesPayment,
	ErrorResponse,
	InternalErrorResponse,
	PayCheckRequest,
	PayCheckResponse,
	PayGetLinkParams,
	PayManualPaymentRequest,
	PayPayConfigCreateRequest,
	PayPayConfigSetActiveRequest,
	PayPayConfigTestConfigRequest,
} from "./api.schemas";
import { customInstance } from "../mutator/customInstance.svelte";
import type { ErrorType, BodyType } from "../mutator/customInstance.svelte";

export const payStatus = (reference: string) => {
	return customInstance<CommonWrapperResultOfStatusResultDto>({
		url: `/pay/status/${reference}`,
		method: "GET",
	});
};

export const getPayStatusQueryKey = (reference: string) => {
	return [`/pay/status/${reference}`] as const;
};

export const getPayStatusQueryOptions = <
	TData = Awaited<ReturnType<typeof payStatus>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	reference: string,
	options?: {
		query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof payStatus>>, TError, TData>>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getPayStatusQueryKey(reference);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof payStatus>>> = () => payStatus(reference);

	return { queryKey, queryFn, enabled: !!reference, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<typeof payStatus>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type PayStatusQueryResult = NonNullable<Awaited<ReturnType<typeof payStatus>>>;
export type PayStatusQueryError = ErrorType<void | InternalErrorResponse>;

export function createPayStatus<
	TData = Awaited<ReturnType<typeof payStatus>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	reference: string,
	options?: {
		query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof payStatus>>, TError, TData>>;
	}
): CreateQueryResult<TData, TError> & { queryKey: QueryKey } {
	const queryOptions = getPayStatusQueryOptions(reference, options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: QueryKey;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
}

export const payPayConfigTestConfig = (
	payPayConfigTestConfigRequest: BodyType<PayPayConfigTestConfigRequest>
) => {
	return customInstance<boolean>({
		url: `/pay/config/test`,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		data: payPayConfigTestConfigRequest,
	});
};

export const getPayPayConfigTestConfigMutationOptions = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof payPayConfigTestConfig>>,
		TError,
		{ data: BodyType<PayPayConfigTestConfigRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<typeof payPayConfigTestConfig>>,
	TError,
	{ data: BodyType<PayPayConfigTestConfigRequest> },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof payPayConfigTestConfig>>,
		{ data: BodyType<PayPayConfigTestConfigRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return payPayConfigTestConfig(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type PayPayConfigTestConfigMutationResult = NonNullable<
	Awaited<ReturnType<typeof payPayConfigTestConfig>>
>;
export type PayPayConfigTestConfigMutationBody = BodyType<PayPayConfigTestConfigRequest>;
export type PayPayConfigTestConfigMutationError = ErrorType<void | InternalErrorResponse>;

export const createPayPayConfigTestConfig = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof payPayConfigTestConfig>>,
		TError,
		{ data: BodyType<PayPayConfigTestConfigRequest> },
		TContext
	>;
}): CreateMutationResult<
	Awaited<ReturnType<typeof payPayConfigTestConfig>>,
	TError,
	{ data: BodyType<PayPayConfigTestConfigRequest> },
	TContext
> => {
	const mutationOptions = getPayPayConfigTestConfigMutationOptions(options);

	return createMutation(mutationOptions);
};
export const payPayConfigSetActive = (
	payPayConfigSetActiveRequest: BodyType<PayPayConfigSetActiveRequest>
) => {
	return customInstance<unknown>({
		url: `/pay/config/activate`,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		data: payPayConfigSetActiveRequest,
	});
};

export const getPayPayConfigSetActiveMutationOptions = <
	TError = ErrorType<ErrorResponse | void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof payPayConfigSetActive>>,
		TError,
		{ data: BodyType<PayPayConfigSetActiveRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<typeof payPayConfigSetActive>>,
	TError,
	{ data: BodyType<PayPayConfigSetActiveRequest> },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof payPayConfigSetActive>>,
		{ data: BodyType<PayPayConfigSetActiveRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return payPayConfigSetActive(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type PayPayConfigSetActiveMutationResult = NonNullable<
	Awaited<ReturnType<typeof payPayConfigSetActive>>
>;
export type PayPayConfigSetActiveMutationBody = BodyType<PayPayConfigSetActiveRequest>;
export type PayPayConfigSetActiveMutationError = ErrorType<
	ErrorResponse | void | InternalErrorResponse
>;

export const createPayPayConfigSetActive = <
	TError = ErrorType<ErrorResponse | void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof payPayConfigSetActive>>,
		TError,
		{ data: BodyType<PayPayConfigSetActiveRequest> },
		TContext
	>;
}): CreateMutationResult<
	Awaited<ReturnType<typeof payPayConfigSetActive>>,
	TError,
	{ data: BodyType<PayPayConfigSetActiveRequest> },
	TContext
> => {
	const mutationOptions = getPayPayConfigSetActiveMutationOptions(options);

	return createMutation(mutationOptions);
};
export const payPayConfigGet = (outletId: number) => {
	return customInstance<EntitiesHaloConfig[]>({ url: `/pay/config/${outletId}`, method: "GET" });
};

export const getPayPayConfigGetQueryKey = (outletId: number) => {
	return [`/pay/config/${outletId}`] as const;
};

export const getPayPayConfigGetQueryOptions = <
	TData = Awaited<ReturnType<typeof payPayConfigGet>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	outletId: number,
	options?: {
		query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof payPayConfigGet>>, TError, TData>>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getPayPayConfigGetQueryKey(outletId);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof payPayConfigGet>>> = () =>
		payPayConfigGet(outletId);

	return { queryKey, queryFn, enabled: !!outletId, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<typeof payPayConfigGet>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type PayPayConfigGetQueryResult = NonNullable<Awaited<ReturnType<typeof payPayConfigGet>>>;
export type PayPayConfigGetQueryError = ErrorType<void | InternalErrorResponse>;

export function createPayPayConfigGet<
	TData = Awaited<ReturnType<typeof payPayConfigGet>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	outletId: number,
	options?: {
		query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof payPayConfigGet>>, TError, TData>>;
	}
): CreateQueryResult<TData, TError> & { queryKey: QueryKey } {
	const queryOptions = getPayPayConfigGetQueryOptions(outletId, options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: QueryKey;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
}

export const payPayConfigDelete = (id: number) => {
	return customInstance<unknown>({ url: `/pay/config/${id}`, method: "DELETE" });
};

export const getPayPayConfigDeleteMutationOptions = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof payPayConfigDelete>>,
		TError,
		{ id: number },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<typeof payPayConfigDelete>>,
	TError,
	{ id: number },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof payPayConfigDelete>>,
		{ id: number }
	> = (props) => {
		const { id } = props ?? {};

		return payPayConfigDelete(id);
	};

	return { mutationFn, ...mutationOptions };
};

export type PayPayConfigDeleteMutationResult = NonNullable<
	Awaited<ReturnType<typeof payPayConfigDelete>>
>;

export type PayPayConfigDeleteMutationError = ErrorType<void | InternalErrorResponse>;

export const createPayPayConfigDelete = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof payPayConfigDelete>>,
		TError,
		{ id: number },
		TContext
	>;
}): CreateMutationResult<
	Awaited<ReturnType<typeof payPayConfigDelete>>,
	TError,
	{ id: number },
	TContext
> => {
	const mutationOptions = getPayPayConfigDeleteMutationOptions(options);

	return createMutation(mutationOptions);
};
export const payPayConfigCreate = (
	payPayConfigCreateRequest: BodyType<PayPayConfigCreateRequest>
) => {
	return customInstance<EntitiesHaloConfig>({
		url: `/pay/config`,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		data: payPayConfigCreateRequest,
	});
};

export const getPayPayConfigCreateMutationOptions = <
	TError = ErrorType<ErrorResponse | void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof payPayConfigCreate>>,
		TError,
		{ data: BodyType<PayPayConfigCreateRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<typeof payPayConfigCreate>>,
	TError,
	{ data: BodyType<PayPayConfigCreateRequest> },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof payPayConfigCreate>>,
		{ data: BodyType<PayPayConfigCreateRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return payPayConfigCreate(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type PayPayConfigCreateMutationResult = NonNullable<
	Awaited<ReturnType<typeof payPayConfigCreate>>
>;
export type PayPayConfigCreateMutationBody = BodyType<PayPayConfigCreateRequest>;
export type PayPayConfigCreateMutationError = ErrorType<
	ErrorResponse | void | InternalErrorResponse
>;

export const createPayPayConfigCreate = <
	TError = ErrorType<ErrorResponse | void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof payPayConfigCreate>>,
		TError,
		{ data: BodyType<PayPayConfigCreateRequest> },
		TContext
	>;
}): CreateMutationResult<
	Awaited<ReturnType<typeof payPayConfigCreate>>,
	TError,
	{ data: BodyType<PayPayConfigCreateRequest> },
	TContext
> => {
	const mutationOptions = getPayPayConfigCreateMutationOptions(options);

	return createMutation(mutationOptions);
};
export const payManualPayment = (payManualPaymentRequest: BodyType<PayManualPaymentRequest>) => {
	return customInstance<EntitiesPayment>({
		url: `/pay/manual`,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		data: payManualPaymentRequest,
	});
};

export const getPayManualPaymentMutationOptions = <
	TError = ErrorType<InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof payManualPayment>>,
		TError,
		{ data: BodyType<PayManualPaymentRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<typeof payManualPayment>>,
	TError,
	{ data: BodyType<PayManualPaymentRequest> },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof payManualPayment>>,
		{ data: BodyType<PayManualPaymentRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return payManualPayment(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type PayManualPaymentMutationResult = NonNullable<
	Awaited<ReturnType<typeof payManualPayment>>
>;
export type PayManualPaymentMutationBody = BodyType<PayManualPaymentRequest>;
export type PayManualPaymentMutationError = ErrorType<InternalErrorResponse>;

export const createPayManualPayment = <
	TError = ErrorType<InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof payManualPayment>>,
		TError,
		{ data: BodyType<PayManualPaymentRequest> },
		TContext
	>;
}): CreateMutationResult<
	Awaited<ReturnType<typeof payManualPayment>>,
	TError,
	{ data: BodyType<PayManualPaymentRequest> },
	TContext
> => {
	const mutationOptions = getPayManualPaymentMutationOptions(options);

	return createMutation(mutationOptions);
};
export const payGetLink = (params: PayGetLinkParams) => {
	return customInstance<CommonWrapperResultOfResponse>({
		url: `/pay/getLink`,
		method: "GET",
		params,
	});
};

export const getPayGetLinkQueryKey = (params: PayGetLinkParams) => {
	return [`/pay/getLink`, ...(params ? [params] : [])] as const;
};

export const getPayGetLinkQueryOptions = <
	TData = Awaited<ReturnType<typeof payGetLink>>,
	TError = ErrorType<InternalErrorResponse>,
>(
	params: PayGetLinkParams,
	options?: {
		query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof payGetLink>>, TError, TData>>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getPayGetLinkQueryKey(params);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof payGetLink>>> = () => payGetLink(params);

	return { queryKey, queryFn, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<typeof payGetLink>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type PayGetLinkQueryResult = NonNullable<Awaited<ReturnType<typeof payGetLink>>>;
export type PayGetLinkQueryError = ErrorType<InternalErrorResponse>;

export function createPayGetLink<
	TData = Awaited<ReturnType<typeof payGetLink>>,
	TError = ErrorType<InternalErrorResponse>,
>(
	params: PayGetLinkParams,
	options?: {
		query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof payGetLink>>, TError, TData>>;
	}
): CreateQueryResult<TData, TError> & { queryKey: QueryKey } {
	const queryOptions = getPayGetLinkQueryOptions(params, options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: QueryKey;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
}

export const payCheck = (payCheckRequest: BodyType<PayCheckRequest>) => {
	return customInstance<PayCheckResponse>({
		url: `/pay/check`,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		data: payCheckRequest,
	});
};

export const getPayCheckMutationOptions = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof payCheck>>,
		TError,
		{ data: BodyType<PayCheckRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<typeof payCheck>>,
	TError,
	{ data: BodyType<PayCheckRequest> },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof payCheck>>,
		{ data: BodyType<PayCheckRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return payCheck(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type PayCheckMutationResult = NonNullable<Awaited<ReturnType<typeof payCheck>>>;
export type PayCheckMutationBody = BodyType<PayCheckRequest>;
export type PayCheckMutationError = ErrorType<void | InternalErrorResponse>;

export const createPayCheck = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof payCheck>>,
		TError,
		{ data: BodyType<PayCheckRequest> },
		TContext
	>;
}): CreateMutationResult<
	Awaited<ReturnType<typeof payCheck>>,
	TError,
	{ data: BodyType<PayCheckRequest> },
	TContext
> => {
	const mutationOptions = getPayCheckMutationOptions(options);

	return createMutation(mutationOptions);
};
