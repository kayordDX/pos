// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/**
 * Generated by orval v7.1.1 🍺
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
	DTOMenuItemDTO,
	DTOMenuItemDTOBasic,
	EntitiesMenu,
	ErrorResponse,
	InternalErrorResponse,
	MenuCreateRequest,
	MenuGetItemGetMenuItemsParams,
	MenuGetItemsGetMenuItemsParams,
	MenuGetOutletMenuGetOutletMenusParams,
	MenuGetSectionsGetMenusSectionsParams,
	MenuGetSectionsResponse,
	MenuListParams,
	MenuUpdateRequest,
} from "./api.schemas";
import { customInstance } from "../mutator/customInstance";
import type { ErrorType, BodyType } from "../mutator/customInstance";

export const menuUpdate = (menuId: number, menuUpdateRequest: BodyType<MenuUpdateRequest>) => {
	return customInstance<EntitiesMenu>({
		url: `/menu/${menuId}`,
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		data: menuUpdateRequest,
	});
};

export const getMenuUpdateMutationOptions = <
	TError = ErrorType<ErrorResponse | void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof menuUpdate>>,
		TError,
		{ menuId: number; data: BodyType<MenuUpdateRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<typeof menuUpdate>>,
	TError,
	{ menuId: number; data: BodyType<MenuUpdateRequest> },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof menuUpdate>>,
		{ menuId: number; data: BodyType<MenuUpdateRequest> }
	> = (props) => {
		const { menuId, data } = props ?? {};

		return menuUpdate(menuId, data);
	};

	return { mutationFn, ...mutationOptions };
};

export type MenuUpdateMutationResult = NonNullable<Awaited<ReturnType<typeof menuUpdate>>>;
export type MenuUpdateMutationBody = BodyType<MenuUpdateRequest>;
export type MenuUpdateMutationError = ErrorType<ErrorResponse | void | InternalErrorResponse>;

export const createMenuUpdate = <
	TError = ErrorType<ErrorResponse | void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof menuUpdate>>,
		TError,
		{ menuId: number; data: BodyType<MenuUpdateRequest> },
		TContext
	>;
}): CreateMutationResult<
	Awaited<ReturnType<typeof menuUpdate>>,
	TError,
	{ menuId: number; data: BodyType<MenuUpdateRequest> },
	TContext
> => {
	const mutationOptions = getMenuUpdateMutationOptions(options);

	return createMutation(mutationOptions);
};
export const menuGet = (menuId: number) => {
	return customInstance<EntitiesMenu>({ url: `/menu/${menuId}`, method: "GET" });
};

export const getMenuGetQueryKey = (menuId: number) => {
	return [`/menu/${menuId}`] as const;
};

