<script lang="ts">
	import { scaleBand } from "d3-scale";
	import { Highlight, LineChart } from "layerchart";
	import { Chart, Card, Select } from "@kayord/ui";
	import { curveNatural } from "d3-shape";
	import { createStatsPaymentTypes, createStatsTopSalesPeriod } from "$lib/api";

	const salesPeriodQuery = createStatsTopSalesPeriod({ top: 5 });
	const salesPeriods = $derived($salesPeriodQuery.data ?? []);

	$effect(() => {
		if (salesPeriods.length > 0 && selectedSalesPeriod == 0) {
			console.log("setting the thing", salesPeriods[0], salesPeriods[0]!.id.toString());
			selectedSalesPeriod = salesPeriods[0]?.id ?? 0;
		}
	});

	let selectedSalesPeriod = $state(0);

	const chartQuery = $derived(
		createStatsPaymentTypes({ salesPeriodId: selectedSalesPeriod, top: 5 })
	);
	const chartData = $derived($chartQuery.data ?? []);

	const chartConfig = {
		amount: { label: "Amount", color: "var(--chart-1)" },
		averageAmount: { label: "Average", color: "var(--chart-3)" },
	} satisfies Chart.ChartConfig;

	const triggerContent = $derived(
		salesPeriods.find((f) => f.id === selectedSalesPeriod)?.name ?? "Select Sales Period"
	);
</script>

<div class="m-2 flex flex-col items-center">
	<Card.Root class="w-xl">
		<Card.Header>
			<Card.Title>Payment Types</Card.Title>
			<Card.Description
				>Sales Period Payment Type vs Average of last 5 Sales Periods</Card.Description
			>
			<Select.Root
				type="single"
				name="salesPeriod"
				bind:value={() => selectedSalesPeriod.toString(), (v) => (selectedSalesPeriod = Number(v))}
			>
				<Select.Trigger class="w-[180px]">
					{triggerContent}
				</Select.Trigger>
				<Select.Content>
					<Select.Group>
						<Select.Label>Sales Period</Select.Label>
						{#each salesPeriods as salesPeriod (salesPeriod.id)}
							<Select.Item
								value={salesPeriod.id.toString()}
								label={salesPeriod.name ?? salesPeriod.startDate ?? salesPeriod.id.toString()}
							>
								{salesPeriod.name ?? salesPeriod.startDate ?? salesPeriod.id}
							</Select.Item>
						{/each}
					</Select.Group>
				</Select.Content>
			</Select.Root>
		</Card.Header>
		<Card.Content>
			<Chart.Container config={chartConfig}>
				<LineChart
					data={chartData}
					x="paymentType"
					xScale={scaleBand()}
					legend
					series={[
						{
							key: "amount",
							label: "Amount",
							color: chartConfig.amount.color,
						},
						{
							key: "averageAmount",
							label: "Average Amount",
							color: chartConfig.averageAmount.color,
							props: {
								"stroke-dasharray": "6,4",
								strokeWidth: 1,
							},
						},
					]}
					props={{
						spline: { curve: curveNatural, motion: "tween", strokeWidth: 3 },
						yAxis: {
							placement: "radius",
						},
					}}
				>
					{#snippet belowMarks()}
						<Highlight area={{ class: "fill-muted" }} />
					{/snippet}
					{#snippet tooltip()}
						<Chart.Tooltip hideLabel />
					{/snippet}
				</LineChart>
			</Chart.Container>
		</Card.Content>
	</Card.Root>
</div>
