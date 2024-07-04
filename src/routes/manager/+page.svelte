<script lang="ts">
	import { Button, Card } from "@kayord/ui";
	import { stringToFDate } from "$lib/util";
	import { status } from "$lib/stores/status";
</script>

<div class="m-2">
	{#if $status?.salesPeriod != undefined}
		<Card.Root>
			<Card.Header>
				<Card.Title>{$status?.salesPeriod.name ?? "Sales Period"}</Card.Title>
				<Card.Description>{stringToFDate($status?.salesPeriod.startDate)}</Card.Description>
			</Card.Header>
			<Card.Footer class="flex items-center gap-2">
				<Button href="manager/cashUp">Cash Up</Button>
			</Card.Footer>
		</Card.Root>
	{:else}
		<Button href="/manager/salesPeriod">Open Sales Period</Button>
	{/if}
</div>
