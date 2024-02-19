<script lang="ts">
	import { Button, Card } from "@kayord/ui";
	import { stringToFDate } from "$lib/util";
	import type { PageData } from "./$types";
	import { client } from "$lib/api";
	import { goto } from "$app/navigation";
	export let data: PageData;

	const closeSalesPeriod = async () => {
		await client.POST("/salesPeriod/close", {
			body: {
				salesPeriodId: data.status?.salesPeriodId ?? 0,
			},
		});
		goto("/manager", { invalidateAll: true });
	};
</script>

<div class="m-8">
	{#if data.status?.salesPeriod != undefined}
		<Card.Root>
			<Card.Header>
				<Card.Title>{data.status?.salesPeriod.name ?? "Sales Period"}</Card.Title>
				<Card.Description>{stringToFDate(data.status?.salesPeriod.startDate)}</Card.Description>
			</Card.Header>
			<Card.Footer>
				<Button on:click={closeSalesPeriod}>Cash Up</Button>
			</Card.Footer>
		</Card.Root>
	{:else}
		<Button href="/manager/salesPeriod">Open Sales Period</Button>
	{/if}
</div>
