<script lang="ts">
	import { createTableBookingHistory, type TableBookingHistoryResponse } from "$lib/api";
	import { Input, DataTable, renderComponent, createSvelteTable } from "@kayord/ui";
	import { stringToFDate } from "$lib/util";
	import View from "./View.svelte";

	import {
		type ColumnDef,
		getCoreRowModel,
		type Updater,
		type PaginationState,
		getPaginationRowModel,
	} from "@tanstack/table-core";

	let billId = $state<number>();

	const query = $derived(createTableBookingHistory({ tableBookingId: billId ?? 0 }));
	const data = $derived($query.data ?? []);

	const columns: ColumnDef<TableBookingHistoryResponse>[] = [
		{
			accessorKey: "id",
			header: "",
			cell: (item) =>
				renderComponent(View, {
					id: Number(item.getValue()),
				}),
		},
		{
			accessorKey: "id",
			header: "Bill#",
		},
		{
			accessorKey: "bookingName",
			header: "Booking Name",
		},
		{
			header: "Table Name",
			accessorFn: ({ table }) => table.name,
		},
		{
			header: "Booking Date",
			accessorFn: ({ bookingDate }) => stringToFDate(bookingDate),
		},
		{
			header: "Close Date",
			accessorFn: ({ closeDate }) => stringToFDate(closeDate),
		},
		{
			header: "Total",
			accessorFn: ({ total }) => `R ${total.toFixed(2)}`,
		},
	];

	let pagination: PaginationState = $state({ pageIndex: 0, pageSize: 10 });
	const setPagination = (updater: Updater<PaginationState>) => {
		if (updater instanceof Function) {
			pagination = updater(pagination);
		} else pagination = updater;
	};

	const table = createSvelteTable({
		columns,
		get data() {
			return data;
		},
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		state: {
			get pagination() {
				return pagination;
			},
		},
		onPaginationChange: setPagination,
		enableRowSelection: false,
	});
</script>

<div class="m-4 flex items-center justify-between">
	<div>
		<h1>History</h1>
		<p class="text-muted-foreground">Bill history</p>
	</div>
	<div class="flex items-center gap-2">
		<div class="text-muted-foreground">#Bill</div>
		<Input type="number" placeholder="Search Bill..." bind:value={billId} min="0" />
	</div>
</div>

<DataTable {table} {columns} isLoading={$query.isPending} noDataMessage="No history available" />
