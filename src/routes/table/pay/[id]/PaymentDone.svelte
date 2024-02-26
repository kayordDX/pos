<script lang="ts">
	import { page } from "$app/stores";
	import { Avatar, Button, Card } from "@kayord/ui";
	import { ShieldCheckIcon } from "lucide-svelte";

	const id = $page.params.id;
</script>

<Card.Root class="m-8">
	<Card.Header class="flex flex-row items-center gap-2">
		<Avatar.Root class="animate-pulse">
			<Avatar.Fallback><ShieldCheckIcon class="text-green-500" /></Avatar.Fallback>
		</Avatar.Root>
		<div>
			<Card.Title>Payment Successful</Card.Title>
			<Card.Description>Payment Successful</Card.Description>
		</div>
	</Card.Header>
	<Card.Content></Card.Content>
	<Card.Footer>
		<Button variant="secondary" href={`/table/bill/${id}`} class="w-full">Return to Bill</Button>
	</Card.Footer>
</Card.Root>
