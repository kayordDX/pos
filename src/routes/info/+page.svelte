<script lang="ts">
	import { copy } from "$lib/actions/copy";
	import { session } from "$lib/firebase";
	import { Button, Loader } from "@kayord/ui";
	import { ClipboardCopyIcon } from "lucide-svelte";

	let token: string | undefined = undefined;
	const getToken = async () => {
		token = await $session?.getIdToken();
	};
	getToken();
</script>

<div class="m-8 flex flex-col gap-2 items-baseline">
	{#if !token}
		<Loader />
	{:else}
		<button use:copy={token}>
			<Button>Copy Token<ClipboardCopyIcon class="h-5 w-5 ml-2" /></Button>
		</button>
	{/if}
</div>
