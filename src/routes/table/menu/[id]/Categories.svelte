<script lang="ts">
	import type {
		MenuGetItemsGetMenuItemsParams,
		MenuGetSectionsGetMenusSectionsParams,
		MenuGetSectionsResponse,
	} from "$lib/api";
	import { Badge } from "@kayord/ui";
	import { ChevronRightIcon, HomeIcon, MoreHorizontalIcon } from "lucide-svelte";

	export let sections: MenuGetSectionsResponse | undefined;
	export let sectionParams: MenuGetSectionsGetMenusSectionsParams;
	export let itemParams: MenuGetItemsGetMenuItemsParams;
	const setSection = (sectionId: number) => {
		sectionParams.sectionId = sectionId;
		itemParams.sectionId = sectionId;
	};
</script>

<div class="flex gap-1 items-center">
	{#if sections != null}
		{#if sectionParams.sectionId > 0}
			<button
				on:click={() => {
					setSection(0);
				}}
				class="flex items-center"
			>
				<Badge variant="primary"><HomeIcon class="h-4 w-4" /></Badge>
			</button>
			<ChevronRightIcon class="h-5 w-5" />
		{/if}
		{#each sections.parents ?? [] as parent, i}
			{#if (parent.parent?.parentId ?? 0) > 0}
				<MoreHorizontalIcon class="h-5 w-5 justify-self-end items-baseline place-self-end" />
			{/if}
			{#if parent.parent}
				<button on:click={() => setSection(parent?.parent?.menuSectionId ?? 0)}>
					<Badge class="h-6">{parent.parent.name}</Badge>
				</button>
				<ChevronRightIcon class="h-5 w-5" />
			{/if}
			<button on:click={() => setSection(parent.menuSectionId)}>
				<Badge variant="secondary" class="h-6">{parent.name}</Badge>
			</button>

			{#if sections.parents?.length == i + 1 && (sections?.sections?.length ?? 0) > 0}
				<ChevronRightIcon class="h-5 w-5" />
			{/if}
		{/each}
		{#each sections?.sections ?? [] as section, i}
			<button on:click={() => setSection(section.menuSectionId)}>
				<Badge class="h-6 flex whitespace-nowrap">{section.name}</Badge>
			</button>
		{/each}
	{/if}
</div>
