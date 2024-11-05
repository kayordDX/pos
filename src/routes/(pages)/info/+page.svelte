<script lang="ts">
	import { copy } from "$lib/actions/copy";
	import { session } from "$lib/firebase.svelte";
	import { Button, Card, Loader } from "@kayord/ui";
	import { ClipboardCopyIcon } from "lucide-svelte";
</script>

<div class="m-8 flex flex-col gap-2 items-baseline">
	{#if !session.idToken}
		<Loader />
	{:else}
		<Card.Root class="w-full ">
			<Card.Header>
				<Card.Description>{session.idToken}</Card.Description>
			</Card.Header>
			<Card.Content>
				<button use:copy={session.idToken}>
					<Button>Copy Token<ClipboardCopyIcon class="h-5 w-5 ml-2" /></Button>
				</button>
			</Card.Content>
		</Card.Root>
	{/if}
</div>
