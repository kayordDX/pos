<script lang="ts">
	import {
		Button,
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle,
	} from "@kayord/ui";
	import type { PageData } from "./$types";
	import { createTableCashUpCreate } from "$lib/api";
	import { outlet } from "$lib/stores/outletStore";
	import { Loader, Nfc } from "lucide-svelte";
	import { goto } from "$app/navigation";
	import Error from "$lib/components/Error.svelte";
	import { getError } from "$lib/types";

	const mutation = createTableCashUpCreate();

	const pay = async () => {
		const result = await $mutation.mutateAsync({
			data: {
				outletId: $outlet?.outletId ?? 0,
				salesAmount: 100,
				totalAmount: 120,
				tableBookingId: Number(data.bookingId),
			},
		});
		goto("/waiter");
	};

	export let data: PageData;
</script>

<Card class="m-8">
	<CardHeader>
		<CardTitle>R23.09</CardTitle>
		<CardDescription>Amount</CardDescription>
	</CardHeader>
	<CardContent>
		<div class="text-center flex items-center justify-center flex-col">
			<div>Please tap your card on the back of the phone</div>
			<Nfc class="mt-10 h-20 w-20" />
		</div>
	</CardContent>
	<CardFooter class="flex flex-col gap-2">
		{#if $mutation.error}
			<Error message={getError($mutation.error).message} />
		{/if}
		<Button class="w-full" href={`/table/${data.bookingId}`} variant="outline">Cancel</Button>
		{#if $mutation.isPending}
			<Loader />
		{:else}
			<Button class="w-full" on:click={pay} variant="default">Pay with Card</Button>
		{/if}
	</CardFooter>
</Card>
