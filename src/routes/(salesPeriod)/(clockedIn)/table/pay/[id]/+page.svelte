<script lang="ts">
	import { Badge, Button, Card, Form, Input, Select, toast } from "@kayord/ui";
	import { defaults, superForm } from "sveltekit-superforms/client";
	import { zod } from "sveltekit-superforms/adapters";
	import { z } from "zod";
	import { page } from "$app/stores";
	import { client, createPayManualPayment, createOutletGetPaymentType } from "$lib/api";
	import { goto } from "$app/navigation";
	import { payment } from "$lib/stores/payment";
	import { onMount } from "svelte";
	import { status } from "$lib/stores/status";

	let url: string | undefined;
	let reference: string | undefined;
	let linkLoading = false;

	const paymentTypeQuery = createOutletGetPaymentType($status?.outletId ?? 0);

	// Set Default Value
	$: {
		if (
			$formData.paymentTypeId == 0 &&
			$paymentTypeQuery.data &&
			$paymentTypeQuery.data.length > 0 &&
			$paymentTypeQuery.data[0]?.paymentTypeId != undefined
		) {
			$formData.paymentTypeId = $paymentTypeQuery.data[0]?.paymentTypeId;
		}
	}

	const schema = z.object({
		amount: z.coerce.number().min(1, { message: "You need an amount of bigger than 1" }),
		paymentTypeId: z.coerce.number().min(1, { message: "Payment Type is Required" }),
	});

	type FormSchema = z.infer<typeof schema>;

	onMount(() => {
		payment.clear();
	});

	const onSubmitHalo = async (data: FormSchema) => {
		url = undefined;
		reference = undefined;

		linkLoading = true;
		const linkResult = await client.GET("/pay/getLink", {
			params: { query: { amount: data.amount, tableBookingId: Number($page.params.id) } },
		});
		if (linkResult.data?.value) {
			url = linkResult.data.value.url;
			reference = linkResult.data.value.reference;
			payment.setUrl(url);
			goto(`/table/pay/${$page.params.id}/${reference}?url=${url}`);
		} else {
			toast.error("Could not start payment");
		}
		linkLoading = false;
	};

	const mutation = createPayManualPayment();
	const onSubmitManual = async (manualData: FormSchema) => {
		await $mutation.mutateAsync({
			data: {
				amount: manualData.amount,
				tableBookingId: Number($page.params.id),
				paymentTypeId: manualData.paymentTypeId,
			},
		});
		goto(`/table/bill/${$page.params.id}`);
	};

	const form = superForm(defaults(zod(schema)), {
		SPA: true,
		validators: zod(schema),
		resetForm: false,
		onUpdate({ form }) {
			if (form.valid) {
				if (form.data.paymentTypeId <= 1) {
					onSubmitHalo(form.data);
				} else {
					onSubmitManual(form.data);
				}
			}
		},
	});

	const { form: formData, enhance } = form;

	const total = Number($page.url.searchParams.get("total") ?? "0").toFixed(2);
	const balance = Number($page.url.searchParams.get("balance") ?? "0").toFixed(2);
</script>

<form method="POST" use:enhance>
	<Card.Root class="m-4 mb-12">
		<Card.Header>
			<div class="flex items-center gap-2 justify-end">
				<Card.Description>Total: <Badge>R {total}</Badge></Card.Description>
				<Card.Description>Balance: <Badge>R {balance}</Badge></Card.Description>
			</div>
			<Form.Field {form} name="amount">
				<Form.Control let:attrs>
					<Form.Label>Amount</Form.Label>
					<Input {...attrs} type="number" step="0.01" bind:value={$formData.amount} />
				</Form.Control>
				<Form.Description>Enter amount to pay</Form.Description>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="paymentTypeId">
				<Form.Control let:attrs>
					<Form.Label>Payment Type</Form.Label>
					<Select.Root
						selected={{
							value: $formData.paymentTypeId,
							label: $paymentTypeQuery.data?.find(
								(i) => i.paymentTypeId === $formData.paymentTypeId
							)?.paymentTypeName,
						}}
						onSelectedChange={(v) => {
							v && ($formData.paymentTypeId = v.value);
						}}
					>
						<Select.Trigger {...attrs}>
							<Select.Value placeholder="Select payment type" />
						</Select.Trigger>
						<Select.Content>
							{#each $paymentTypeQuery.data ?? [] as paymentType}
								<Select.Item value={paymentType.paymentTypeId}
									>{paymentType.paymentTypeName}</Select.Item
								>
							{/each}
						</Select.Content>
					</Select.Root>
					<input hidden bind:value={$formData.paymentTypeId} name={attrs.name} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		</Card.Header>
		<Card.Footer class="flex flex-col gap-2">
			<Button class="w-full" type="submit">Pay</Button>
			<Button class="w-full" href={`/table/bill/${$page.params.id}`} variant="outline">
				Cancel
			</Button>
		</Card.Footer>
	</Card.Root>
</form>
