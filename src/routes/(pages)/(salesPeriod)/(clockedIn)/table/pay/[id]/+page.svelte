<script lang="ts">
	import {
		Badge,
		Button,
		Card,
		Form,
		Input,
		Select,
		toast,
		Popover,
		Command,
		buttonVariants,
	} from "@kayord/ui";
	import { defaults, superForm } from "sveltekit-superforms/client";
	import { zod } from "sveltekit-superforms/adapters";
	import { z } from "zod";
	import { page } from "$app/stores";
	import { client, createPayManualPayment, createOutletGetPaymentType } from "$lib/api";
	import { goto } from "$app/navigation";
	import { payment } from "$lib/stores/payment.svelte";
	import { onMount } from "svelte";
	import { status } from "$lib/stores/status.svelte";
	import { CheckIcon, ChevronsUpDownIcon } from "lucide-svelte";
	import { cn } from "@kayord/ui/utils";

	let url: string | undefined;
	let reference: string | undefined;
	let linkLoading = false;

	const paymentTypeQuery = createOutletGetPaymentType(status.value?.outletId ?? 0);

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

	// Set Default Value
	$effect(() => {
		if (
			$formData.paymentTypeId == 0 &&
			$paymentTypeQuery.data &&
			$paymentTypeQuery.data.length > 0 &&
			$paymentTypeQuery.data[0]?.paymentTypeId != undefined
		) {
			$formData.paymentTypeId = $paymentTypeQuery.data[0]?.paymentTypeId;
		}
	});

	const total = Number($page.url.searchParams.get("total") ?? "0").toFixed(2);
	const balance = Number($page.url.searchParams.get("balance") ?? "0").toFixed(2);

	const paymentTypeSelect = $derived(
		$paymentTypeQuery.data?.find((i) => i.paymentTypeId === $formData.paymentTypeId)
			?.paymentTypeName ?? "Select payment type"
	);

	let isPaymentTypeOpen = $state(false);
</script>

<form method="POST" use:enhance>
	<Card.Root class="m-4 mb-12">
		<Card.Header>
			<div class="flex items-center gap-2 justify-end">
				<Card.Description>Total: <Badge>R {total}</Badge></Card.Description>
				<Card.Description>Balance: <Badge>R {balance}</Badge></Card.Description>
			</div>
			<Form.Field {form} name="amount">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Amount</Form.Label>
						<Input
							{...props}
							type="number"
							step="0.01"
							bind:value={$formData.amount}
							onfocus={(e) => e.currentTarget.select()}
						/>
					{/snippet}
				</Form.Control>
				<Form.Description>Enter amount to pay</Form.Description>
				<Form.FieldErrors />
			</Form.Field>
			<Popover.Root bind:open={isPaymentTypeOpen}>
				<Form.Field {form} name="paymentTypeId">
					<Form.Control>
						{#snippet children({ props })}
							<div class="flex flex-col gap-3">
								<Form.Label>Payment Type</Form.Label>
								<Popover.Trigger
									class={cn(
										buttonVariants({ variant: "outline" }),
										" justify-between",
										!$formData.paymentTypeId && "text-muted-foreground"
									)}
									role="combobox"
									{...props}
								>
									{$paymentTypeQuery.data?.find((f) => f.paymentTypeId === $formData.paymentTypeId)
										?.paymentTypeName ?? "Select language"}
									<ChevronsUpDownIcon class="ml-2 size-4 shrink-0 opacity-50" />
								</Popover.Trigger>
								<input hidden value={$formData.paymentTypeId} name={props.name} />
							</div>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Popover.Content class="p-0">
					<Command.Root>
						<Command.Input autofocus placeholder="Search language..." class="h-9" />
						<Command.Empty>No language found.</Command.Empty>
						<Command.Group>
							{#each $paymentTypeQuery.data ?? [] as paymentType}
								<Command.Item
									value={paymentType.paymentTypeName}
									onSelect={() => {
										$formData.paymentTypeId = paymentType.paymentTypeId;
										isPaymentTypeOpen = false;
									}}
								>
									{paymentType.paymentTypeName}
									<CheckIcon
										class={cn(
											"ml-auto size-4",
											paymentType.paymentTypeId !== $formData.paymentTypeId && "text-transparent"
										)}
									/>
								</Command.Item>
							{/each}
						</Command.Group>
					</Command.Root>
				</Popover.Content>
			</Popover.Root>

			<!-- <Form.Field {form} name="paymentTypeId">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Payment Type</Form.Label>
						<Select.Root
							type="single"
							allowDeselect={false}
							onValueChange={(v: number) => {
								v && ($formData.paymentTypeId = v);
							}}
						>
							<Select.Trigger {...props}>
								{paymentTypeSelect}
							</Select.Trigger>
							<Select.Content>
								{#each $paymentTypeQuery.data ?? [] as paymentType}
									<Select.Item value={paymentType.paymentTypeId}
										>{paymentType.paymentTypeName}</Select.Item
									>
								{/each}
							</Select.Content>
						</Select.Root>
						<input hidden bind:value={$formData.paymentTypeId} name={props.name} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field> -->
		</Card.Header>
		<Card.Footer class="flex flex-col gap-2">
			<Button class="w-full" type="submit">Pay</Button>
			<Button class="w-full" href={`/table/bill/${$page.params.id}`} variant="outline">
				Cancel
			</Button>
		</Card.Footer>
	</Card.Root>
</form>
