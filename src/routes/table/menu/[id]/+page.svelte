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
	import Menus from "./Menus.svelte";
	import { selection } from "$lib/stores/selection";
	import Categories from "./Categories.svelte";
	import autoAnimate from "@formkit/auto-animate";
	import { createMenuList } from "$lib/api";
	import { status } from "$lib/stores/status";

	const query = createMenuList({ outletId: $status?.outletId });

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
		// goto(`?${$page.url.searchParams.toString()}`);
	};

	let itemsQuery = createMenuGetItemsGetMenuItems(itemParams);
	$: itemsQuery = createMenuGetItemsGetMenuItems(itemParams);

	let sectionsQuery = createMenuGetSectionsGetMenusSections(sectionParams);
	$: sectionsQuery = createMenuGetSectionsGetMenusSections(sectionParams);
</script>

<div class="flex justify-center flex-col mb-12 mt-2 items-center">
	<div class="flex w-full justify-center gap-2 px-2">
		<div class="relative flex items-center max-w-2xl w-full">
			<Input on:input={(value) => setSearchString(value)} value={search} class="pr-8" />
			{#if $itemsQuery.isFetching}
				<Loader class="absolute right-1 top-0.5 size-5" />
			{:else}
				<SearchIcon class="absolute right-2 h-4 w-4" />
			{/if}
		</div>
		<!-- <Button><FilterIcon class="w-5 h-5" /> Filter</Button> -->
	</div>

	<Menus menus={$query.data ?? []} />
	<div class="flex gap-2 my-2 flex-wrap items-center w-full p-2">
		{#if $sectionsQuery.isPending}
			<div class="w-full">
				<Loader />
			</div>
		{/if}
		<Categories sections={$sectionsQuery.data} bind:itemParams bind:sectionParams />
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
				<MenuItem menuItem={item} tableBookingId={Number($page.params.bookingId)} />
			{/each}
		</div>
	</div>
</div>
