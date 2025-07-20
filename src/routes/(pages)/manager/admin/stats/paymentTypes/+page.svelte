<script lang="ts">
	import { scaleBand } from "d3-scale";
	import { Highlight, LineChart } from "layerchart";
	import { Chart, Card, Select } from "@kayord/ui";
	import { curveNatural } from "d3-shape";
	import { createStatsPaymentTypes } from "$lib/api";
	import Top5SalesPeriod from "../Top5SalesPeriod.svelte";

	let salesPeriod = $state(0);

	const chartQuery = $derived(createStatsPaymentTypes({ salesPeriodId: salesPeriod, top: 5 }));
	const chartData = $derived($chartQuery.data ?? []);

	const chartConfig = {
		amount: { label: "Amount", color: "var(--chart-1)" },
		averageAmount: { label: "Average", color: "var(--chart-3)" },
	} satisfies Chart.ChartConfig;
</script>

<div class="m-2 flex flex-col items-center">
	<Card.Root class="w-xl">
		<Card.Header>
			<Card.Title>Payment Types</Card.Title>
			<Card.Description
				>Sales Period Payment Type vs Average of last 5 Sales Periods</Card.Description
			>
			<Top5SalesPeriod bind:salesPeriod />
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
