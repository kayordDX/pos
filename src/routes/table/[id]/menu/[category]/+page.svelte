<script lang="ts">
	import { Badge, Button, Card, Input, Loader, Select, Separator, ToggleGroup } from "@kayord/ui";
	import type { PageData } from "./$types";
	import {
		Minus,
		MoveUp,
		Plus,
		ArrowLeft,
		BoldIcon,
		ItalicIcon,
		UnderlineIcon,
	} from "lucide-svelte";
	import {
		createMenuGetOutletMenuGetOutletMenus,
		createMenuGetSectionsGetOutletMenus,
		type MenuGetSectionsGetOutletMenusParams,
	} from "$lib/api";
	import Error from "$lib/components/Error.svelte";
	import { getError } from "$lib/types";
	import { FilterIcon } from "lucide-svelte";
	import { writable, type Writable } from "svelte/store";
	import Header from "$lib/components/Header/Header.svelte";

	export let data: PageData;
	let count: number = 0;

	const increment = () => {
		count++;
	};

	const decrement = () => {
		count--;
	};

	let sectionParams: MenuGetSectionsGetOutletMenusParams = {
		outletId: data.status?.outletId ?? 0,
		sectionId: 0,
	};

	let searchString = "";
	$: sectionParams.search = searchString;

	const query = createMenuGetOutletMenuGetOutletMenus({ outletId: data.status?.outletId ?? 0 });

	let sectionsQuery = createMenuGetSectionsGetOutletMenus(sectionParams);
	$: sectionsQuery = createMenuGetSectionsGetOutletMenus(sectionParams);

	const setSection = (sectionId: number) => {
		sectionParams.sectionId = sectionId;
		$sectionsQuery.refetch();
		console.log("sectionId", sectionId);
	};
</script>

{#if $query.isPending}
	<Loader />
{/if}

{#if $query.error}
	<Error message={getError($query.error).message} />
{/if}

<Select.Root>
	<Select.Trigger class="w-[180px]">
		<Select.Value placeholder="Theme" />
	</Select.Trigger>
	<Select.Content>
		<Select.Item value="light">Food</Select.Item>
		<Select.Item value="dark">Drinks</Select.Item>
		<Select.Item value="system">System</Select.Item>
	</Select.Content>
</Select.Root>

<ToggleGroup.Root type="single" value="bold">
	<ToggleGroup.Item value="bold" aria-label="Toggle bold">
		<div class="p-2">Monkey</div>
	</ToggleGroup.Item>
	<ToggleGroup.Item value="italic" aria-label="Toggle italic">
		<ItalicIcon class="h-4 w-4" />
	</ToggleGroup.Item>
	<ToggleGroup.Item value="strikethrough" aria-label="Toggle strikethrough">
		<BoldIcon class="h-4 w-4" />
	</ToggleGroup.Item>
</ToggleGroup.Root>

{#if $query.data}
	<div class="flex justify-center">
		<div class="max-w-lg w-full flex gap-2">
			<Input bind:value={searchString} />
			<Button><FilterIcon class="w-5 h-5" /> Filter</Button>
		</div>
	</div>
{/if}

{#if $sectionsQuery.data}
	<div class="flex justify-center gap-2 my-8 flex-wrap items-center">
		{#if sectionParams.sectionId > 0}
			<button
				on:click={() => {
					sectionParams.sectionId = 0;
				}}
				class="flex items-center"
			>
				<Badge variant="secondary" class="h-6"><ArrowLeft class="h-4 w-4" /></Badge>
			</button>
		{/if}
		{#each $sectionsQuery.data.sections ?? [] as section}
			<button on:click={() => setSection(section.menuSectionId)}>
				<Badge class="h-6">{section.name}</Badge>
			</button>
		{/each}
	</div>
	<div class="flex justify-center gap-2 my-8 flex-wrap">
		{#each $sectionsQuery.data.items ?? [] as item}
			<Card.Root class="p-2">
				<Card.Header>
					<Card.Title>
						{item.name}
					</Card.Title>
					<Card.Description>
						{item.description}
					</Card.Description>
				</Card.Header>
			</Card.Root>
		{/each}
	</div>
{/if}
