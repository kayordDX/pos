<script lang="ts">
	import { Button, Card } from "@kayord/ui";
	import { stringToFDate } from "$lib/util";
	import { status } from "$lib/stores/status.svelte";
	import { ReceiptTextIcon, WalletCardsIcon, MessageCircleIcon, Settings2Icon } from "@lucide/svelte";
</script>

<div class="m-2">
	{#if status.value?.salesPeriod != undefined}
		<Card.Root>
			<Card.Header>
				<Card.Title>{status.value?.salesPeriod.name ?? "Sales Period"}</Card.Title>
				<Card.Description>{stringToFDate(status.value?.salesPeriod.startDate)}</Card.Description>
			</Card.Header>
			<Card.Footer class="flex items-center gap-2">
				<Button href="manager/cashUp">
					<WalletCardsIcon class="mr-2 size-4" /> Cash Up
				</Button>
				<Button variant="outline" class="m-2" href="manager/history">
					<ReceiptTextIcon class="mr-2 size-4" /> Sales Period Bills
				</Button>
			</Card.Footer>
		</Card.Root>
	{:else}
		<Card.Root class="mt-4">
			<Card.Header>
				<Card.Title>Sales Period</Card.Title>
				<Card.Description>No active sales period</Card.Description>
			</Card.Header>
			<Card.Footer class="mt-2 flex items-center gap-2">
				<Button href="/manager/salesPeriod" class="w-full">Open Sales Period</Button>
			</Card.Footer>
		</Card.Root>
	{/if}

	<Card.Root class="mt-4">
		<Card.Header>
			<Card.Title>Admin</Card.Title>
			<Card.Description>Additional admin configuration</Card.Description>
		</Card.Header>
		<Card.Footer class="mt-2 flex items-center gap-2">
			<Button class="m-2 w-full" href="manager/admin">
				<Settings2Icon class="mr-2 size-4" />
				Admin
			</Button>
		</Card.Footer>
	</Card.Root>
</div>
