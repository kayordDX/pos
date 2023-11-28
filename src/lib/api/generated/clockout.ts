/**
 * Generated by orval v6.20.0 🍺
 * Do not edit manually.
 * Kayord.Pos
 * OpenAPI spec version: v1
 */
import { createMutation } from "@tanstack/svelte-query";
import type { CreateMutationOptions, MutationFunction } from "@tanstack/svelte-query";
import type { Clock, InternalErrorResponse, Request29 } from "./api.schemas";
import { useCustomClient } from "../mutator/useCustomClient";
import type { ErrorType, BodyType } from "../mutator/useCustomClient";

export const useClockClockOutHook = () => {
	const clockClockOut = useCustomClient<Clock>();

	return (request29: BodyType<Request29>) => {
		return clockClockOut({
			url: `/clockout`,
			method: "post",
			headers: { "Content-Type": "application/json" },
			data: request29,
		});
	};
};

export const useClockClockOutMutationOptions = <
	TError = ErrorType<InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<ReturnType<typeof useClockClockOutHook>>>,
		TError,
		{ data: BodyType<Request29> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<ReturnType<typeof useClockClockOutHook>>>,
	TError,
	{ data: BodyType<Request29> },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const clockClockOut = useClockClockOutHook();

	const mutationFn: MutationFunction<
		Awaited<ReturnType<ReturnType<typeof useClockClockOutHook>>>,
		{ data: BodyType<Request29> }
	> = (props) => {
		const { data } = props ?? {};

		return clockClockOut(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type ClockClockOutMutationResult = NonNullable<
	Awaited<ReturnType<ReturnType<typeof useClockClockOutHook>>>
>;
export type ClockClockOutMutationBody = BodyType<Request29>;
export type ClockClockOutMutationError = ErrorType<InternalErrorResponse>;

export const createClockClockOut = <
	TError = ErrorType<InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<ReturnType<typeof useClockClockOutHook>>>,
		TError,
		{ data: BodyType<Request29> },
		TContext
	>;
}) => {
	const mutationOptions = useClockClockOutMutationOptions(options);

	return createMutation(mutationOptions);
};