<script lang="ts">
	import { Card, Input, Label } from "@kayord/ui";
	import { Button } from "@kayord/ui";
	import { createSalesPeriodCreate } from "$lib/api";
	import { page } from "$app/stores";
	import { getFlash } from "sveltekit-flash-message/client";
	import { goto } from "$app/navigation";
	import { outlet } from "$lib/stores/outletStore";

	let name: string;

	const flash = getFlash(page);
	const mutation = createSalesPeriodCreate();

	const openSalesPeriod = async () => {
		try {
			await $mutation.mutateAsync({
				data: { outletId: $outlet?.outletId ?? 0, name: name },
			});
			$flash = { type: "success", message: "Successfully opened sales period" };
			goto("/");
		} catch (err) {
			$flash = { type: "error", message: "Error opening sales period" };
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
