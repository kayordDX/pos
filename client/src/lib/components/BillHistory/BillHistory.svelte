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
	import { today, getLocalTimeZone, CalendarDate, parseDate } from "@internationalized/date";

	import {
		type ColumnDef,
		type ColumnFiltersState,
		type PaginationState,
		type SortingState,
		type Updater,
	} from "@tanstack/table-core";
	import { CalendarRangeIcon, FunnelIcon } from "@lucide/svelte";
	import { page } from "$app/state";
	import { onMount } from "svelte";

	interface Props {
		historyType: "waiter" | "salesPeriod" | "all" | "cashUpUser";
	}

	let { historyType }: Props = $props();

	const defaultDate = today(getLocalTimeZone()).add({ weeks: -1 });
	let dateValue = $state<{ start?: CalendarDate; end?: CalendarDate }>({ start: defaultDate });

	let pagination: PaginationState = $state({ pageIndex: 0, pageSize: 20 });
	const setPagination = (updater: Updater<PaginationState>) => {
		if (updater instanceof Function) {
			pagination = updater(pagination);
		} else pagination = updater;
	};

	let columnFilters = $state<ColumnFiltersState>([]);
	onMount(() => {
		if (columnFilters.length > 0) {
			const start = columnFilters.find((filter) => filter.id === "startDate");
			if (start) {
				dateValue.start = parseDate(start.value as string);
			}
			const end = columnFilters.find((filter) => filter.id === "endDate");
			if (end) {
				dateValue.end = parseDate(end.value as string);
			}
		}
	});

	let sorting: SortingState = $state([]);
	const setSorting = (updater: Updater<SortingState>) => {
		if (updater instanceof Function) {
			sorting = updater(sorting);
		} else sorting = updater;
	};

	const sorts = $derived(sorting.map((sort) => `${sort.desc ? "-" : ""}${sort.id}`).join(","));

	let globalFilter = $state<number>();
	const getColumnFilterValue = (id: string) => {
		const filter = columnFilters.find((filter) => filter.id === id);
		if (filter?.value == undefined) {
			if (id == "startDate") {
				return defaultDate?.toString();
			}
		}
		return filter?.value?.toString();
	};

	const query = $derived(
		historyType == "all"
			? createTableBookingHistoryAll(() => ({
					tableBookingId: globalFilter ?? 0,
					startDate: getColumnFilterValue("startDate"),
					endDate: getColumnFilterValue("endDate"),
					page: pagination.pageIndex + 1,
					sorts,
				}))
			: historyType == "salesPeriod"
				? createTableBookingPeriodHistory(
						() => status.value.salesPeriodId,
						() => ({
							tableBookingId: globalFilter ?? 0,
							page: pagination.pageIndex + 1,
							sorts,
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
								sorts,
							})
						)
					: createTableBookingHistory(() => ({
							tableBookingId: globalFilter ?? 0,
							page: pagination.pageIndex + 1,
							sorts,
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
			id: "id",
		},
		{
			accessorKey: "bookingName",
			header: "Booking Name",
		},
		{
			accessorKey: "user.name",
			header: "Waiter",
			id: "user.name",
		},
		{
			header: "Close Date",
			id: "closeDate",
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
		manualPagination: true,
		manualSorting: true,
		manualFiltering: true,
		state: {
			get pagination() {
				return pagination;
			},
			get sorting() {
				return sorting;
			},
			get globalFilter() {
				return globalFilter;
			},
			get columnFilters() {
				return columnFilters;
			},
		},
		get rowCount() {
			return rowCount;
		},
		onPaginationChange: setPagination,
		onSortingChange: setSorting,
		onGlobalFilterChange: (updater) => {
			globalFilter = Number(updater ?? 0);
		},
		onColumnFiltersChange: (updater) => {
			if (typeof updater === "function") {
				columnFilters = updater(columnFilters);
			} else {
				columnFilters = updater;
			}
		},
	});

	let filterOpen = $state(false);
	const filter = () => {
		const filterState: Array<{ id: string; value: string }> = [];
		if (dateValue.start) {
			filterState.push({
				id: "startDate",
				value: dateValue.start.toString(),
			});
		}
		if (dateValue.end) {
			filterState.push({
				id: "endDate",
				value: dateValue.end.toString(),
			});
		}
		columnFilters = filterState;
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
							<RangeCalendar bind:value={dateValue} minDays={1} />
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
