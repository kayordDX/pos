<script lang="ts">
	import { Button, Card } from "@kayord/ui";
	import type { PageData } from "./$types";
	import { createTableCashUpCreate } from "$lib/api";
	import { Loader, Nfc } from "lucide-svelte";
	import { goto } from "$app/navigation";
	import Error from "$lib/components/Error.svelte";
	import { getError } from "$lib/types";
	export let data: PageData;

	const mutation = createTableCashUpCreate();

	const pay = async () => {
		const result = await $mutation.mutateAsync({
			data: {
				outletId: data.status?.outletId ?? 0,
				salesAmount: 100,
				totalAmount: 120,
				tableBookingId: Number(data.bookingId),
			},
		});
		goto("/waiter");
	};
</script>

<Card.Root class="m-8">
	<Card.Header>
		<Card.Title>R23.09</Card.Title>
		<Card.Description>Amount</Card.Description>
	</Card.Header>
	<Card.Content>
		<div class="text-center flex items-center justify-center flex-col">
			<div>Please tap your card on the back of the phone</div>
			<Nfc class="mt-10 h-20 w-20" />
		</div>
	</Card.Content>
	<Card.Footer class="flex flex-col gap-2">
		{#if $mutation.error}
			<Error message={getError($mutation.error).message} />
		{/if}
		<Button class="w-full" href={`/table/${data.bookingId}`} variant="outline">Cancel</Button>
		{#if $mutation.isPending}
			<Loader />
		{:else}
			<Button class="w-full" on:click={pay} variant="default">Pay with Card</Button>
		{/if}
	</Card.Footer>
</Card.Root>
