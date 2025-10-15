<script lang="ts">
	import { createExtraGroup, type DTOExtraGroupAdminDTO } from "$lib/api";
	import {
		Button,
		DataTable,
		renderComponent,
		renderSnippet,
		createShadTable,
		Tooltip,
		decodeGlobalFilter,
	} from "@kayord/ui";
	import Actions from "./Actions.svelte";
	import { PlusIcon } from "@lucide/svelte";
	import EditExtraGroup from "./EditExtraGroup.svelte";
	import { type ColumnDef } from "@tanstack/table-core";
	import Search from "$lib/components/Search.svelte";

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
					refetch: query.refetch,
				}),
			size: 10,
			enableSorting: false,
		},
	];

	let data = $derived(query.data ?? []);
	let search = $state(decodeGlobalFilter() ?? "");

	const table = createShadTable({
		columns,
		get data() {
			return data;
		},
		enableRowSelection: false,
		useURLSearchParams: true,
		state: {
			get globalFilter() {
				return search;
			},
		},
	});
</script>

{#snippet header()}
	<div class="flex items-center justify-between">
		<div class="flex flex-col gap-1">
			<h1>Extra Groups</h1>
			<div class="flex gap-2 items-center">
				<Search bind:search name="Extra Groups" />
			</div>
		</div>
		<Button onclick={() => (addOpen = true)}>
			<PlusIcon class="h-5 w-5" /> Add
		</Button>
		<EditExtraGroup refetch={query.refetch} bind:open={addOpen} />
	</div>
{/snippet}

<div class="m-2">
	<DataTable
		headerClass="pb-2"
		{header}
		{table}
		isLoading={query.isPending}
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
