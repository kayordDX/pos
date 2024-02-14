<script lang="ts">
	import { Button, Card } from "@kayord/ui";
	import { createPayGetLink, createPayStatus } from "$lib/api";
	import { goto } from "$app/navigation";

	const getLink = createPayGetLink({ amount: 12 }, { query: { enabled: false } });

	let url: string | undefined = undefined;
	let reference: string | undefined = undefined;

	$: if ($getLink.data?.success) {
		url = $getLink.data.value?.url;
		reference = $getLink.data.value?.reference;
		if (url) goto(url);
	}

	$: payStatus = createPayStatus(reference ?? "", {
		query: { refetchInterval: 3000, enabled: reference != undefined },
	});

	const generateLink = () => {
		$getLink.refetch();
	};
</script>

{#if $getLink.isPending}
	Loading....
{/if}
<div>
	{url}
</div>
<div>{reference}</div>

{#if $getLink.error}
	{JSON.stringify($payStatus.error)}
{/if}

{#if !$getLink.data}
	<Button on:click={generateLink}>Generate</Button>
{/if}

<Card.Root class="p-8">
	{JSON.stringify($payStatus.data)}
</Card.Root>
