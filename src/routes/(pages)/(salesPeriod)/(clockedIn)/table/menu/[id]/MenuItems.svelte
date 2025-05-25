<script lang="ts">
	import { createMenuGetItemGetMenuItems, type DTOMenuItemDTOBasic } from "$lib/api";
	import Error from "$lib/components/Error.svelte";
	import { Dialog, Loader } from "@kayord/ui";
	import MenuItem from "./MenuItem.svelte";
	import AddMenuItem from "./AddMenuItem.svelte";
	import { getError } from "$lib/types";

	interface Props {
		data: DTOMenuItemDTOBasic[];
		tableBookingId: number;
	}
	let { data, tableBookingId }: Props = $props();

	let menuItemId = $state(0);
	let divisionId = $state(0);
	let open = $state(false);

	const query = $derived(
		createMenuGetItemGetMenuItems(
			{ menuItemId: menuItemId, divisionId: divisionId },
			{ query: { enabled: open } }
		)
	);
</script>

<Dialog.Root bind:open>
	<!-- fixed bottom-0 left-0 right-0 flex max-h-[96%] w-full -->
	<Dialog.Content class="max-h-[96%] overflow-auto">
		<!-- mx-auto flex w-full flex-col overflow-auto rounded-t-[10px] p-4 -->
		<div class="mx-auto flex w-full flex-col overflow-auto rounded-t-[10px] p-4">
			{#if $query.isPending}
				<Loader />
			{/if}
			{#if $query.error}
				<Error message={getError($query.error).message} />
			{/if}
			{#if $query.data}
				<AddMenuItem data={$query.data} {tableBookingId} bind:open />
			{/if}
		</div>
	</Dialog.Content>
</Dialog.Root>

<div class="flex justify-center gap-2 my-2 flex-wrap p-2 w-full">
	{#each data as item, i (item.menuItemId)}
		<MenuItem menuItem={item} bind:open bind:menuItemId bind:divisionId />
	{/each}
</div>
