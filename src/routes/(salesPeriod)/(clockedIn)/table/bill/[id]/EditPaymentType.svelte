<script lang="ts">
	import { page } from "$app/stores";
	import {
		createCashUpUserCreate,
		createCashUpUserItemType,
		createOutletGetPaymentType,
		createTableBookingPaymentType,
	} from "$lib/api";
	import { status } from "$lib/stores/status";
	import { Button, Drawer, Form, Input, Select } from "@kayord/ui";
	import { PencilIcon, PlusIcon } from "lucide-svelte";
	import { zod } from "sveltekit-superforms/adapters";
	import { defaults, superForm } from "sveltekit-superforms/client";
	import { z } from "zod";

	interface Props {
		paymentId: number;
		refetch: () => void;
	}

	let { refetch, paymentId }: Props = $props();
	let open = $state(false);

	const query = createCashUpUserItemType({ isAuto: false });
	const paymentTypeQuery = createOutletGetPaymentType($status?.outletId ?? 0);

	const mutation = createTableBookingPaymentType();

	export const schema = z.object({
		paymentTypeId: z.number().min(1, { message: "Please select PaymentTypeId" }),
	});
	type FormSchema = z.infer<typeof schema>;

	const onSubmit = async (data: FormSchema) => {
		await $mutation.mutateAsync({
			data: {
				paymentId: paymentId,
				paymentTypeId: data.paymentTypeId,
			},
		});
		open = false;
		refetch();
	};

	const form = superForm(defaults({ paymentTypeId: paymentId }, zod(schema)), {
		SPA: true,
		validators: zod(schema),
		onUpdate({ form }) {
			if (form.valid) {
				onSubmit(form.data);
			}
		},
	});
	const { form: formData, enhance } = form;
</script>

<Drawer.Root bind:open>
	<Drawer.Trigger class="w-full">
		<Button class="size-6" variant="secondary" size="icon" on:click={() => {}}>
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
			</div>
			<Drawer.Footer>
				<Form.Button type="submit">Update</Form.Button>
				<Drawer.Close>Cancel</Drawer.Close>
			</Drawer.Footer>
		</form>
	</Drawer.Content>
</Drawer.Root>
