<script lang="ts">
	import { Card, Input, Label } from "@kayord/ui";
	import { toast } from "@kayord/ui/sonner";
	import { Button } from "@kayord/ui";
	import { createSalesPeriodCreate } from "$lib/api";
	import { goto } from "$app/navigation";
	import { resolve } from "$app/paths";
	import { status } from "$lib/stores/status.svelte";

	let name: string = $state("");

	const mutation = createSalesPeriodCreate();

	const openSalesPeriod = async () => {
		try {
			await mutation.mutateAsync({
				data: { outletId: status.value?.outletId ?? 0, name: name },
			});
			await status.getStatus();
			toast.success("Successfully opened sales period");
			await goto(resolve("/"), { invalidateAll: true });
		} catch {
			toast.error("Error opening sales period");
		}
	};
</script>

<div class="p-3">
	<Card.Root class="">
		<Card.Header>
			<Card.Title>Open Sales Period</Card.Title>
		</Card.Header>
		<Card.Content class="flex flex-col gap-2">
			<Label for="name">Name</Label>
			<Input type="text" id="name" placeholder="name" bind:value={name} />
		</Card.Content>
		<Card.Footer class="gap-2">
			<Button variant="secondary" href="/manager">Cancel</Button>
			<Button onclick={openSalesPeriod}>Open</Button>
		</Card.Footer>
	</Card.Root>
</div>
