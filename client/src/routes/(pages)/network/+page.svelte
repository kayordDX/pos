<script lang="ts">
	import { Header } from "$lib/components/Header";
	import { hub } from "$lib/stores/hub.svelte";
	import { networkInformation } from "$lib/stores/network.svelte";
	import { Card } from "@kayord/ui";
</script>

<Header />
<Card.Root class="m-8">
	<Card.Header>
		<Card.Title>Network Information</Card.Title>
		<Card.Description>Network Status</Card.Description>
	</Card.Header>
	<Card.Content class="flex flex-col gap-2">
		<div class="flex items-center gap-2">
			<div
				class={`size-4 rounded-full  ${networkInformation.isOnline() ? "bg-success" : "bg-destructive animate-pulse"}`}
			></div>
			<div class="text-muted-foreground text-sm">Network:</div>
			<div class="font-bold">{networkInformation.isOnline() ? "Online" : "Offline"}</div>
		</div>
		<div class="flex items-center gap-2">
			<div
				class={`size-4 rounded-full  ${hub.state == "Connected" ? "bg-success" : "bg-destructive animate-pulse"}`}
			></div>
			<div class="text-muted-foreground text-sm">SignalR:</div>
			<div class="font-bold">{hub.state}</div>
		</div>
	</Card.Content>
</Card.Root>
