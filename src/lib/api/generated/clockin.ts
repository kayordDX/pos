/**
 * Generated by orval v6.21.0 🍺
 * Do not edit manually.
 * Kayord.Pos
 * OpenAPI spec version: v1
 */
import { createMutation } from "@tanstack/svelte-query";
import type { CreateMutationOptions, MutationFunction } from "@tanstack/svelte-query";
import type { Clock, InternalErrorResponse, Request31 } from "./api.schemas";
import { useCustomClient } from "../mutator/useCustomClient";
import type { ErrorType, BodyType } from "../mutator/useCustomClient";

export const useClockClockInHook = () => {
	const clockClockIn = useCustomClient<Clock>();

	return (request31: BodyType<Request31>) => {
		return clockClockIn({
			url: `/clockin`,
			method: "POST",
			headers: { "Content-Type": "application/json" },
			data: request31,
		});
	};
};

export const useClockClockInMutationOptions = <
	TError = ErrorType<InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<ReturnType<typeof useClockClockInHook>>>,
		TError,
		{ data: BodyType<Request31> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<ReturnType<typeof useClockClockInHook>>>,
	TError,
	{ data: BodyType<Request31> },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const clockClockIn = useClockClockInHook();

	const mutationFn: MutationFunction<
		Awaited<ReturnType<ReturnType<typeof useClockClockInHook>>>,
		{ data: BodyType<Request31> }
	> = (props) => {
		const { data } = props ?? {};

		return clockClockIn(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type ClockClockInMutationResult = NonNullable<
	Awaited<ReturnType<ReturnType<typeof useClockClockInHook>>>
>;
export type ClockClockInMutationBody = BodyType<Request31>;
export type ClockClockInMutationError = ErrorType<InternalErrorResponse>;

export const createClockClockIn = <
	TError = ErrorType<InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<ReturnType<typeof useClockClockInHook>>>,
		TError,
		{ data: BodyType<Request31> },
		TContext
	>;
}) => {
	const mutationOptions = useClockClockInMutationOptions(options);

	return createMutation(mutationOptions);
};
