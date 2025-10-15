<script lang="ts">
	import { createStatsCashUp, type StatsCashUpResponse } from "$lib/api";
	import { DataTable, createShadTable, aggregationFns } from "@kayord/ui/data-table";
	import Top5SalesPeriod from "../Top5SalesPeriod.svelte";
	import { type ColumnDef } from "@tanstack/table-core";
	import GrafanaLink from "../GrafanaLink.svelte";
	let salesPeriod = $state(0);

	const query = $derived(createStatsCashUp({ salesPeriodId: salesPeriod }));
	const data = $derived(query.data ?? []);

	const columns: ColumnDef<StatsCashUpResponse>[] = [
		{
			header: "Name",
			accessorKey: "name",
			size: 100000,
		},
		{
			header: "Revenue",
			accessorKey: "revenue",
			size: 10,
			footer: () => aggregationFns.sum(data, "revenue").toFixed(2),
		},
		{
			header: "Adjustments",
			accessorKey: "adjustments",
			size: 10,
			footer: () => aggregationFns.sum(data, "adjustments").toFixed(2),
		},
		{
			header: "Actual Sales",
			accessorKey: "actualSales",
			size: 10,
			footer: () => aggregationFns.sum(data, "actualSales").toFixed(2),
		},
		{
			header: "Tips",
			accessorKey: "tips",
			size: 10,
			footer: () => aggregationFns.sum(data, "tips").toFixed(2),
		},
		{
			header: "Tips %",
			accessorKey: "tipsPercentage",
			size: 10,
			footer: () => aggregationFns.mean(data, "tipsPercentage")?.toFixed(2),
		},
		{
			header: "Payments",
			accessorKey: "payments",
			size: 10,
			footer: () => aggregationFns.sum(data, "payments").toFixed(2),
		},
	];

	const table = createShadTable({
		columns,
		get data() {
			return data;
		},
		enableRowSelection: false,
		enablePaging: false,
	});
</script>

{#snippet header()}
	<div class="flex justify-between w-full">
		<div class="sm:flex flex-col mb-2 w-full hidden">
			<h1 class="flex font-bold text-lg">Cash Up</h1>
			<h2 class="flex text-muted-foreground text-xs">Waiter Cash Up Summary</h2>
		</div>
		<div class="flex items-center gap-2 w-full justify-end">
			<p class="text-muted-foreground text-sm">Sales Period</p>
			<Top5SalesPeriod bind:salesPeriod />
		</div>
	</div>
{/snippet}

<div class="m-2 flex flex-col gap-2 items-center">
	<DataTable
		{table}
		{header}
		isLoading={query.isPending}
		noDataMessage="No Cash up Data for Sales Period"
	/>
	<GrafanaLink />
</div>
