// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/**
 * Generated by orval v7.3.0 🍺
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
	DataTag,
	MutationFunction,
	QueryFunction,
	QueryKey,
} from "@tanstack/svelte-query";
import type {
	CommonModelsPaginatedListOfMenuItemAdminDTO,
	EntitiesMenuItem,
	EntitiesMenuSection,
	ErrorResponse,
	InternalErrorResponse,
	MenuItemCreateRequest,
	MenuItemGetAllParams,
	MenuItemUpdateRequest,
} from "./api.schemas";
import { customInstance } from "../mutator/customInstance.svelte";
import type { ErrorType, BodyType } from "../mutator/customInstance.svelte";

export const menuItemUpdate = (menuItemUpdateRequest: BodyType<MenuItemUpdateRequest>) => {
	return customInstance<EntitiesMenuItem>({
		url: `/menuItem`,
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		data: menuItemUpdateRequest,
	});
};

export const getMenuItemUpdateMutationOptions = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof menuItemUpdate>>,
		TError,
		{ data: BodyType<MenuItemUpdateRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<typeof menuItemUpdate>>,
	TError,
	{ data: BodyType<MenuItemUpdateRequest> },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof menuItemUpdate>>,
		{ data: BodyType<MenuItemUpdateRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return menuItemUpdate(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type MenuItemUpdateMutationResult = NonNullable<Awaited<ReturnType<typeof menuItemUpdate>>>;
export type MenuItemUpdateMutationBody = BodyType<MenuItemUpdateRequest>;
export type MenuItemUpdateMutationError = ErrorType<void | InternalErrorResponse>;

export const createMenuItemUpdate = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof menuItemUpdate>>,
		TError,
		{ data: BodyType<MenuItemUpdateRequest> },
		TContext
	>;
}): CreateMutationResult<
	Awaited<ReturnType<typeof menuItemUpdate>>,
	TError,
	{ data: BodyType<MenuItemUpdateRequest> },
	TContext
> => {
	const mutationOptions = getMenuItemUpdateMutationOptions(options);

	return createMutation(mutationOptions);
};
export const menuItemGetAll = (params?: MenuItemGetAllParams) => {
	return customInstance<CommonModelsPaginatedListOfMenuItemAdminDTO>({
		url: `/menuItem`,
		method: "GET",
		params,
	});
};

export const getMenuItemGetAllQueryKey = (params?: MenuItemGetAllParams) => {
	return [`/menuItem`, ...(params ? [params] : [])] as const;
};

export const getMenuItemGetAllQueryOptions = <
	TData = Awaited<ReturnType<typeof menuItemGetAll>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	params?: MenuItemGetAllParams,
	options?: {
		query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof menuItemGetAll>>, TError, TData>>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getMenuItemGetAllQueryKey(params);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof menuItemGetAll>>> = () =>
		menuItemGetAll(params);

	return { queryKey, queryFn, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<typeof menuItemGetAll>>,
		TError,
		TData
	> & { queryKey: DataTag<QueryKey, TData> };
};

export type MenuItemGetAllQueryResult = NonNullable<Awaited<ReturnType<typeof menuItemGetAll>>>;
export type MenuItemGetAllQueryError = ErrorType<void | InternalErrorResponse>;

export function createMenuItemGetAll<
	TData = Awaited<ReturnType<typeof menuItemGetAll>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	params?: MenuItemGetAllParams,
	options?: {
		query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof menuItemGetAll>>, TError, TData>>;
	}
): CreateQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {
	const queryOptions = getMenuItemGetAllQueryOptions(params, options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: DataTag<QueryKey, TData>;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
}

export const menuItemCreate = (menuItemCreateRequest: BodyType<MenuItemCreateRequest>) => {
	return customInstance<EntitiesMenuItem>({
		url: `/menuItem`,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		data: menuItemCreateRequest,
	});
};

export const getMenuItemCreateMutationOptions = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof menuItemCreate>>,
		TError,
		{ data: BodyType<MenuItemCreateRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<typeof menuItemCreate>>,
	TError,
	{ data: BodyType<MenuItemCreateRequest> },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof menuItemCreate>>,
		{ data: BodyType<MenuItemCreateRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return menuItemCreate(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type MenuItemCreateMutationResult = NonNullable<Awaited<ReturnType<typeof menuItemCreate>>>;
export type MenuItemCreateMutationBody = BodyType<MenuItemCreateRequest>;
export type MenuItemCreateMutationError = ErrorType<void | InternalErrorResponse>;

export const createMenuItemCreate = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof menuItemCreate>>,
		TError,
		{ data: BodyType<MenuItemCreateRequest> },
		TContext
	>;
}): CreateMutationResult<
	Awaited<ReturnType<typeof menuItemCreate>>,
	TError,
	{ data: BodyType<MenuItemCreateRequest> },
	TContext
> => {
	const mutationOptions = getMenuItemCreateMutationOptions(options);

	return createMutation(mutationOptions);
};
export const menuItemDelete = (id: number) => {
	return customInstance<EntitiesMenuSection>({ url: `/menuItem/${id}`, method: "DELETE" });
};

export const getMenuItemDeleteMutationOptions = <
	TError = ErrorType<ErrorResponse | void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof menuItemDelete>>,
		TError,
		{ id: number },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<typeof menuItemDelete>>,
	TError,
	{ id: number },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const mutationFn: MutationFunction<Awaited<ReturnType<typeof menuItemDelete>>, { id: number }> = (
		props
	) => {
		const { id } = props ?? {};

		return menuItemDelete(id);
	};

	return { mutationFn, ...mutationOptions };
};

export type MenuItemDeleteMutationResult = NonNullable<Awaited<ReturnType<typeof menuItemDelete>>>;

export type MenuItemDeleteMutationError = ErrorType<ErrorResponse | void | InternalErrorResponse>;

export const createMenuItemDelete = <
	TError = ErrorType<ErrorResponse | void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof menuItemDelete>>,
		TError,
		{ id: number },
		TContext
	>;
}): CreateMutationResult<
	Awaited<ReturnType<typeof menuItemDelete>>,
	TError,
	{ id: number },
	TContext
> => {
	const mutationOptions = getMenuItemDeleteMutationOptions(options);

	return createMutation(mutationOptions);
};