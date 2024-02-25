<script lang="ts">
	import { Badge, Button, Card, Form, Input, Loader } from "@kayord/ui";
	import type { PageData } from "../$types";
	import { createTableCashUpCreate, createPayGetLink, createPayStatus } from "$lib/api";
	import { CheckIcon, Nfc } from "lucide-svelte";
	import Error from "$lib/components/Error.svelte";
	import { getError } from "$lib/types";
	import { defaults, superForm } from "sveltekit-superforms/client";
	import { zod } from "sveltekit-superforms/adapters";
	import { z } from "zod";
	export let data: PageData;

	let a: HTMLAnchorElement;

	let url: string | undefined = undefined;
	let reference: string | undefined = undefined;

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

	$: payStatus = createPayStatus(reference ?? "", {
		query: { refetchInterval: 3000, enabled: reference != undefined },
	});

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
	};

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
</script>

<a class="hidden" href="/" bind:this={a}>Halo</a>

<form method="POST" use:enhance>
	<Card.Root class="m-8">
		<Card.Header>
			<div class="flex items-center gap-2 justify-end">
				<Card.Description>Total: <Badge>R 1.00</Badge></Card.Description>
				<Card.Description>Balance: <Badge>R 1.00</Badge></Card.Description>
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
				{#if $payStatus.data.value?.responseCode == 0}
					<CheckIcon />
				{/if}
				<div class="p-4">
					{$payStatus.data.value?.qrCodeState}
				</div>
			{/if}
		</Card.Content>
		<Card.Footer class="flex flex-col gap-2">
			{#if $mutation.error}
				<Error message={getError($mutation.error).message} />
			{/if}
			<Button class="w-full" href={`/table/menu/${data.bookingId}`} variant="outline">Cancel</Button
			>
			{#if $getLink.isLoading}
				<Loader />
			{:else}
				<Button class="w-full" type="submit" variant="default">Pay</Button>
			{/if}
		</Card.Footer>
	</Card.Root>
</form>
