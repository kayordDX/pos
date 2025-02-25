<script lang="ts">
	import type { MenuGetSectionsResponse } from "$lib/api";
	import { Button, Card, Drawer } from "@kayord/ui";
	import { FilterIcon } from "lucide-svelte";
	import CategoriesList from "./CategoriesList.svelte";
	import { cn } from "@kayord/ui/utils";
	import { menuSection } from "$lib/stores/menuSection.svelte";

	let open = $state(false);

	interface Props {
		sections: MenuGetSectionsResponse | undefined;
	}

	let { sections }: Props = $props();

	let hasFilter = $derived(menuSection.sectionId > 0);

	const clear = () => {
		menuSection.sectionId = 0;
	};

	const setSection = (sectionId: number) => {
		menuSection.sectionId = sectionId;
	};

	const checkEmptySections = () => {
		if ((sections?.sections?.length ?? 0) == 0) {
			open = false;
		}
	};

	$effect(() => sections && checkEmptySections());

	const setFilterDefault = (open: boolean) => {
		if (open) {
			clear();
		}
	};
</script>

<Drawer.Root bind:open onOpenChange={setFilterDefault}>
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
			<CategoriesList {sections}>
				{#each sections?.sections ?? [] as section, i}
					{@const extraClass =
						section.menuSectionId == menuSection.sectionId
							? "bg-primary text-primary-foreground"
							: ""}
					<Button
						onclick={() => setSection(section.menuSectionId)}
						class={cn("p-2 w-full", extraClass)}
						variant="outline"
					>
						{section.name}
					</Button>
				{/each}
				<Button
					variant="secondary"
					class="w-full"
					onclick={() => {
						clear();
						open = false;
					}}>Close & Clear</Button
				>
			</CategoriesList>
		</div>
	</Drawer.Content>
</Drawer.Root>
