/**
 * Generated by orval v6.21.0 🍺
 * Do not edit manually.
 * Kayord.Pos
 * OpenAPI spec version: v1
 */
import { createMutation } from "@tanstack/svelte-query";
import type { CreateMutationOptions, MutationFunction } from "@tanstack/svelte-query";
import type { ErrorResponse, InternalErrorResponse, Request12, Response2 } from "./api.schemas";
import { useCustomClient } from "../mutator/useCustomClient";
import type { ErrorType, BodyType } from "../mutator/useCustomClient";

export const useSessionLoginHook = () => {
	const sessionLogin = useCustomClient<Response2>();

	return (request12: BodyType<Request12>) => {
		return sessionLogin({
			url: `/session/login`,
			method: "POST",
			headers: { "Content-Type": "application/json" },
			data: request12,
		});
	};
};

export const useSessionLoginMutationOptions = <
	TError = ErrorType<ErrorResponse | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<ReturnType<typeof useSessionLoginHook>>>,
		TError,
		{ data: BodyType<Request12> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<ReturnType<typeof useSessionLoginHook>>>,
	TError,
	{ data: BodyType<Request12> },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const sessionLogin = useSessionLoginHook();

	const mutationFn: MutationFunction<
		Awaited<ReturnType<ReturnType<typeof useSessionLoginHook>>>,
		{ data: BodyType<Request12> }
	> = (props) => {
		const { data } = props ?? {};

		return sessionLogin(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type SessionLoginMutationResult = NonNullable<
	Awaited<ReturnType<ReturnType<typeof useSessionLoginHook>>>
>;
export type SessionLoginMutationBody = BodyType<Request12>;
export type SessionLoginMutationError = ErrorType<ErrorResponse | InternalErrorResponse>;

export const createSessionLogin = <
	TError = ErrorType<ErrorResponse | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<ReturnType<typeof useSessionLoginHook>>>,
		TError,
		{ data: BodyType<Request12> },
		TContext
	>;
}) => {
	const mutationOptions = useSessionLoginMutationOptions(options);

	return createMutation(mutationOptions);
};
