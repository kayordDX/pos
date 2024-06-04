<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import Error from "$lib/components/Error.svelte";
	import { payment } from "$lib/stores/payment";
	import { Avatar, Badge, Button, Card, Loader } from "@kayord/ui";
	import { onMount } from "svelte";
	import { createPayStatus } from "$lib/api";
	import { getError } from "$lib/types";
	import { NfcIcon } from "lucide-svelte";

	const url = $page.url.searchParams.get("url");

	let a: HTMLAnchorElement;
	onMount(() => {
		if (a && $payment.url) {
			a.href = $payment.url;
			a.click();
		}
	});

	let reference = $page.params.reference ?? "";
	const query = createPayStatus(reference, { query: { refetchInterval: 15000 } });

	const paymentDone = (amount: number) => {
		goto(`/table/pay/${$page.params.id}/done?amount=${amount}`);
	};

	const cancelPayment = () => {
		goto(`/table/bill/${$page.params.id}`);
	};

	const paymentCheck = () => {
		if (
			($query.data?.value?.transactionId.length ?? 0) > 0 &&
			$query.data?.value?.responseCode == 0 &&
			($query.data?.value?.authorisationCode.length ?? 0) > 0
		) {
			paymentDone($query.data?.value?.amount ?? 0);
		}
	};

	$: $query.data?.value && paymentCheck();
</script>

<a class="hidden" href="/" bind:this={a}>Halo</a>

<Card.Root class="m-8">
	<Card.Header class="flex flex-row items-center gap-2">
		<Avatar.Root>
			<Avatar.Fallback><NfcIcon class="text-primary" /></Avatar.Fallback>
		</Avatar.Root>
		<div>
			<Card.Title>Make Payment</Card.Title>
			<Card.Description>You will be redirected to Halo</Card.Description>
		</div>
	</Card.Header>
	<Card.Content>
		{#if $query.isPending}
			<Loader />
		{/if}
		{#if $query.error}
			<Error message={getError($query.error).message} />
		{/if}

		{#if $query.data}
			<div class="flex flex-col gap-1">
				<div class="flex gap-2 items-center">
					<div class="text-sm text-muted-foreground">Amount:</div>
					<div class="text-lg">R{$query.data.value?.amount.toFixed(2)}</div>
				</div>

				<Button class="my-4" on:click={() => $query.refetch()} variant="outline">
					{#if $query.isFetching}
						<Loader class="size-5" />
						Checking Payment Status...
					{:else}
						Check Payment Status
					{/if}
				</Button>

				<div class="flex gap-2 items-center">
					<div class="text-sm text-muted-foreground">QR Code Status:</div>
					<Badge>{$query.data?.value?.qrCodeState}</Badge>
				</div>

				<div class="flex gap-2 items-center">
					<div class="text-sm text-muted-foreground">Payment Reference:</div>
					<div class="text-sm">{$query.data?.value?.paymentReference}</div>
				</div>

				{#if $query.data.value?.status}
					<div class="flex gap-2 items-center">
						<div class="text-sm text-muted-foreground">Status:</div>
						<Badge>{$query.data.value?.status}</Badge>
					</div>
					<div class="flex gap-2 items-center">
						<div class="text-sm text-muted-foreground">Currency:</div>
						<div class="text-sm">{$query.data.value?.currency}</div>
					</div>
					<div class="flex gap-2 items-center">
						<div class="text-sm text-muted-foreground">Disposition:</div>
						<Badge>{$query.data.value?.disposition}</Badge>
					</div>
				{/if}
			</div>
		{/if}
	</Card.Content>
	<Card.Footer class="flex flex-col gap-2">
		<Button href={url} variant="secondary" class="w-full">Retry Payment</Button>
		<Button on:click={cancelPayment} variant="destructive" class="w-full">Cancel Payment</Button>
	</Card.Footer>
</Card.Root>
