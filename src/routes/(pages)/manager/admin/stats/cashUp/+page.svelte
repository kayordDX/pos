<script lang="ts">
	import { createStatsCashUp, type StatsCashUpResponse } from "$lib/api";
	import { Card, createShadTable, DataTable, aggregationFns } from "@kayord/ui";
	import Top5SalesPeriod from "../Top5SalesPeriod.svelte";
	import { type ColumnDef } from "@tanstack/table-core";
	let salesPeriod = $state(0);

	const query = $derived(createStatsCashUp({ salesPeriodId: salesPeriod }));
	const data = $derived($query.data ?? []);

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
			footer: () => aggregationFns.sum(data, "revenue"),
		},
		{
			header: "Adjustments",
			accessorKey: "adjustments",
			size: 10,
			footer: () => aggregationFns.sum(data, "adjustments"),
		},
		{
			header: "Actual Sales",
			accessorKey: "actualSales",
			size: 10,
			footer: () => aggregationFns.sum(data, "actualSales"),
		},
		{
			header: "Tips",
			accessorKey: "tips",
			size: 10,
			footer: () => aggregationFns.sum(data, "tips"),
		},
		{
			header: "Tips %",
			accessorKey: "tipsPercentage",
			size: 10,
			footer: () => aggregationFns.mean(data, "tipsPercentage")?.toFixed(2),
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

<div class="m-2 flex flex-col items-center">
	<Card.Root>
		<Card.Header>
			<Card.Title>Cash Up</Card.Title>
			<Card.Description>Waiter Cash Up Summary</Card.Description>
			<Top5SalesPeriod bind:salesPeriod />
		</Card.Header>
		<Card.Content>
			<DataTable
				{table}
				isLoading={$query.isPending}
				noDataMessage="No Cash up Data for Sales Period"
			/>
		</Card.Content>
	</Card.Root>
</div>
