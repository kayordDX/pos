<script lang="ts">
	import Header from "$lib/components/Header/Header.svelte";
	import { session } from "$lib/firebase.svelte";
	import { Card, CopyButton, Loader } from "@kayord/ui";
</script>

<Header />
<div class="m-8 flex flex-col items-baseline gap-2">
	{#if !session.idToken}
		<Loader />
	{:else}
		<Card.Root class="w-full ">
			<Card.Header>
				<Card.Title>Token</Card.Title>
				<Card.Description class="overflow-hidden">Auth</Card.Description>
			</Card.Header>
			<Card.Content>
				<div class="text-muted-foreground overflow-hidden text-xs">
					{session.idToken}
				</div>
			</Card.Content>
			<Card.Footer>
				<CopyButton text={session.idToken} />
			</Card.Footer>
		</Card.Root>
	{/if}
</div>
