<script lang="ts">
	import { Card, Input, Label } from "@kayord/ui";
	import { Button } from "@kayord/ui";
	import { createSalesPeriodCreate, createSalesPeriodGet } from "$lib/api";
	import { page } from "$app/stores";
	import { getFlash } from "sveltekit-flash-message/client";
	import { goto, invalidateAll } from "$app/navigation";
	import type { PageData } from "./$types";

	export let data: PageData;
	let name: string;

	const flash = getFlash(page);
	const mutation = createSalesPeriodCreate();

	const openSalesPeriod = async () => {
		try {
			await $mutation.mutateAsync({
				data: { outletId: data.status?.outletId ?? 0, name: name },
			});
			$flash = { type: "success", message: "Successfully opened sales period" };
			await goto("/");
		} catch (err) {
			$flash = { type: "error", message: "Error opening sales period" };
		} finally {
			invalidateAll();
		}
	};
</script>

<Card.Root class="p-5 m-5">
	<Card.Header>
		<Card.Title>Open Sales Period</Card.Title>
	</Card.Header>
	<Card.Content>
		<Label for="name">Name</Label>
		<Input type="text" id="name" placeholder="name" bind:value={name} />
	</Card.Content>
	<Card.Footer class="gap-2">
		<Button variant="secondary" href="/manager">Cancel</Button>
		<Button on:click={openSalesPeriod}>Open</Button>
	</Card.Footer>
</Card.Root>
