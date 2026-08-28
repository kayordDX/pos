<script lang="ts">
	import { Input, Loader } from "@kayord/ui";
	import { SearchIcon } from "@lucide/svelte";
	import {
		createMenuList,
		createMenuGetSectionsGetMenusSections,
		createMenuGetItemsGetMenuItems,
		type MenuGetSectionsGetMenusSectionsParams,
		type MenuGetItemsGetMenuItemsParams,
	} from "$lib/api";
	import Error from "$lib/components/Error.svelte";
	import { getError } from "$lib/types";
	import { page } from "$app/state";
	import { menu } from "$lib/stores/menu.svelte";
	import { status } from "$lib/stores/status.svelte";
	import PickMenu from "./PickMenu.svelte";
	import PickCategory from "./PickCategory.svelte";
	import CategoriesList from "./CategoriesList.svelte";
	import { debounce } from "$lib/util";
	import MenuItems from "./MenuItems.svelte";
	import { menuSection } from "$lib/stores/menuSection.svelte";

	const query = createMenuList(() => ({ outletId: status.value?.outletId }));

	let search = $state<string | undefined>(undefined);

	const setSearchString = (event: Event) => {
		const target = event.target as HTMLInputElement;
		page.url.searchParams.set("search", target.value);
		search = target.value;
		history.replaceState(history.state, "", page.url);
	};
	const debouncedHandleInput = debounce(setSearchString, 500);

	const itemsQuery = createMenuGetItemsGetMenuItems(() => ({
		menuId: menu.value.menuId,
		sectionId: menuSection.sectionId,
		search: search,
	}));

	let sectionsQuery = createMenuGetSectionsGetMenusSections(() => ({
		menuId: menu.value.menuId,
		sectionId: menuSection.sectionId,
	}));

	const setMenuSelection = (menuId: number) => {
		menu.value.menuId = menuId;
	};

	const checkMenuSelection = () => {
		if (query && menu.value.menuId == 0 && query.data && (query.data?.length ?? 0) >= 1) {
			setMenuSelection(query.data[0]?.id ?? 0);
		}
	};

	$effect(() => {
		checkMenuSelection();
	});
</script>

<div class="flex justify-center flex-col mb-12 mt-2 items-center">
	<div class="flex flex-col w-full sticky top-0 z-10 bg-background p-1">
		<div class="flex w-full justify-center gap-2 px-2">
			<div class="relative flex items-center max-w-2xl w-full">
				{#if itemsQuery.isFetching}
					<Loader class="absolute left-1 top-0.5 size-5" />
				{:else}
					<SearchIcon class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
				{/if}
				<Input
					type="search"
					placeholder="Search..."
					oninput={(value) => debouncedHandleInput(value)}
					value={search}
					class="pl-8"
				/>
			</div>
			<PickMenu data={query.data} />
			<PickCategory sections={sectionsQuery.data} />
		</div>

		<div class="flex gap-2 flex-wrap items-center w-full">
			{#if sectionsQuery.isPending}
				<div class="w-full">
					<Loader />
				</div>
			{/if}
			<CategoriesList sections={sectionsQuery.data} class="mt-1" />
		</div>
	</div>

	{#if itemsQuery.error}
		<Error message={getError(itemsQuery.error).message} />
	{/if}
	{#if sectionsQuery.error}
		<Error message={getError(sectionsQuery.error).message} />
	{/if}

	<div class="flex justify-center w-full">
		<MenuItems data={itemsQuery.data ?? []} tableBookingId={Number(page.params.id)} />
	</div>
</div>
