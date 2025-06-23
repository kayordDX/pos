<script lang="ts">
	import { Header } from "$lib/components/Header";
	import { networkInformation } from "$lib/stores/network.svelte";
	import { Card } from "@kayord/ui";
</script>

<Header />
<Card.Root class="m-8">
	<Card.Header>
		<Card.Title>Network Information</Card.Title>
		<Card.Description>{networkInformation.value.state}</Card.Description>
	</Card.Header>
	<Card.Content>
		<div class="flex items-center gap-2">
			<div class="text-muted-foreground text-sm">Type:</div>
			<div class="font-bold">{networkInformation.value.effectiveType}</div>
		</div>
		<div class="flex items-center gap-2">
			<div class="text-muted-foreground text-sm">Connectivity:</div>
			<div class="font-bold">{networkInformation.value.connectivity}</div>
		</div>
		<div class="flex items-center gap-2">
			<div class="text-muted-foreground text-sm">Rtt:</div>
			<div class="font-bold">{networkInformation.value.rtt}</div>
		</div>
		<div class="flex items-center gap-2">
			<div class="text-muted-foreground text-sm">Downlink:</div>
			<div class="font-bold">{networkInformation.value.downlink}</div>
		</div>
		<div class="flex items-center gap-2">
			<div class="text-muted-foreground text-sm">Save Data:</div>
			<div class="font-bold">{networkInformation.value.saveData}</div>
		</div>
	</Card.Content>
</Card.Root>
