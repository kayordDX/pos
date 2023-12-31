/**
 * Generated by orval v6.21.0 🍺
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
import type { Clock, ErrorResponse, InternalErrorResponse, Request12, Staff } from "./api.schemas";
import { useCustomClient } from "../mutator/useCustomClient";
import type { ErrorType, BodyType } from "../mutator/useCustomClient";

export const useStaffCreateHook = () => {
	const staffCreate = useCustomClient<Staff>();

	return (request12: BodyType<Request12>) => {
		return staffCreate({
			url: `/staff`,
			method: "POST",
			headers: { "Content-Type": "application/json" },
			data: request12,
		});
	};
};

export const useStaffCreateMutationOptions = <
	TError = ErrorType<ErrorResponse | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<ReturnType<typeof useStaffCreateHook>>>,
		TError,
		{ data: BodyType<Request12> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<ReturnType<typeof useStaffCreateHook>>>,
	TError,
	{ data: BodyType<Request12> },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const staffCreate = useStaffCreateHook();

	const mutationFn: MutationFunction<
		Awaited<ReturnType<ReturnType<typeof useStaffCreateHook>>>,
		{ data: BodyType<Request12> }
	> = (props) => {
		const { data } = props ?? {};

		return staffCreate(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type StaffCreateMutationResult = NonNullable<
	Awaited<ReturnType<ReturnType<typeof useStaffCreateHook>>>
>;
export type StaffCreateMutationBody = BodyType<Request12>;
export type StaffCreateMutationError = ErrorType<ErrorResponse | InternalErrorResponse>;

export const createStaffCreate = <
	TError = ErrorType<ErrorResponse | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<ReturnType<typeof useStaffCreateHook>>>,
		TError,
		{ data: BodyType<Request12> },
		TContext
	>;
}) => {
	const mutationOptions = useStaffCreateMutationOptions(options);

	return createMutation(mutationOptions);
};
export const useStaffGetAllClockedInHook = () => {
	const staffGetAllClockedIn = useCustomClient<Clock[]>();

	return (outletId: number) => {
		return staffGetAllClockedIn({ url: `/staff/${outletId}`, method: "GET" });
	};
};

export const getStaffGetAllClockedInQueryKey = (outletId: number) => {
	return [`/staff/${outletId}`] as const;
};

export const useStaffGetAllClockedInQueryOptions = <
	TData = Awaited<ReturnType<ReturnType<typeof useStaffGetAllClockedInHook>>>,
	TError = ErrorType<InternalErrorResponse>,
>(
	outletId: number,
	options?: {
		query?: CreateQueryOptions<
			Awaited<ReturnType<ReturnType<typeof useStaffGetAllClockedInHook>>>,
			TError,
			TData
		>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getStaffGetAllClockedInQueryKey(outletId);

	const staffGetAllClockedIn = useStaffGetAllClockedInHook();

	const queryFn: QueryFunction<
		Awaited<ReturnType<ReturnType<typeof useStaffGetAllClockedInHook>>>
	> = () => staffGetAllClockedIn(outletId);

	return { queryKey, queryFn, enabled: !!outletId, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<ReturnType<typeof useStaffGetAllClockedInHook>>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type StaffGetAllClockedInQueryResult = NonNullable<
	Awaited<ReturnType<ReturnType<typeof useStaffGetAllClockedInHook>>>
>;
export type StaffGetAllClockedInQueryError = ErrorType<InternalErrorResponse>;

export const createStaffGetAllClockedIn = <
	TData = Awaited<ReturnType<ReturnType<typeof useStaffGetAllClockedInHook>>>,
	TError = ErrorType<InternalErrorResponse>,
>(
	outletId: number,
	options?: {
		query?: CreateQueryOptions<
			Awaited<ReturnType<ReturnType<typeof useStaffGetAllClockedInHook>>>,
			TError,
			TData
		>;
	}
): CreateQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = useStaffGetAllClockedInQueryOptions(outletId, options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: QueryKey;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
};
