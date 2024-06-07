<script lang="ts">
	import { Input, Loader } from "@kayord/ui";
	import { SearchIcon } from "lucide-svelte";
	import {
		createMenuGetSectionsGetMenusSections,
		createMenuGetItemsGetMenuItems,
		type MenuGetSectionsGetMenusSectionsParams,
		type MenuGetItemsGetMenuItemsParams,
	} from "$lib/api";
	import Error from "$lib/components/Error.svelte";
	import { getError } from "$lib/types";
	import MenuItem from "./MenuItem.svelte";
	import { page } from "$app/stores";
	import { selection } from "$lib/stores/selection";
	import autoAnimate from "@formkit/auto-animate";
	import { createMenuList } from "$lib/api";
	import { status } from "$lib/stores/status";
	import PickMenu from "./PickMenu.svelte";
	import PickCategory from "./PickCategory.svelte";
	import CategoriesList from "./CategoriesList.svelte";
	import { debounce } from "$lib/util";

	let query = createMenuList({ outletId: $status?.outletId });
	$: query = createMenuList({ outletId: $status?.outletId });

	let itemParams: MenuGetItemsGetMenuItemsParams = {
		menuId: $selection.menuId,
		sectionId: 0,
	};

	let sectionParams: MenuGetSectionsGetMenusSectionsParams = {
		menuId: $selection.menuId,
		sectionId: 0,
	};

	const search = $page.url.searchParams.get("search");
	$: itemParams.search = search;
	$: $selection.menuId && setMenuId();

	const setMenuId = () => {
		sectionParams.menuId = $selection.menuId;
		itemParams.menuId = $selection.menuId;
	};

	const setSearchString = (event: Event) => {
		const target = event.target as HTMLInputElement;
		$page.url.searchParams.set("search", target.value);
		history.replaceState(history.state, "", $page.url);
		itemParams.search = target.value;
	};
	const debouncedHandleInput = debounce(setSearchString, 500);

	let itemsQuery = createMenuGetItemsGetMenuItems(itemParams);
	$: itemsQuery = createMenuGetItemsGetMenuItems(itemParams);

	let sectionsQuery = createMenuGetSectionsGetMenusSections(sectionParams);
	$: sectionsQuery = createMenuGetSectionsGetMenusSections(sectionParams);

	const setMenuSelection = (menuId: number) => {
		$selection.menuId = menuId;
		sectionParams.menuId = $selection.menuId;
		itemParams.menuId = $selection.menuId;
	};

	const checkMenuSelection = () => {
		if ($query && $selection.menuId == 0 && $query.data && ($query.data?.length ?? 0) >= 1) {
			setMenuSelection($query.data[0]?.id ?? 0);
		}
	};

	$: checkMenuSelection();
</script>

<div class="flex justify-center flex-col mb-12 mt-2 items-center">
	<div class="flex flex-col w-full sticky top-0 z-50 bg-background p-1">
		<div class="flex w-full justify-center gap-2 px-2">
			<div class="relative flex items-center max-w-2xl w-full">
				{#if $itemsQuery.isFetching}
					<Loader class="absolute left-1 top-0.5 size-5" />
				{:else}
					<SearchIcon class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
				{/if}
				<Input
					type="search"
					placeholder="Search..."
					on:input={(value) => debouncedHandleInput(value)}
					value={search}
					class="pl-8"
				/>
			</div>
			<PickMenu data={$query.data} />
			<PickCategory sections={$sectionsQuery.data} bind:itemParams bind:sectionParams />
		</div>

		<div class="flex gap-2 flex-wrap items-center w-full">
			{#if $sectionsQuery.isPending}
				<div class="w-full">
					<Loader />
				</div>
			{/if}
			<CategoriesList
				sections={$sectionsQuery.data}
				bind:itemParams
				bind:sectionParams
				class="mt-1"
			/>
		</div>
	</div>

	{#if $itemsQuery.error}
		<Error message={getError($itemsQuery.error).message} />
	{/if}
	{#if $sectionsQuery.error}
		<Error message={getError($sectionsQuery.error).message} />
	{/if}

	<div class="flex justify-center w-full">
		<div class="flex justify-center gap-2 my-2 flex-wrap p-2 w-full" use:autoAnimate>
			{#each $itemsQuery.data ?? [] as item, i (item.menuItemId)}
				<MenuItem menuItem={item} tableBookingId={Number($page.params.id)} />
			{/each}
		</div>
	</div>
</div>
