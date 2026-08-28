<script lang="ts">
	import { createMenuList, type EntitiesMenu } from "$lib/api";
	import { status } from "$lib/stores/status.svelte";
	import { Button } from "@kayord/ui";
	import {
		DataTable,
		createShadTable,
		renderComponent,
		decodeGlobalFilter,
	} from "@kayord/ui/data-table";
	import { PlusIcon } from "@lucide/svelte";
	import Actions from "./Actions.svelte";
	import EditMenu from "./EditMenu.svelte";
	import type { ColumnDef } from "@tanstack/table-core";
	import Search from "$lib/components/Search.svelte";

	const query = createMenuList(() => ({ outletId: status.value.outletId }));
	let addOpen = $state(false);

	const columns: ColumnDef<EntitiesMenu>[] = [
		{
			header: "Menu",
			accessorKey: "name",
			size: 10000,
		},
		{
			header: "",
			enableSorting: false,
			accessorKey: "id",
			cell: (row) =>
				renderComponent(Actions, {
					menu: row.row.original,
					refetch: query.refetch,
				}),
			size: 10,
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
			<h1>Menus</h1>
			<div class="flex gap-2 items-center">
				<Search bind:search name="Menus" />
			</div>
		</div>

		<Button onclick={() => (addOpen = true)}>
			<PlusIcon class="h-5 w-5" /> Add
		</Button>
		<EditMenu refetch={query.refetch} bind:open={addOpen} />
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
