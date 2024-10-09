<script lang="ts">
	import { networkInformationStore } from "$lib/stores/network";
	import { Card } from "@kayord/ui";
</script>

<Card.Root class="m-8">
	<Card.Header>
		<Card.Title>Network Information</Card.Title>
		<Card.Description>{$networkInformationStore.state}</Card.Description>
	</Card.Header>
	<Card.Content>
		<div class="flex items-center gap-2">
			<div class="text-muted-foreground text-sm">Type:</div>
			<div class="font-bold">{$networkInformationStore.effectiveType}</div>
		</div>
		<div class="flex items-center gap-2">
			<div class="text-muted-foreground text-sm">Connectivity:</div>
			<div class="font-bold">{$networkInformationStore.connectivity}</div>
		</div>
		<div class="flex items-center gap-2">
			<div class="text-muted-foreground text-sm">Rtt:</div>
			<div class="font-bold">{$networkInformationStore.rtt}</div>
		</div>
		<div class="flex items-center gap-2">
			<div class="text-muted-foreground text-sm">Downlink:</div>
			<div class="font-bold">{$networkInformationStore.downlink}</div>
		</div>
		<div class="flex items-center gap-2">
			<div class="text-muted-foreground text-sm">Save Data:</div>
			<div class="font-bold">{$networkInformationStore.saveData}</div>
		</div>
	</Card.Content>
</Card.Root>
