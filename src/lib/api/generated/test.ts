// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Kayord.Pos
 * OpenAPI spec version: v1
 */
import { createQuery } from "@tanstack/svelte-query";
import type {
	CreateQueryOptions,
	CreateQueryResult,
	QueryFunction,
	QueryKey,
} from "@tanstack/svelte-query";
import type { BillTableTotal, InternalErrorResponse, ServicesWhatsappStatus } from "./api.schemas";
import { customInstance } from "../mutator/customInstance.svelte";
import type { ErrorType } from "../mutator/customInstance.svelte";

export const test = () => {
	return customInstance<boolean>({ url: `/test`, method: "GET" });
};

export const getTestQueryKey = () => {
	return [`/test`] as const;
};

export const getTestQueryOptions = <
	TData = Awaited<ReturnType<typeof test>>,
	TError = ErrorType<InternalErrorResponse>,
>(options?: {
	query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof test>>, TError, TData>>;
}) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getTestQueryKey();

	const queryFn: QueryFunction<Awaited<ReturnType<typeof test>>> = () => test();

	return { queryKey, queryFn, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<typeof test>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type TestQueryResult = NonNullable<Awaited<ReturnType<typeof test>>>;
export type TestQueryError = ErrorType<InternalErrorResponse>;

export function createTest<
	TData = Awaited<ReturnType<typeof test>>,
	TError = ErrorType<InternalErrorResponse>,
>(options?: {
	query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof test>>, TError, TData>>;
}): CreateQueryResult<TData, TError> & { queryKey: QueryKey } {
	const queryOptions = getTestQueryOptions(options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: QueryKey;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
}

export const testTotalTest = () => {
	return customInstance<BillTableTotal>({ url: `/test/total`, method: "GET" });
};

export const getTestTotalTestQueryKey = () => {
	return [`/test/total`] as const;
};

export const getTestTotalTestQueryOptions = <
	TData = Awaited<ReturnType<typeof testTotalTest>>,
	TError = ErrorType<InternalErrorResponse>,
>(options?: {
	query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof testTotalTest>>, TError, TData>>;
}) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getTestTotalTestQueryKey();

	const queryFn: QueryFunction<Awaited<ReturnType<typeof testTotalTest>>> = () => testTotalTest();

	return { queryKey, queryFn, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<typeof testTotalTest>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type TestTotalTestQueryResult = NonNullable<Awaited<ReturnType<typeof testTotalTest>>>;
export type TestTotalTestQueryError = ErrorType<InternalErrorResponse>;

export function createTestTotalTest<
	TData = Awaited<ReturnType<typeof testTotalTest>>,
	TError = ErrorType<InternalErrorResponse>,
>(options?: {
	query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof testTotalTest>>, TError, TData>>;
}): CreateQueryResult<TData, TError> & { queryKey: QueryKey } {
	const queryOptions = getTestTotalTestQueryOptions(options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: QueryKey;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
}

export const testWhatsAppTest = () => {
	return customInstance<ServicesWhatsappStatus>({ url: `/test/whatsapp`, method: "GET" });
};

export const getTestWhatsAppTestQueryKey = () => {
	return [`/test/whatsapp`] as const;
};

export const getTestWhatsAppTestQueryOptions = <
	TData = Awaited<ReturnType<typeof testWhatsAppTest>>,
	TError = ErrorType<InternalErrorResponse>,
>(options?: {
	query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof testWhatsAppTest>>, TError, TData>>;
}) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getTestWhatsAppTestQueryKey();

	const queryFn: QueryFunction<Awaited<ReturnType<typeof testWhatsAppTest>>> = () =>
		testWhatsAppTest();

	return { queryKey, queryFn, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<typeof testWhatsAppTest>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type TestWhatsAppTestQueryResult = NonNullable<Awaited<ReturnType<typeof testWhatsAppTest>>>;
export type TestWhatsAppTestQueryError = ErrorType<InternalErrorResponse>;

export function createTestWhatsAppTest<
	TData = Awaited<ReturnType<typeof testWhatsAppTest>>,
	TError = ErrorType<InternalErrorResponse>,
>(options?: {
	query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof testWhatsAppTest>>, TError, TData>>;
}): CreateQueryResult<TData, TError> & { queryKey: QueryKey } {
	const queryOptions = getTestWhatsAppTestQueryOptions(options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: QueryKey;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
}
