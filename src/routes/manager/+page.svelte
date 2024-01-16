<script lang="ts">
	import { Button, Card } from "@kayord/ui";
	import { salesPeriod } from "$lib/stores/salesPeriodStore";
	import { stringToFDate } from "$lib/util";
</script>

<div class="m-8">
	{#if $salesPeriod != undefined}
		<Card.Root>
			<Card.Header>
				<Card.Title>{$salesPeriod.name ?? "Sales Period"}</Card.Title>
				<Card.Description>{stringToFDate($salesPeriod.startDate)}</Card.Description>
			</Card.Header>
			<Card.Footer>
				<Button href="/manager/salesPeriod">Cash Up</Button>
			</Card.Footer>
		</Card.Root>
	{:else}
		<Button href="/manager/salesPeriod">Open Sales Period</Button>
	{/if}
</div>
