<script lang="ts">
	import { Card, Input, Label, toast } from "@kayord/ui";
	import { Button } from "@kayord/ui";
	import { createSalesPeriodCreate } from "$lib/api";
	import { goto } from "$app/navigation";
	import { status } from "$lib/stores/status.svelte";

	let name: string = $state("");

	const mutation = createSalesPeriodCreate();

	const openSalesPeriod = async () => {
		try {
			await $mutation.mutateAsync({
				data: { outletId: status.value?.outletId ?? 0, name: name },
			});
			await status.getStatus();
			toast.success("Successfully opened sales period");
			await goto("/", { invalidateAll: true });
		} catch (err) {
			toast.error("Error opening sales period");
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
		<Button onclick={openSalesPeriod}>Open</Button>
	</Card.Footer>
</Card.Root>
