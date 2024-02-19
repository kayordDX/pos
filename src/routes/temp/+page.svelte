<script lang="ts">
	import { Button, Card } from "@kayord/ui";
	import type { PageData } from "./$types";
	import { createPayGetLink, createPayStatus } from "$lib/api";
	export let data: PageData;

	const getLink = createPayGetLink({ amount: 2 }, { query: { enabled: false } });

	const getStatus = createPayStatus("0a2653a4-b373-492c-8753-3ab9dff42326", {
		query: { enabled: false },
	});
</script>

<Card.Root class="m-8 p-4">
	<Button on:click={() => $getLink.refetch()}>Get Link</Button>
	<div>{$getLink.data?.value?.reference}</div>
	<div>{$getLink.data?.value?.url}</div>
	129ea456-7837-4824-9284-0fce33c1d0c3
	<Button href="https://halompos.page.link/FXVzsvSi9cz3WyaF7">Pay</Button>
	<Button on:click={() => $getStatus.refetch()}>Get Status</Button>
</Card.Root>
