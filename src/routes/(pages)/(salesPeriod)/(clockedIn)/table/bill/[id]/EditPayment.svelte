<script lang="ts">
	import { createOutletGetPaymentType, createTableBookingPaymentEdit } from "$lib/api";
	import { status } from "$lib/stores/status";
	import { getError } from "$lib/types";
	import { Button, Drawer, Form, Select, toast, Input } from "@kayord/ui";
	import { PencilIcon } from "lucide-svelte";
	import { zod } from "sveltekit-superforms/adapters";
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

	const paymentTypeQuery = createOutletGetPaymentType($status?.outletId ?? 0);

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

	const form = superForm(defaults({ paymentTypeId, amount }, zod(schema)), {
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

<Drawer.Root bind:open>
	<Drawer.Trigger>
		<Button class="size-6" variant="secondary" size="icon">
			<PencilIcon class="size-3 text-secondary-foreground" />
		</Button>
	</Drawer.Trigger>
	<Drawer.Content>
		<form method="POST" use:enhance>
			<Drawer.Header>
				<Drawer.Title>Change Payment Type</Drawer.Title>
				<Drawer.Description>This will change payment to different type</Drawer.Description>
			</Drawer.Header>
			<div class="m-4">
				<Form.Field {form} name="paymentTypeId">
					<Form.Control let:attrs>
						<Form.Label>Payment Type</Form.Label>
						<Form.Field {form} name="amount">
							<Form.Control let:attrs>
								<Form.Label>Amount</Form.Label>
								<Input
									{...attrs}
									type="number"
									step="0.01"
									bind:value={$formData.amount}
									on:focus={(e) => e.currentTarget.select()}
								/>
							</Form.Control>
							<Form.Description>Enter amount to pay</Form.Description>
							<Form.FieldErrors />
						</Form.Field>
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
									{#if paymentType.canEdit}
										<Select.Item value={paymentType.paymentTypeId}>
											{paymentType.paymentTypeName}
										</Select.Item>
									{/if}
								{/each}
							</Select.Content>
						</Select.Root>
						<input hidden bind:value={$formData.paymentTypeId} name={attrs.name} />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>
			<Drawer.Footer>
				<Form.Button type="submit">Update</Form.Button>
				<Drawer.Close>Cancel</Drawer.Close>
			</Drawer.Footer>
		</form>
	</Drawer.Content>
</Drawer.Root>
