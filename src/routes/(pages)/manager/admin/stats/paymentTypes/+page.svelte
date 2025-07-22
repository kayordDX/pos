<script lang="ts">
	import { scaleBand } from "d3-scale";
	import { Area, BarChart, PieChart, type ChartContextValue } from "layerchart";
	import { Chart, Card } from "@kayord/ui";
	import { curveNatural } from "d3-shape";
	import { createStatsPaymentTypes } from "$lib/api";
	import Top5SalesPeriod from "../Top5SalesPeriod.svelte";
	import { cubicInOut } from "svelte/easing";
	import GrafanaLink from "../GrafanaLink.svelte";
	import { Tween } from "svelte/motion";

	let salesPeriod = $state(0);

	const tww = new Tween(0);

	const chartQuery = $derived(createStatsPaymentTypes({ salesPeriodId: salesPeriod, top: 5 }));
	const getColorFromIndex = (i: number) => {
		return `var(--chart-${i + 1})`;
	};
	const chartData = $derived(
		$chartQuery.data?.map((x, i) => {
			return { ...x, color: getColorFromIndex(i) };
		}) ?? []
	);

	const chartConfig = {
		paymentType: { label: "PaymentType" },
		amount: { label: "Amount", color: "var(--chart-1)" },
		averageAmount: { label: "Average", color: "var(--chart-3)" },
	} satisfies Chart.ChartConfig;

	let context = $state<ChartContextValue>();
</script>

<div class="m-2 flex flex-col items-center gap-2">
	<div class="flex justify-between w-full">
		<div class="sm:flex flex-col mb-2 w-full hidden">
			<h1 class="flex font-bold text-lg">Payment Types</h1>
			<h2 class="flex text-muted-foreground text-xs">
				Sales Period Payment Type vs Average of last 5 Sales Periods
			</h2>
		</div>
		<div class="flex items-center gap-2 w-full justify-end">
			<p class="text-muted-foreground text-sm">Sales Period</p>
			<Top5SalesPeriod bind:salesPeriod />
		</div>
	</div>

	<div class="m-2 flex items-center flex-wrap justify-center gap-4 w-full mt-8">
		<Card.Root class="w-xl">
			<Card.Header>
				<Card.Title>Payment Types</Card.Title>
				<Card.Description
					>Sales Period Payment Type vs Average of last 5 Sales Periods</Card.Description
				>
			</Card.Header>
			<Card.Content>
				<Chart.Container config={chartConfig}>
					<BarChart
						bind:context
						data={chartData}
						xScale={scaleBand().padding(0.25)}
						x="paymentType"
						axis="x"
						c="color"
						cRange={[
							"var(--chart-1)",
							"var(--chart-2)",
							"var(--chart-3)",
							"var(--chart-4)",
							"var(--chart-5)",
						]}
						series={[
							{
								key: "amount",
								label: "Amount",
							},
							{
								key: "averageAmount",
								label: "Average Amount",
							},
						]}
						props={{
							bars: {
								stroke: "none",
								rounded: "all",
								radius: 8,
								// use the height of the chart to animate the bars
								initialY: context?.height,
								initialHeight: 0,
								motion: {
									x: { type: "tween", duration: 500, easing: cubicInOut },
									width: { type: "tween", duration: 500, easing: cubicInOut },
									height: { type: "tween", duration: 500, easing: cubicInOut },
									y: { type: "tween", duration: 500, easing: cubicInOut },
								},
							},
							highlight: { area: { fill: "none" } },
							yAxis: {
								placement: "radius",
							},
						}}
					>
						{#snippet aboveMarks()}
							<Area
								y1="averageAmount"
								class="stroke-warning/20"
								line={{
									class: "stroke-warning",
									"stroke-dasharray": "2,2",
									strokeWidth: 2,
								}}
								curve={curveNatural}
							/>
						{/snippet}

						{#snippet tooltip()}
							<Chart.Tooltip hideLabel hideIndicator />
						{/snippet}
					</BarChart>
				</Chart.Container>
			</Card.Content>
		</Card.Root>
		<Card.Root class="w-xl">
			<Card.Header>
				<Card.Title>Payment Types</Card.Title>
				<Card.Description>Payment Type Overview</Card.Description>
			</Card.Header>
			<Card.Content>
				<Chart.Container config={chartConfig}>
					<PieChart
						data={chartData}
						key="paymentType"
						value="amount"
						innerRadius={60}
						padding={29}
						c="color"
						cRange={[
							"var(--chart-1)",
							"var(--chart-2)",
							"var(--chart-3)",
							"var(--chart-4)",
							"var(--chart-5)",
						]}
						cornerRadius={5}
						padAngle={0.02}
						props={{
							pie: {
								motion: {
									type: "tween",
								},
							},
						}}
						legend
					>
						{#snippet tooltip()}
							<Chart.Tooltip />
						{/snippet}
					</PieChart>
				</Chart.Container>
			</Card.Content>
		</Card.Root>
	</div>
	<GrafanaLink />
</div>
