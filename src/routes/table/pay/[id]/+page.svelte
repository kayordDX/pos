<script lang="ts">
	import { Button, Card, Loader } from "@kayord/ui";
	import type { PageData } from "../$types";
	import { createTableCashUpCreate, createPayGetLink, createPayStatus } from "$lib/api";
	import { Nfc } from "lucide-svelte";
	import { goto } from "$app/navigation";
	import Error from "$lib/components/Error.svelte";
	import { getError } from "$lib/types";
	export let data: PageData;

	$: total = () => {
		let totalResult = 0;
		// if ($basket) {
		// 	$basket.map((item) => {
		// 		totalResult += item.price;
		// 	});
		// }
		return totalResult;
	};
	// KJ Temp
	// $: {
	// 	if ($basket) {
	// 		$basket.map((item) => {
	// 			total += item.price;
	// 		});
	// 	}
	// }

	// onMount(() => {
	// 	$basket.map((item) => {
	// 		total += item.price;
	// 	});
	// });
	// KJ Temp

	$: getLink = createPayGetLink(
		{ amount: total(), tableBookingId: Number(data.bookingId) },
		{ query: { enabled: false } }
	);
	let a: HTMLAnchorElement;

	let url: string | undefined = undefined;
	let reference: string | undefined = undefined;

	$: if ($getLink.data?.success) {
		url = $getLink.data.value?.url;
		reference = $getLink.data.value?.reference;
		if (a) {
			a.href = url ?? "";
			a.click();
		}
	}

	$: payStatus = createPayStatus(reference ?? "", {
		query: { refetchInterval: 3000, enabled: reference != undefined },
	});

	const generateLink = () => {
		$getLink.refetch();
	};

	const mutation = createTableCashUpCreate();

	const tableCashUp = async () => {
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

<a class="hidden" href="/" bind:this={a}>Halo</a>

<Card.Root class="m-8">
	<Card.Header>
		<Card.Title>R {total().toFixed(2)}</Card.Title>
		<Card.Description>Amount</Card.Description>
		{#if reference}
			<Card.Description>{reference}</Card.Description>
		{/if}
	</Card.Header>
	<Card.Content>
		<div class="text-center flex items-center justify-center flex-col">
			<div>Please tap your card on the back of the phone</div>
			<Nfc class="mt-10 h-20 w-20" />
		</div>
		{#if $payStatus.data}
			<div class="p-4">
				{$payStatus.data.value?.qrCodeState}
			</div>
		{/if}
	</Card.Content>
	<Card.Footer class="flex flex-col gap-2">
		{#if $mutation.error}
			<Error message={getError($mutation.error).message} />
		{/if}
		<Button class="w-full" href={`/table/menu/${data.bookingId}`} variant="outline">Cancel</Button>
		{#if $getLink.isLoading}
			<Loader />
		{:else}
			<Button class="w-full" on:click={generateLink} variant="default">Pay</Button>
		{/if}
	</Card.Footer>
</Card.Root>
