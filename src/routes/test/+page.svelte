<script lang="ts">
	import { Button, Input, Label } from "@kayord/ui";
	import type { PageData } from "./$types";

	type DeepLink = {
		url: string;
		reference: string;
	};

	let isLoading = false;
	let deepLink: DeepLink | undefined = undefined;
	let amount: number = 0;

	const deepLinkFn = async () => {
		try {
			isLoading = true;
			const result = await fetch(`/api/halo/intent/${amount}`);
			const data = (await result.json()) as { data: DeepLink };
			deepLink = data.data;
			console.log("changed", data);
			isLoading = false;
		} catch {
			console.log("error");
			isLoading = false;
		}
	};
</script>

<div class="m-8 flex flex-col gap-4">
	<Label>Amount</Label>
	<Input bind:value={amount} />
	<Button on:click={deepLinkFn} disabled={isLoading}>Generate Pay Link</Button>
	{#if deepLink != undefined}
		<Button href={deepLink.url}>{deepLink.url}</Button>
		Reference: {deepLink.reference}
	{/if}
</div>
