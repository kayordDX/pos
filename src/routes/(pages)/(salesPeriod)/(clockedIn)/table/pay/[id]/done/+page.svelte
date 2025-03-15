<script lang="ts">
	import { page } from "$app/stores";
	import { Avatar, Button, Card } from "@kayord/ui";
	import { ShieldCheckIcon } from "@lucide/svelte";

	const id = $page.params.id;
	const amount = Number($page.url.searchParams.get("amount") ?? 0);
</script>

<Card.Root class="m-8">
	<Card.Header class="flex flex-row items-center gap-2">
		<Avatar.Root class="animate-pulse">
			<Avatar.Fallback><ShieldCheckIcon class="text-green-500" /></Avatar.Fallback>
		</Avatar.Root>
		<div>
			<Card.Title>Payment Successful</Card.Title>
			<Card.Description>Tap Payment</Card.Description>
		</div>
	</Card.Header>
	<Card.Content>
		<div class="mt-2 text-muted-foreground text-sm">Amount Paid:</div>
		<div class="text-foreground text-lg">R{amount.toFixed(2)}</div>
	</Card.Content>
	<Card.Footer>
		<Button variant="secondary" href={`/table/bill/${id}`} class="w-full">Go to Bill</Button>
	</Card.Footer>
</Card.Root>
