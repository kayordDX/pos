<script lang="ts">
	import { Button, Card } from "@kayord/ui";
	import { stringToFDate } from "$lib/util";
	import { status } from "$lib/stores/status";
	import {
		ReceiptTextIcon,
		WalletCardsIcon,
		MessageCircleIcon,
		Settings2Icon,
	} from "lucide-svelte";
</script>

<div class="m-2">
	{#if $status?.salesPeriod != undefined}
		<Card.Root>
			<Card.Header>
				<Card.Title>{$status?.salesPeriod.name ?? "Sales Period"}</Card.Title>
				<Card.Description>{stringToFDate($status?.salesPeriod.startDate)}</Card.Description>
			</Card.Header>
			<Card.Footer class="flex items-center gap-2">
				<Button href="manager/cashUp">
					<WalletCardsIcon class="size-4 mr-2" /> Cash Up
				</Button>
				<Button variant="outline" class="m-2" href="manager/history">
					<ReceiptTextIcon class="size-4 mr-2" /> All Bills
				</Button>
			</Card.Footer>
		</Card.Root>
	{:else}
		<Card.Root class="mt-4">
			<Card.Header>
				<Card.Title>Sales Period</Card.Title>
				<Card.Description>No active sales period</Card.Description>
			</Card.Header>
			<Card.Footer class="flex items-center gap-2 mt-2">
				<Button href="/manager/salesPeriod" class="w-full">Open Sales Period</Button>
			</Card.Footer>
		</Card.Root>
	{/if}

	<Card.Root class="mt-4">
		<Card.Header>
			<Card.Title>Admin</Card.Title>
			<Card.Description>Additional admin configuration</Card.Description>
		</Card.Header>
		<Card.Footer class="flex items-center gap-2 mt-2">
			<Button class="m-2 w-full" href="manager/admin">
				<Settings2Icon class="size-4 mr-2" />
				Admin
			</Button>
		</Card.Footer>
	</Card.Root>
</div>
