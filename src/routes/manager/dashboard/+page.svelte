<script lang="ts">
	import {
		Axis,
		Bars,
		Chart,
		Svg,
		Tooltip,
		TooltipItem,
		Highlight,
		Spline,
		Pie,
		Area,
	} from "layerchart";
	import { scalePoint, scaleOrdinal } from "d3-scale";
	import { curveBumpX } from "d3-shape";
	import { Card } from "@kayord/ui";
	import { stringToFDate } from "$lib/util";

	const data = [
		{
			date: "2024-07-28T22:00:00.000Z",
			value: 57,
		},
		{
			date: "2024-07-29T22:00:00.000Z",
			value: 85,
		},
		{
			date: "2024-07-30T22:00:00.000Z",
			value: 83,
		},
		{
			date: "2024-07-31T22:00:00.000Z",
			value: 81,
		},
		{
			date: "2024-08-01T22:00:00.000Z",
			value: 68,
		},
		{
			date: "2024-08-02T22:00:00.000Z",
			value: 56,
		},
		{
			date: "2024-08-03T22:00:00.000Z",
			value: 65,
		},
		{
			date: "2024-08-04T22:00:00.000Z",
			value: 56,
		},
		{
			date: "2024-08-05T22:00:00.000Z",
			value: 52,
		},
		{
			date: "2024-08-06T22:00:00.000Z",
			value: 100,
		},
		{
			date: "2024-08-07T22:00:00.000Z",
			value: 72,
		},
		{
			date: "2024-08-08T22:00:00.000Z",
			value: 53,
		},
		{
			date: "2024-08-09T22:00:00.000Z",
			value: 95,
		},
		{
			date: "2024-08-10T22:00:00.000Z",
			value: 76,
		},
		{
			date: "2024-08-11T22:00:00.000Z",
			value: 97,
		},
		{
			date: "2024-08-12T22:00:00.000Z",
			value: 93,
		},
		{
			date: "2024-08-13T22:00:00.000Z",
			value: 78,
		},
		{
			date: "2024-08-14T22:00:00.000Z",
			value: 61,
		},
		{
			date: "2024-08-15T22:00:00.000Z",
			value: 75,
		},
		{
			date: "2024-08-16T22:00:00.000Z",
			value: 67,
		},
		{
			date: "2024-08-17T22:00:00.000Z",
			value: 59,
		},
		{
			date: "2024-08-18T22:00:00.000Z",
			value: 76,
		},
		{
			date: "2024-08-19T22:00:00.000Z",
			value: 63,
		},
		{
			date: "2024-08-20T22:00:00.000Z",
			value: 67,
		},
		{
			date: "2024-08-21T22:00:00.000Z",
			value: 87,
		},
		{
			date: "2024-08-22T22:00:00.000Z",
			value: 81,
		},
		{
			date: "2024-08-23T22:00:00.000Z",
			value: 60,
		},
		{
			date: "2024-08-24T22:00:00.000Z",
			value: 67,
		},
		{
			date: "2024-08-25T22:00:00.000Z",
			value: 73,
		},
		{
			date: "2024-08-26T22:00:00.000Z",
			value: 90,
		},
	];

	const pieData = [
		{
			date: "2024-08-23T22:00:00.000Z",
			value: 58,
		},
		{
			date: "2024-08-24T22:00:00.000Z",
			value: 27,
		},
		{
			date: "2024-08-25T22:00:00.000Z",
			value: 53,
		},
		{
			date: "2024-08-26T22:00:00.000Z",
			value: 51,
		},
	];

	const colorKeys = [...new Set(pieData.map((d) => d.date))];
	const keyColors = [
		"hsl(var(--primary))",
		"hsl(var(--secondary))",
		"hsl(var(--destructive))",
		"#4ade80",
	];

	const dataSum = $derived(pieData.reduce((sum, current) => sum + current.value, 0));
</script>

<Card.Root class="m-4">
	<Card.Header>
		<Card.Title>Test</Card.Title>
		<Card.Description>More detail</Card.Description>
	</Card.Header>
	<Card.Content>
		<div class="h-[300px]">
			<Chart
				{data}
				x="date"
				xScale={scalePoint()}
				y="value"
				yDomain={[0, null]}
				yNice={4}
				padding={{ left: 16, bottom: 24 }}
				tooltip={{ mode: "band" }}
			>
				<Svg>
					<Axis placement="left" grid rule />
					<Axis placement="bottom" format={(d) => stringToFDate(d).substring(0, 10)} rule />
					<Area
						line={{ class: "stroke-[4px] stroke-primary", draw: true }}
						curve={curveBumpX}
						class="fill-primary/30"
					/>
					<Highlight area />
				</Svg>
				<Tooltip header={(data) => stringToFDate(data.date).substring(0, 10)} let:data>
					<TooltipItem label="value" value={data.value} />
				</Tooltip>
			</Chart>
		</div>
	</Card.Content>
</Card.Root>

<Card.Root class="m-4">
	<Card.Header>
		<Card.Title>Test</Card.Title>
		<Card.Description>More detail</Card.Description>
	</Card.Header>
	<Card.Content>
		<div class="h-[300px]">
			<Chart
				data={pieData}
				x="value"
				r="date"
				rScale={scaleOrdinal()}
				rDomain={colorKeys}
				rRange={keyColors}
				let:tooltip
			>
				<Svg>
					<Pie innerRadius={60} padAngle={0.03} cornerRadius={8} spring {tooltip} />
				</Svg>
				<Tooltip header={(date) => stringToFDate(date.date).substring(0, 10)} let:data>
					<TooltipItem label="value" value={data.value} format="integer" valueAlign="right" />
					<TooltipItem
						label="percent"
						value={data.value / dataSum}
						format="percent"
						valueAlign="right"
					/>
				</Tooltip>
			</Chart>
		</div>
	</Card.Content>
</Card.Root>
