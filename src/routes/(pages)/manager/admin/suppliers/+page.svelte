<script lang="ts">
	import { createSupplierGetAll, type DTOSupplierDTO } from "$lib/api";
	import { status } from "$lib/stores/status.svelte";
	import { Button, createShadTable, DataTable, renderComponent } from "@kayord/ui";
	import type { ColumnDef } from "@tanstack/table-core";
	import AddSupplier from "./AddSupplier.svelte";
	import { PlusIcon } from "lucide-svelte";
	import Actions from "./Actions.svelte";

	const query = createSupplierGetAll({ outletId: status.value.outletId });

	const columns: ColumnDef<DTOSupplierDTO>[] = [
		{
			header: "Name",
			accessorKey: "name",
			size: 1000,
		},
		{
			header: "Contact Name",
			accessorKey: "contactName",
			size: 1000,
		},
		{
			header: "Contact Number",
			accessorKey: "contactNumber",
			size: 1000,
		},
		{
			header: "Email",
			accessorKey: "email",
			size: 1000,
		},
		{
			header: "",
			accessorKey: "id",
			cell: (item) =>
				renderComponent(Actions, {
					supplier: item.row.original,
					refetch: $query.refetch,
				}),
			size: 10,
			enableSorting: false,
		},
	];

	const table = createShadTable({
		columns,
		get data() {
			return $query.data ?? [];
		},
		enableRowSelection: false,
		enablePaging: false,
	});

	let isOpen = $state(false);
</script>

<AddSupplier bind:isOpen refetch={$query.refetch} />

{#snippet header()}
	<div class="flex gap-2 justify-between items-center">
		<div class="">
			<h2>Suppliers</h2>
		</div>
		<div class="flex gap-2 items-center">
			<Button size="sm" onclick={() => (isOpen = true)}>
				<PlusIcon class="h-5 w-5" /> Add
			</Button>
		</div>
	</div>
{/snippet}

<div class="m-2">
	<DataTable
		{table}
		{header}
		{columns}
		headerClass="pb-2"
		isLoading={$query.isPending}
		noDataMessage="No suppliers"
	/>
</div>
