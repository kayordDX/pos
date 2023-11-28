<script lang="ts">
	import { Button, Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@kayord/ui";
	import type { PageData } from "./$types";
	import { salesPeriod } from "$lib/stores/salesPeriodStore";
	import { stringToFDate } from "$lib/util";

	export let data: PageData;
</script>

<div class="m-8">
	{#if $salesPeriod != undefined}
		<Card>
			<CardHeader>
				<CardTitle>{$salesPeriod.name ?? "Sales Period"}</CardTitle>
				<CardDescription>{stringToFDate($salesPeriod.startDate)}</CardDescription>
			</CardHeader>
			<CardFooter>
				<Button href="/manager/salesPeriod">Cash Up</Button>
			</CardFooter>
		</Card>
	{:else}
		<Button href="/manager/salesPeriod">Open Sales Period</Button>
	{/if}
</div>
