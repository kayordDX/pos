<script lang="ts">
	import { createTableBookingPeriodHistory } from "$lib/api";
	import { DataTable, Input } from "@kayord/ui";
	import { createRender, createTable } from "svelte-headless-table";
	import { addPagination, addResizedColumns } from "svelte-headless-table/plugins";
	import { writable } from "svelte/store";
	import { stringToFDate } from "$lib/util";
	import View from "./user/[userId]/View.svelte";
	import { page } from "$app/stores";
	import { status } from "$lib/stores/status";

	let billId = $state<number>();

	let query = createTableBookingPeriodHistory($status.salesPeriodId, { tableBookingId: 0 });
	const data = writable($query.data ?? []);

	$effect(() => {
		query = createTableBookingPeriodHistory($status.salesPeriodId, {
			tableBookingId: billId ?? 0,
		});
		data.set($query.data ?? []);
	});

	const getTableViewModel = () => {
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
				header: "Bill#",
				accessor: "id",
			}),
			table.column({
				header: "Waiter",
				accessor: ({ user }) => user.name,
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
		return tableViewModel;
	};

	const tableViewModel = $derived.by(() => getTableViewModel());
</script>

<div class="m-4 flex items-center justify-between">
	<div>
		<h1>History</h1>
		<p class="text-muted-foreground">Sales period Bill history all users</p>
	</div>
	<div class="flex items-center gap-2">
		<div class="text-muted-foreground">#Bill</div>
		<Input type="number" placeholder="Search Bill..." bind:value={billId} min="0" />
	</div>
</div>

<DataTable
	title="Bill History"
	isLoading={$query.isPending}
	{tableViewModel}
	noDataMessage="No history available"
></DataTable>
