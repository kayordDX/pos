<script lang="ts">
	import { Badge, Button, Card, Form, Input, Loader } from "@kayord/ui";
	import type { PageData } from "../$types";
	import { createPayGetLink, createPayStatus } from "$lib/api";
	import { Nfc } from "lucide-svelte";
	import { defaults, superForm } from "sveltekit-superforms/client";
	import { zod } from "sveltekit-superforms/adapters";
	import { z } from "zod";
	import { page } from "$app/stores";
	export let data: PageData;

	let a: HTMLAnchorElement;

	let url: string | undefined = "https://halompos.page.link/X7k53oFqFtMP18qY8";
	let reference: string | undefined = "9619f004-6962-4bff-994a-a0dbea331fe2";

	$: getLink = createPayGetLink(
		{ amount: $formData.amount, tableBookingId: Number(data.bookingId) },
		{ query: { enabled: false } }
	);

	$: if ($getLink.data?.success) {
		url = $getLink.data.value?.url;
		reference = $getLink.data.value?.reference;
		if (a) {
			a.href = url ?? "";
			a.click();
		}
	}

	const generateLink = () => {
		$getLink.refetch();
	};

	let isPaymentDone = false;
	$: payStatus = createPayStatus(reference ?? "", {
		query: { refetchInterval: 5000, enabled: reference != undefined && !isPaymentDone },
	});

	if (isPaymentDone) {
		console.log("payment completed", $payStatus?.data);
		// goto(`/table/pay/${data.bookingId}/done?amount=${$payStatus?.data?.value?.amount}`);
	}

	// isPaymentDone = $payStatus?.data?.value?.responseCode == 0;

	const schema = z.object({
		amount: z.coerce.number().min(1, { message: "You need an amount of bigger than 1" }),
	});
	type FormSchema = z.infer<typeof schema>;
	const onSubmit = async (data: FormSchema) => {
		generateLink();
	};

	const form = superForm(defaults(zod(schema)), {
		SPA: true,
		validators: zod(schema),
		resetForm: false,
		onUpdate({ form }) {
			if (form.valid) {
				onSubmit(form.data);
			}
		},
	});

	const { form: formData, enhance } = form;

	const total = Number($page.url.searchParams.get("total") ?? "0").toFixed(2);
	const balance = Number($page.url.searchParams.get("balance") ?? "0").toFixed(2);
</script>

<a class="hidden" href="/" bind:this={a}>Halo</a>

<form method="POST" use:enhance>
	<Card.Root class="m-8">
		<Card.Header>
			<div class="flex items-center gap-2 justify-end">
				<Card.Description>Total: <Badge>R {total}</Badge></Card.Description>
				<Card.Description>Balance: <Badge>R {balance}</Badge></Card.Description>
			</div>
			<Form.Field {form} name="amount">
				<Form.Control let:attrs>
					<Form.Label>Amount</Form.Label>
					<Input {...attrs} type="number" bind:value={$formData.amount} />
				</Form.Control>
				<Form.Description>Enter amount to pay</Form.Description>
				<Form.FieldErrors />
			</Form.Field>
		</Card.Header>
		<Card.Content>
			<div class="text-center flex items-center justify-center flex-col">
				<div>Please tap your card on the back of the phone</div>
				<Nfc class="mt-10 h-20 w-20" />
			</div>
			{#if $payStatus.data}
				<div class="p-4 text-center">
					{$payStatus.data.value?.qrCodeState}
				</div>
				<pre>{JSON.stringify($payStatus.data.value)}</pre>
			{/if}
		</Card.Content>
		<Card.Footer class="flex flex-col gap-2">
			<Button class="w-full" href={`/table/bill/${data.bookingId}`} variant="outline">Cancel</Button
			>
			{#if $getLink.isLoading}
				<Loader />
			{:else}
				<Button class="w-full" type="submit" variant="default">Pay</Button>
			{/if}
		</Card.Footer>
	</Card.Root>
</form>

<Button href={url}>{url}</Button>
