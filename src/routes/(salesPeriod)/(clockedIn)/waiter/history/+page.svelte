<script lang="ts">
	import { createTableBookingHistory } from "$lib/api";
	import { DataTable } from "@kayord/ui";
	import { createRender, createTable } from "svelte-headless-table";
	import { addPagination, addResizedColumns } from "svelte-headless-table/plugins";
	import { writable } from "svelte/store";
	import { stringToFDate } from "$lib/util";
	import View from "./View.svelte";

	const query = createTableBookingHistory();
	const data = writable($query.data ?? []);

	$effect(() => {
		data.set($query.data ?? []);
	});

	const table = createTable(data, {
		page: addPagination({ serverSide: false, initialPageSize: 10 }),
		resize: addResizedColumns(),
	});
	const columns = table.createColumns([
		table.column({
			header: "",
			accessor: ({ id }) => id,
			cell: (item) => {
				return createRender(View, {
					id: item.value,
				});
			},
			plugins: {
				resize: {
					initialWidth: 100,
				},
			},
		}),
		table.column({
			header: "Booking Name",
			accessor: "bookingName",
		}),
		table.column({
			header: "Table Name",
			accessor: ({ table }) => table.name,
		}),
		table.column({
			header: "Booking Date",
			accessor: ({ bookingDate }) => stringToFDate(bookingDate),
		}),
		table.column({
			header: "Close Date",
			accessor: ({ closeDate }) => stringToFDate(closeDate),
		}),
		table.column({
			header: "Total",
			accessor: ({ total }) => `R ${total.toFixed(2)}`,
		}),
	]);

	const tableViewModel = table.createViewModel(columns);
</script>

<div class="m-4">
	<h1>History</h1>
	<p class="text-muted-foreground">Bill history</p>
</div>

<DataTable
	title="Bill History"
	isLoading={$query.isPending}
	{tableViewModel}
	noDataMessage="No history available"
></DataTable>
