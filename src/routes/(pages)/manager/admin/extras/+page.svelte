<script lang="ts">
	import { createExtraGroup, type DTOExtraGroupAdminDTO } from "$lib/api";
	import {
		Button,
		DataTable,
		renderComponent,
		renderSnippet,
		ShadTable,
		Tooltip,
	} from "@kayord/ui";
	import Actions from "./Actions.svelte";
	import { PlusIcon } from "@lucide/svelte";
	import EditExtraGroup from "./EditExtraGroup.svelte";
	import type { ColumnDef } from "@tanstack/table-core";

	const query = createExtraGroup();
	let addOpen = $state(false);

	const columns: ColumnDef<DTOExtraGroupAdminDTO>[] = [
		{
			header: "Name",
			accessorKey: "name",
			size: 10000,
			cell: (item) => renderSnippet(extraGroup, item.row.original),
		},
		{
			header: "",
			accessorKey: "extraGroupId",
			cell: (item) =>
				renderComponent(Actions, {
					extraGroup: item.row.original,
					refetch: $query.refetch,
				}),
			size: 10,
			enableSorting: false,
		},
	];

	let data = $derived($query.data ?? []);

	let tableState = $state(
		new ShadTable({
			columns,
			get data() {
				return data;
			},
			enableRowSelection: false,
		})
	);
</script>

{#snippet header()}
	<div class="flex items-center justify-between">
		<h1>Extra Groups</h1>
		<Button onclick={() => (addOpen = true)}>
			<PlusIcon class="h-5 w-5" /> Add
		</Button>
		<EditExtraGroup refetch={$query.refetch} bind:open={addOpen} />
	</div>
{/snippet}

<div class="m-2">
	<DataTable
		headerClass="pb-2"
		{header}
		bind:tableState
		isLoading={$query.isPending}
		noDataMessage="No roles for outlet"
	/>
</div>

{#snippet extraGroup(extraGroup: DTOExtraGroupAdminDTO)}
	<Tooltip.Provider>
		<Tooltip.Root>
			<Tooltip.Trigger>
				<div
					class={`size-3 ${extraGroup.isGlobal ? "bg-primary animate-pulse" : "bg-secondary"} rounded-full`}
				></div>
			</Tooltip.Trigger>
			<Tooltip.Content>
				<p class="font-bold">Global Extra Group</p>
				{#if extraGroup.isGlobal}
					<p>Group is available to search on all menu items</p>
				{:else}
					<p>Group only available to specific menu items</p>
				{/if}
			</Tooltip.Content>
		</Tooltip.Root>
	</Tooltip.Provider>
	{extraGroup.name}
{/snippet}
