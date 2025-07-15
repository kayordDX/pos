<script lang="ts">
	import { scaleBand } from "d3-scale";
	import { Highlight, LineChart } from "layerchart";
	import { Chart, Card } from "@kayord/ui";
	import { curveNatural } from "d3-shape";

	const chartData = [
		{ payment: "Account", amount: 1600, average: 1600 },
		{ payment: "Cash", amount: 4622.0, average: 5157 },
		{ payment: "Credit Card", amount: 9392, average: 339 },
		{ payment: "Halo", amount: 41454, average: 311 },
	];
	const chartConfig = {
		amount: { label: "Amount", color: "var(--chart-1)" },
		average: { label: "Average", color: "var(--chart-3)" },
	} satisfies Chart.ChartConfig;
</script>

<div class="m-2 flex flex-col items-center">
	<Card.Root class="w-xl">
		<Card.Header>
			<Card.Title>Payment Types</Card.Title>
			<Card.Description
				>Sales Period Payment Type vs Average of last 5 Sales Periods</Card.Description
			>
		</Card.Header>
		<Card.Content>
			<Chart.Container config={chartConfig}>
				<LineChart
					data={chartData}
					x="payment"
					xScale={scaleBand()}
					legend
					series={[
						{
							key: "amount",
							label: "Amount",
							color: chartConfig.amount.color,
						},
						{
							key: "average",
							label: "Average",
							color: chartConfig.average.color,
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
