<script lang="ts">
	import { createPayPayConfigGet } from "$lib/api";
	import { Alert, Card } from "@kayord/ui";
	import { TriangleAlertIcon } from "lucide-svelte";
	import { status } from "$lib/stores/status.svelte";
	import Config from "./Config.svelte";
	import AddConfig from "./AddConfig.svelte";

	const query = createPayPayConfigGet(status.value.outletId);
</script>

<Card.Root class="m-4">
	<Card.Header>
		<Card.Title>Halo Config</Card.Title>
		<Card.Description>All available halo configuration for outlet</Card.Description>
	</Card.Header>
	<Card.Content>
		{#if $query.data?.length === 0}
			<Alert.Root>
				<TriangleAlertIcon class="size-4" />
				<Alert.Title>No halo config available</Alert.Title>
				<Alert.Description
					>You will not be able to accept halo payments for this outlet</Alert.Description
				>
			</Alert.Root>
		{:else}
			<div class="flex flex-col gap-4">
				{#each $query.data ?? [] as config}
					<Config {config} refetch={$query.refetch} />
				{/each}
			</div>
		{/if}
	</Card.Content>
	<Card.Footer class="flex flex-col gap-2">
		<AddConfig refetch={$query.refetch} />
	</Card.Footer>
</Card.Root>
