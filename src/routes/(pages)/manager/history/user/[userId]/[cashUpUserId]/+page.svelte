<script lang="ts">
	import { createTableBookingHistoryUser, type TableBookingHistoryResponse } from "$lib/api";
	import { DataTable, Input } from "@kayord/ui";
	import { stringToFDate } from "$lib/util";
	import View from "./View.svelte";
	import { page } from "$app/stores";
	import {
		type ColumnDef,
		createTable,
		getCoreRowModel,
		type Updater,
		type PaginationState,
		getPaginationRowModel,
		renderComponent,
	} from "@tanstack/svelte-table";
	import { status } from "$lib/stores/status.svelte";

	let billId = $state<number>();

	let query = createTableBookingHistoryUser($page.params.userId ?? "", {
		tableBookingId: 0,
		cashUpUserId: 0,
		outletId: status.value.outletId,
	});
	let data = $state<TableBookingHistoryResponse[]>([]);

	$effect(() => {
		query = createTableBookingHistoryUser($page.params.userId ?? "", {
			tableBookingId: billId ?? 0,
			cashUpUserId: Number($page.params.cashUpUserId ?? 0),
			outletId: status.value.outletId,
		});
		data = $query.data ?? [];
	});

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

	const table = createTable({
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
		<p class="text-muted-foreground">Sales period Bill history</p>
	</div>
	<div class="flex items-center gap-2">
		<div class="text-muted-foreground">#Bill</div>
		<Input type="number" placeholder="Search Bill..." bind:value={billId} min="0" />
	</div>
</div>

<DataTable {table} {columns} isLoading={$query.isPending} noDataMessage="No history available" />
