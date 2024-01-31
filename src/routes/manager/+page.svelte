<script lang="ts">
	import { Button, Card } from "@kayord/ui";
	import { salesPeriod } from "$lib/stores/salesPeriod";
	import { stringToFDate } from "$lib/util";
	import type { PageData } from "./$types";
	export let data: PageData;
</script>

<div class="m-8">
	{#if data.salesPeriod != undefined}
		<Card.Root>
			<Card.Header>
				<Card.Title>{data.salesPeriod.name ?? "Sales Period"}</Card.Title>
				<Card.Description>{stringToFDate(data.salesPeriod.startDate)}</Card.Description>
			</Card.Header>
			<Card.Footer>
				<Button href="/">Cash Up</Button>
			</Card.Footer>
		</Card.Root>
	{:else}
		<Button href="/manager/salesPeriod">Open Sales Period</Button>
	{/if}
</div>
