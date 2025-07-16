<script lang="ts">
	import { createOutletGetPaymentType, createTableBookingPaymentEdit } from "$lib/api";
	import { status } from "$lib/stores/status.svelte";
	import { getError } from "$lib/types";
	import { Button, Dialog, Form, Select, toast, Input } from "@kayord/ui";
	import { PencilIcon } from "@lucide/svelte";
	import { zod4 } from "sveltekit-superforms/adapters";
	import { defaults, superForm } from "sveltekit-superforms/client";
	import { z } from "zod";

	interface Props {
		paymentId: number;
		paymentTypeId: number;
		amount: number;
		refetch: () => void;
	}

	let { refetch, paymentId, paymentTypeId, amount }: Props = $props();
	let open = $state(false);

	const paymentTypeQuery = createOutletGetPaymentType(status.value?.outletId ?? 0);

	const mutation = createTableBookingPaymentEdit();

	export const schema = z.object({
		paymentTypeId: z.number().min(1, { message: "Please select PaymentTypeId" }),
		amount: z.number().min(0, { message: "Please enter amount" }),
	});
	type FormSchema = z.infer<typeof schema>;

	const onSubmit = async (data: FormSchema) => {
		try {
			await $mutation.mutateAsync({
				data: {
					paymentId: paymentId,
					paymentTypeId: data.paymentTypeId,
					amount: data.amount,
				},
			});
			open = false;
			refetch();
		} catch (error) {
			toast.error(getError(error).message);
		}
	};

	const form = superForm(defaults({ paymentTypeId, amount }, zod4(schema)), {
		SPA: true,
		validators: zod4(schema),
		resetForm: false,
		onUpdate({ form }) {
			if (form.valid) {
				onSubmit(form.data);
			}
		},
	});
	const { form: formData, enhance } = form;

	const paymentTypeSelect = $derived(
		$paymentTypeQuery.data?.find((i) => i.paymentTypeId === $formData.paymentTypeId)
			?.paymentTypeName ?? "Select payment type"
	);
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger>
		<Button class="size-6" variant="secondary" size="icon">
			<PencilIcon class="size-3 text-secondary-foreground" />
		</Button>
	</Dialog.Trigger>
	<Dialog.Content>
		<form method="POST" use:enhance>
			<Dialog.Header>
				<Dialog.Title>Change Payment Type</Dialog.Title>
				<Dialog.Description>This will change payment to different type</Dialog.Description>
			</Dialog.Header>
			<div class="m-4">
				<Form.Field {form} name="paymentTypeId">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Payment Type</Form.Label>
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
							<Select.Root
								type="single"
								allowDeselect={false}
								onValueChange={(v: string) => {
									v && ($formData.paymentTypeId = Number(v));
								}}
							>
								<Select.Trigger {...props}>
									{paymentTypeSelect}
								</Select.Trigger>
								<Select.Content>
									{#each $paymentTypeQuery.data ?? [] as paymentType}
										{#if paymentType.canEdit}
											<Select.Item value={paymentType.paymentTypeId.toString()}>
												{paymentType.paymentTypeName}
											</Select.Item>
										{/if}
									{/each}
								</Select.Content>
							</Select.Root>
							<input hidden bind:value={$formData.paymentTypeId} name={props.name} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>
			<Dialog.Footer class="sm:flex-col gap-2">
				<Form.Button type="submit">Update</Form.Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
