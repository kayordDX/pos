<script lang="ts">
	import type {
		MenuGetItemsGetMenuItemsParams,
		MenuGetSectionsGetMenusSectionsParams,
		MenuGetSectionsResponse,
	} from "$lib/api";
	import { Badge, Button, Card, Drawer } from "@kayord/ui";
	import { FilterIcon } from "lucide-svelte";
	import CategoriesList from "./CategoriesList.svelte";
	import { cn } from "@kayord/ui/utils";

	let open = false;

	export let sections: MenuGetSectionsResponse | undefined;
	export let sectionParams: MenuGetSectionsGetMenusSectionsParams;
	export let itemParams: MenuGetItemsGetMenuItemsParams;

	$: hasFilter = itemParams.sectionId > 0;

	const clear = () => {
		sectionParams.sectionId = 0;
		itemParams.sectionId = 0;
	};

	const setSection = (sectionId: number) => {
		sectionParams.sectionId = sectionId;
		itemParams.sectionId = sectionId;
	};
</script>

<Drawer.Root bind:open>
	<Drawer.Trigger>
		<Button size="icon" class="relative" variant="secondary">
			<FilterIcon class="h-5 w-5" />
			{#if hasFilter}
				<span class="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary"></span>
			{/if}
		</Button>
	</Drawer.Trigger>
	<Drawer.Content class="fixed bottom-0 left-0 right-0 flex max-h-[96%] w-full">
		<Drawer.Header class="flex flex-col items-center">
			<Drawer.Title>Select Category</Drawer.Title>
			<Drawer.Description>Choose the category to filter on</Drawer.Description>
		</Drawer.Header>
		<div class="mx-auto flex w-full flex-col overflow-auto rounded-t-[10px] px-4">
			<CategoriesList {sections} bind:itemParams bind:sectionParams>
				{#each sections?.sections ?? [] as section, i}
					{@const extraClass =
						section.menuSectionId == sectionParams.sectionId
							? "bg-primary text-primary-foreground"
							: ""}

					<button on:click={() => setSection(section.menuSectionId)} class="w-full">
						<Card.Root class={cn("p-2 w-full", extraClass)}>
							{section.name}
						</Card.Root>
					</button>
				{/each}
			</CategoriesList>
		</div>
		<Drawer.Footer>
			<Drawer.Close asChild let:builder>
				<Button builders={[builder]} variant="outline">Close</Button>
			</Drawer.Close>
			<Drawer.Close asChild let:builder>
				<Button builders={[builder]} variant="secondary" on:click={clear}>Clear</Button>
			</Drawer.Close>
		</Drawer.Footer>
	</Drawer.Content>
</Drawer.Root>
