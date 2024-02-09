<script lang="ts">
	import { Badge, Button, Input, Loader, Select } from "@kayord/ui";
	import type { PageData } from "./$types";
	import { ArrowLeft, SearchIcon } from "lucide-svelte";
	import {
		createMenuGetSectionsGetMenusSections,
		createMenuGetItemsGetMenuItems,
		type MenuGetSectionsGetMenusSectionsParams,
		type MenuGetItemsGetMenuItemsParams,
	} from "$lib/api";
	import Error from "$lib/components/Error.svelte";
	import { getError } from "$lib/types";
	import { FilterIcon } from "lucide-svelte";
	import MenuItem from "./MenuItem.svelte";
	import { page } from "$app/stores";
	import Menus from "./Menus.svelte";
	import { selection } from "$lib/stores/selection";

	export let data: PageData;

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

	const setSection = (sectionId: number) => {
		sectionParams.sectionId = sectionId;
		itemParams.sectionId = sectionId;
	};
</script>

<div class="flex justify-center flex-col mb-8 mt-4 items-center">
	<div class="flex w-full justify-center gap-2">
		<div class="relative flex items-center max-w-2xl w-full">
			<Input on:input={(value) => setSearchString(value)} value={search} class="pr-8" />
			{#if $itemsQuery.isFetching}
				<Loader class="absolute right-1 top-0.5 size-5" />
			{:else}
				<SearchIcon class="absolute right-2 h-4 w-4" />
			{/if}
		</div>
		<Button><FilterIcon class="w-5 h-5" /> Filter</Button>
	</div>

	<Menus menus={data.menu ?? []} />

	{#if $itemsQuery.error}
		<Error message={getError($itemsQuery.error).message} />
	{/if}
	{#if $sectionsQuery.error}
		<Error message={getError($sectionsQuery.error).message} />
	{/if}

	<div class="flex justify-center w-full">
		<div class="flex justify-center gap-2 my-8 flex-wrap p-2 w-full">
			{#each $itemsQuery.data ?? [] as item}
				<MenuItem name={item.name} price={item.price} />
			{/each}
		</div>
	</div>

	<div class="flex justify-center gap-2 my-8 flex-wrap items-center">
		{#if $sectionsQuery.isPending}
			<Loader />
		{/if}
		{#if $sectionsQuery.data}
			{#if sectionParams.sectionId > 0}
				<button
					on:click={() => {
						setSection(0);
					}}
					class="flex items-center"
				>
					<Badge variant="secondary" class="h-6"><ArrowLeft class="h-4 w-4" /></Badge>
				</button>
			{/if}
			{#each $sectionsQuery.data ?? [] as section}
				<button on:click={() => setSection(section.menuSectionId)}>
					<Badge class="h-6">{section.name}</Badge>
				</button>
			{/each}
		{/if}
	</div>
</div>
