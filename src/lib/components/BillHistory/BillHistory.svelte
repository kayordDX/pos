<script lang="ts">
	import {
		createTableBookingHistory,
		createTableBookingPeriodHistory,
		createTableBookingHistoryAll,
		type TableBookingHistoryResponse,
		createTableBookingHistoryUser,
	} from "$lib/api";
	import { Button, Input, Popover } from "@kayord/ui";
	import { RangeCalendar } from "@kayord/ui/calendar";
	import { DataTable, createShadTable, renderComponent } from "@kayord/ui/data-table";
	import { stringToFDate } from "$lib/util";
	import View from "./View.svelte";
	import { status } from "$lib/stores/status.svelte";
	import { today, getLocalTimeZone, CalendarDate } from "@internationalized/date";

	import { type ColumnDef, type PaginationState, type Updater } from "@tanstack/table-core";
	import { CalendarRangeIcon, FunnelIcon } from "@lucide/svelte";
	import { page } from "$app/state";

	interface Props {
		historyType: "waiter" | "salesPeriod" | "all" | "cashUpUser";
	}

	let { historyType }: Props = $props();

	let dateValue = $state<{ start?: CalendarDate; end?: CalendarDate }>({
		start: today(getLocalTimeZone()),
		end: today(getLocalTimeZone()).add({ weeks: 1 }),
	});

	let dateValueCurrent = $state<{ start?: CalendarDate; end?: CalendarDate }>({
		start: today(getLocalTimeZone()),
		end: today(getLocalTimeZone()).add({ weeks: 1 }),
	});

	let pagination: PaginationState = $state({ pageIndex: 0, pageSize: 10 });
	const setPagination = (updater: Updater<PaginationState>) => {
		if (updater instanceof Function) {
			pagination = updater(pagination);
		} else pagination = updater;
	};

	let globalFilter = $state<number>();

	const query = $derived(
		historyType == "all"
			? createTableBookingHistoryAll(() => ({
					tableBookingId: globalFilter ?? 0,
					startDate: dateValueCurrent.start?.toString(),
					endDate: dateValueCurrent.end?.toString(),
					page: pagination.pageIndex + 1,
					pageSize: pagination.pageSize,
				}))
			: historyType == "salesPeriod"
				? createTableBookingPeriodHistory(
						() => status.value.salesPeriodId,
						() => ({
							tableBookingId: globalFilter ?? 0,
							page: pagination.pageIndex + 1,
							pageSize: pagination.pageSize,
						})
					)
				: historyType == "cashUpUser"
					? createTableBookingHistoryUser(
							() => page.params.userId ?? "",
							() => ({
								tableBookingId: globalFilter ?? 0,
								cashUpUserId: Number(page.params.cashUpUserId ?? 0),
								outletId: status.value.outletId,
								page: pagination.pageIndex + 1,
								pageSize: pagination.pageSize,
							})
						)
					: createTableBookingHistory(() => ({
							tableBookingId: globalFilter ?? 0,
							page: pagination.pageIndex + 1,
							pageSize: pagination.pageSize,
						}))
	);

	let data = $derived(query.data?.items ?? []);
	let rowCount = $derived(query.data?.totalCount ?? 0);

	const columns: ColumnDef<TableBookingHistoryResponse>[] = [
		{
			accessorKey: "id",
			enableSorting: false,
			header: "",
			cell: (item) =>
				renderComponent(View, {
					id: Number(item.getValue()),
				}),
		},
		{
			accessorFn: (d) => d.id,
			accessorKey: "bill#",
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

	const table = createShadTable({
		columns,
		get data() {
			return data;
		},
		useURLSearchParams: true,
		manualFiltering: true,
		manualPagination: true,
		state: {
			get pagination() {
				return pagination;
			},
		},
		get rowCount() {
			return rowCount;
		},
		onPaginationChange: setPagination,
	});

	let filterOpen = $state(false);
	const filter = () => {
		dateValueCurrent = dateValue;
		filterOpen = false;
	};

	$effect(() => {
		if (table.getState().globalFilter !== globalFilter) table.setGlobalFilter(globalFilter);
	});
</script>

{#snippet header()}
	<div class="flex justify-between w-full">
		<div class="sm:flex flex-col mb-2 w-full hidden">
			<h1 class="flex font-bold text-lg">History</h1>

			{#if historyType == "all"}
				<h2 class="flex text-muted-foreground text-xs">Bill history all</h2>
			{:else if historyType == "waiter"}
				<h2 class="flex text-muted-foreground text-xs">Bill history</h2>
			{:else if historyType == "cashUpUser"}
				<h2 class="flex text-muted-foreground text-xs">Bill history user</h2>
			{:else}
				<h2 class="flex text-muted-foreground text-xs">Sales period Bill history all users</h2>
			{/if}
		</div>
		<div class="flex items-center gap-2">
			{#if historyType == "all"}
				<div class="flex items-center gap-2">
					<Popover.Root bind:open={filterOpen}>
						<Popover.Trigger>
							<Button variant="secondary" size="icon"><CalendarRangeIcon /></Button>
						</Popover.Trigger>
						<Popover.Content class="w-auto overflow-hidden p-0" align="center">
							<RangeCalendar bind:value={dateValue} />
							<div class="p-2 flex justify-between">
								<Button class="w-full" onclick={filter}><FunnelIcon /> Filter</Button>
							</div>
						</Popover.Content>
					</Popover.Root>
				</div>
			{/if}
			<div class="flex items-center gap-2">
				<div class="text-muted-foreground">#Bill</div>
				<Input type="number" placeholder="Search Bill..." bind:value={globalFilter} min="0" />
			</div>
		</div>
	</div>
{/snippet}

<div class="m-2">
	<DataTable
		{table}
		{header}
		isLoading={query.isPending}
		headerClass="pb-2"
		noDataMessage="No history available"
	/>
</div>
