<script lang="ts">
	import { Button, Card } from "@kayord/ui";
	import { stringToFDate } from "$lib/util";
	import type { PageData } from "./$types";
	export let data: PageData;
</script>

<div class="m-2">
	{#if data.status?.salesPeriod != undefined}
		<Card.Root>
			<Card.Header>
				<Card.Title>{data.status?.salesPeriod.name ?? "Sales Period"}</Card.Title>
				<Card.Description>{stringToFDate(data.status?.salesPeriod.startDate)}</Card.Description>
			</Card.Header>
			<Card.Footer>
				<Button href="manager/cashUp">Cash Up</Button>
			</Card.Footer>
		</Card.Root>

		<Card.Root class="p-2 mt-4">
			<Button href="/kitchen">Dashboard</Button>
		</Card.Root>
	{:else}
		<Button href="/manager/salesPeriod">Open Sales Period</Button>
	{/if}
</div>
