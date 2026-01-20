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

	import {
		type ColumnDef,
		getCoreRowModel,
		type Updater,
		type PaginationState,
		getPaginationRowModel,
	} from "@tanstack/table-core";
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

	let billId = $state<number>();

	const query = $derived(
		historyType == "all"
			? createTableBookingHistoryAll(() => ({
					tableBookingId: billId ?? 0,
					startDate: dateValueCurrent.start?.toString(),
					endDate: dateValueCurrent.end?.toString(),
				}))
			: historyType == "salesPeriod"
				? createTableBookingPeriodHistory(
						() => status.value.salesPeriodId,
						() => ({ tableBookingId: billId ?? 0 })
					)
				: historyType == "cashUpUser"
					? createTableBookingHistoryUser(
							() => page.params.userId ?? "",
							() => ({
								tableBookingId: billId ?? 0,
								cashUpUserId: Number(page.params.cashUpUserId ?? 0),
								outletId: status.value.outletId,
							})
						)
					: createTableBookingHistory(() => ({ tableBookingId: billId ?? 0 }))
	);

	let data = $derived(query.data ?? []);

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

	const table = createShadTable({
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
		useURLSearchParams: true,
		onPaginationChange: setPagination,
		enableRowSelection: false,
	});

	let filterOpen = $state(false);
	const filter = () => {
		dateValueCurrent = dateValue;
		filterOpen = false;
	};
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
				<Input type="number" placeholder="Search Bill..." bind:value={billId} min="0" />
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