export const getMenuGetQueryOptions = <
	TData = Awaited<ReturnType<typeof menuGet>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	menuId: number,
	options?: {
		query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof menuGet>>, TError, TData>>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getMenuGetQueryKey(menuId);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof menuGet>>> = () => menuGet(menuId);

	return { queryKey, queryFn, enabled: !!menuId, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<typeof menuGet>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type MenuGetQueryResult = NonNullable<Awaited<ReturnType<typeof menuGet>>>;
export type MenuGetQueryError = ErrorType<void | InternalErrorResponse>;

export function createMenuGet<
	TData = Awaited<ReturnType<typeof menuGet>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	menuId: number,
	options?: {
		query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof menuGet>>, TError, TData>>;
	}
): CreateQueryResult<TData, TError> & { queryKey: QueryKey } {
	const queryOptions = getMenuGetQueryOptions(menuId, options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: QueryKey;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
}

export const menuGetSectionsGetMenusSections = (params: MenuGetSectionsGetMenusSectionsParams) => {
	return customInstance<MenuGetSectionsResponse>({ url: `/menu/sections`, method: "GET", params });
};

export const getMenuGetSectionsGetMenusSectionsQueryKey = (
	params: MenuGetSectionsGetMenusSectionsParams
) => {
	return [`/menu/sections`, ...(params ? [params] : [])] as const;
};

export const getMenuGetSectionsGetMenusSectionsQueryOptions = <
	TData = Awaited<ReturnType<typeof menuGetSectionsGetMenusSections>>,
	TError = ErrorType<InternalErrorResponse>,
>(
	params: MenuGetSectionsGetMenusSectionsParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<typeof menuGetSectionsGetMenusSections>>, TError, TData>
		>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getMenuGetSectionsGetMenusSectionsQueryKey(params);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof menuGetSectionsGetMenusSections>>> = () =>
		menuGetSectionsGetMenusSections(params);

	return { queryKey, queryFn, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<typeof menuGetSectionsGetMenusSections>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type MenuGetSectionsGetMenusSectionsQueryResult = NonNullable<
	Awaited<ReturnType<typeof menuGetSectionsGetMenusSections>>
>;
export type MenuGetSectionsGetMenusSectionsQueryError = ErrorType<InternalErrorResponse>;

export function createMenuGetSectionsGetMenusSections<
	TData = Awaited<ReturnType<typeof menuGetSectionsGetMenusSections>>,
	TError = ErrorType<InternalErrorResponse>,
>(
	params: MenuGetSectionsGetMenusSectionsParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<typeof menuGetSectionsGetMenusSections>>, TError, TData>
		>;
	}
): CreateQueryResult<TData, TError> & { queryKey: QueryKey } {
	const queryOptions = getMenuGetSectionsGetMenusSectionsQueryOptions(params, options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: QueryKey;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
}

export const menuGetOutletMenuGetOutletMenus = (params: MenuGetOutletMenuGetOutletMenusParams) => {
	return customInstance<EntitiesMenu[]>({ url: `/menu/outletMenus`, method: "GET", params });
};

export const getMenuGetOutletMenuGetOutletMenusQueryKey = (
	params: MenuGetOutletMenuGetOutletMenusParams
) => {
	return [`/menu/outletMenus`, ...(params ? [params] : [])] as const;
};

export const getMenuGetOutletMenuGetOutletMenusQueryOptions = <
	TData = Awaited<ReturnType<typeof menuGetOutletMenuGetOutletMenus>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	params: MenuGetOutletMenuGetOutletMenusParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<typeof menuGetOutletMenuGetOutletMenus>>, TError, TData>
		>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getMenuGetOutletMenuGetOutletMenusQueryKey(params);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof menuGetOutletMenuGetOutletMenus>>> = () =>
		menuGetOutletMenuGetOutletMenus(params);

	return { queryKey, queryFn, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<typeof menuGetOutletMenuGetOutletMenus>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type MenuGetOutletMenuGetOutletMenusQueryResult = NonNullable<
	Awaited<ReturnType<typeof menuGetOutletMenuGetOutletMenus>>
>;
export type MenuGetOutletMenuGetOutletMenusQueryError = ErrorType<void | InternalErrorResponse>;

export function createMenuGetOutletMenuGetOutletMenus<
	TData = Awaited<ReturnType<typeof menuGetOutletMenuGetOutletMenus>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	params: MenuGetOutletMenuGetOutletMenusParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<typeof menuGetOutletMenuGetOutletMenus>>, TError, TData>
		>;
	}
): CreateQueryResult<TData, TError> & { queryKey: QueryKey } {
	const queryOptions = getMenuGetOutletMenuGetOutletMenusQueryOptions(params, options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: QueryKey;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
}

export const menuGetItemsGetMenuItems = (params: MenuGetItemsGetMenuItemsParams) => {
	return customInstance<DTOMenuItemDTOBasic[]>({ url: `/menu/items`, method: "GET", params });
};

export const getMenuGetItemsGetMenuItemsQueryKey = (params: MenuGetItemsGetMenuItemsParams) => {
	return [`/menu/items`, ...(params ? [params] : [])] as const;
};

export const getMenuGetItemsGetMenuItemsQueryOptions = <
	TData = Awaited<ReturnType<typeof menuGetItemsGetMenuItems>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	params: MenuGetItemsGetMenuItemsParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<typeof menuGetItemsGetMenuItems>>, TError, TData>
		>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getMenuGetItemsGetMenuItemsQueryKey(params);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof menuGetItemsGetMenuItems>>> = () =>
		menuGetItemsGetMenuItems(params);

	return { queryKey, queryFn, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<typeof menuGetItemsGetMenuItems>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type MenuGetItemsGetMenuItemsQueryResult = NonNullable<
	Awaited<ReturnType<typeof menuGetItemsGetMenuItems>>
>;
export type MenuGetItemsGetMenuItemsQueryError = ErrorType<void | InternalErrorResponse>;

export function createMenuGetItemsGetMenuItems<
	TData = Awaited<ReturnType<typeof menuGetItemsGetMenuItems>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	params: MenuGetItemsGetMenuItemsParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<typeof menuGetItemsGetMenuItems>>, TError, TData>
		>;
	}
): CreateQueryResult<TData, TError> & { queryKey: QueryKey } {
	const queryOptions = getMenuGetItemsGetMenuItemsQueryOptions(params, options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: QueryKey;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
}

export const menuGetItemGetMenuItems = (params: MenuGetItemGetMenuItemsParams) => {
	return customInstance<DTOMenuItemDTO>({ url: `/menu/item`, method: "GET", params });
};

export const getMenuGetItemGetMenuItemsQueryKey = (params: MenuGetItemGetMenuItemsParams) => {
	return [`/menu/item`, ...(params ? [params] : [])] as const;
};

export const getMenuGetItemGetMenuItemsQueryOptions = <
	TData = Awaited<ReturnType<typeof menuGetItemGetMenuItems>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	params: MenuGetItemGetMenuItemsParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<typeof menuGetItemGetMenuItems>>, TError, TData>
		>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getMenuGetItemGetMenuItemsQueryKey(params);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof menuGetItemGetMenuItems>>> = () =>
		menuGetItemGetMenuItems(params);

	return { queryKey, queryFn, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<typeof menuGetItemGetMenuItems>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type MenuGetItemGetMenuItemsQueryResult = NonNullable<
	Awaited<ReturnType<typeof menuGetItemGetMenuItems>>
>;
export type MenuGetItemGetMenuItemsQueryError = ErrorType<void | InternalErrorResponse>;

export function createMenuGetItemGetMenuItems<
	TData = Awaited<ReturnType<typeof menuGetItemGetMenuItems>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	params: MenuGetItemGetMenuItemsParams,
	options?: {
		query?: Partial<
			CreateQueryOptions<Awaited<ReturnType<typeof menuGetItemGetMenuItems>>, TError, TData>
		>;
	}
): CreateQueryResult<TData, TError> & { queryKey: QueryKey } {
	const queryOptions = getMenuGetItemGetMenuItemsQueryOptions(params, options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: QueryKey;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
}

export const menuList = (params: MenuListParams) => {
	return customInstance<EntitiesMenu[]>({ url: `/menu`, method: "GET", params });
};

export const getMenuListQueryKey = (params: MenuListParams) => {
	return [`/menu`, ...(params ? [params] : [])] as const;
};

export const getMenuListQueryOptions = <
	TData = Awaited<ReturnType<typeof menuList>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	params: MenuListParams,
	options?: {
		query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof menuList>>, TError, TData>>;
	}
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getMenuListQueryKey(params);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof menuList>>> = () => menuList(params);

	return { queryKey, queryFn, ...queryOptions } as CreateQueryOptions<
		Awaited<ReturnType<typeof menuList>>,
		TError,
		TData
	> & { queryKey: QueryKey };
};

export type MenuListQueryResult = NonNullable<Awaited<ReturnType<typeof menuList>>>;
export type MenuListQueryError = ErrorType<void | InternalErrorResponse>;

export function createMenuList<
	TData = Awaited<ReturnType<typeof menuList>>,
	TError = ErrorType<void | InternalErrorResponse>,
>(
	params: MenuListParams,
	options?: {
		query?: Partial<CreateQueryOptions<Awaited<ReturnType<typeof menuList>>, TError, TData>>;
	}
): CreateQueryResult<TData, TError> & { queryKey: QueryKey } {
	const queryOptions = getMenuListQueryOptions(params, options);

	const query = createQuery(queryOptions) as CreateQueryResult<TData, TError> & {
		queryKey: QueryKey;
	};

	query.queryKey = queryOptions.queryKey;

	return query;
}

export const menuCreate = (menuCreateRequest: BodyType<MenuCreateRequest>) => {
	return customInstance<EntitiesMenu>({
		url: `/menu`,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		data: menuCreateRequest,
	});
};

export const getMenuCreateMutationOptions = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof menuCreate>>,
		TError,
		{ data: BodyType<MenuCreateRequest> },
		TContext
	>;
}): CreateMutationOptions<
	Awaited<ReturnType<typeof menuCreate>>,
	TError,
	{ data: BodyType<MenuCreateRequest> },
	TContext
> => {
	const { mutation: mutationOptions } = options ?? {};

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof menuCreate>>,
		{ data: BodyType<MenuCreateRequest> }
	> = (props) => {
		const { data } = props ?? {};

		return menuCreate(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type MenuCreateMutationResult = NonNullable<Awaited<ReturnType<typeof menuCreate>>>;
export type MenuCreateMutationBody = BodyType<MenuCreateRequest>;
export type MenuCreateMutationError = ErrorType<void | InternalErrorResponse>;

export const createMenuCreate = <
	TError = ErrorType<void | InternalErrorResponse>,
	TContext = unknown,
>(options?: {
	mutation?: CreateMutationOptions<
		Awaited<ReturnType<typeof menuCreate>>,
		TError,
		{ data: BodyType<MenuCreateRequest> },
		TContext
	>;
}): CreateMutationResult<
	Awaited<ReturnType<typeof menuCreate>>,
	TError,
	{ data: BodyType<MenuCreateRequest> },
	TContext
> => {
	const mutationOptions = getMenuCreateMutationOptions(options);

	return createMutation(mutationOptions);
};
