<script lang="ts">
	import { createAdjustmentCreate, createAdjustmentGetAll } from "$lib/api";
	import { Alert, Button, Drawer, Form, Input, Select, Textarea } from "@kayord/ui";
	import { zod } from "sveltekit-superforms/adapters";
	import { defaults, superForm } from "sveltekit-superforms/client";
	import { z } from "zod";
	import { Field, Control, FieldErrors } from "@kayord/ui/formsnap";
	import Error from "$lib/components/Error.svelte";
	import { getError } from "$lib/types";
	import { status } from "$lib/stores/status";
	import { MessageCircleWarningIcon, SquareDotIcon } from "lucide-svelte";

	interface Props {
		tableBookingId: number;
		open?: boolean;
		refetch: () => void;
	}

	let { tableBookingId, open = $bindable(false), refetch }: Props = $props();

	const schema = z.object({
		adjustmentTypeId: z.coerce.number().min(1, { message: "Type is Required" }),
		amount: z.coerce.number().refine((x) => x !== 0, { message: "Amount cannot be 0" }),
		note: z.string(),
	});
	type FormSchema = z.infer<typeof schema>;

	const mutation = createAdjustmentCreate();

	const onSubmit = async (data: FormSchema) => {
		await $mutation.mutateAsync({
			data: {
				tableBookingId: tableBookingId,
				adjustmentTypeId: data.adjustmentTypeId,
				amount: data.amount,
				note: data.note,
			},
		});
		open = false;
		refetch();
	};

	const form = superForm(defaults({ amount: 0 }, zod(schema)), {
		SPA: true,
		validators: zod(schema),
		onUpdate({ form }) {
			if (form.valid) {
				onSubmit(form.data);
			}
		},
	});

	const { form: formData, enhance } = form;

	let query = $derived(createAdjustmentGetAll($status.outletId, { query: { enabled: open } }));
</script>

<Drawer.Root bind:open>
	<Drawer.Trigger>
		<Button class="w-full" variant="secondary">
			<SquareDotIcon class="size-4 mr-2" /> Manual Adjustment
		</Button>
	</Drawer.Trigger>
	<Drawer.Content class="fixed bottom-0 left-0 right-0 flex max-h-[96%] w-full">
		<form use:enhance method="POST">
			<Drawer.Header>
				<Drawer.Title>Make Adjustment</Drawer.Title>
				<Drawer.Description>
					This will apply a discount or change the price of the bill
				</Drawer.Description>
			</Drawer.Header>
			<div class="flex flex-col gap-5 p-4 pt-0">
				<Field {form} name="adjustmentTypeId">
					<Control let:attrs>
						<Form.Label>Type</Form.Label>
						<Select.Root
							selected={{
								value: $formData.adjustmentTypeId,
								label: $query.data?.find((i) => i.adjustmentTypeId === $formData.adjustmentTypeId)
									?.name,
							}}
							onSelectedChange={(v) => {
								v && ($formData.adjustmentTypeId = v.value);
							}}
						>
							<Select.Trigger {...attrs}>
								<Select.Value placeholder="Select adjustment type" />
							</Select.Trigger>
							<Select.Content>
								{#each $query.data ?? [] as result}
									<Select.Item value={result.adjustmentTypeId}>{result.name}</Select.Item>
								{/each}
							</Select.Content>
						</Select.Root>
						<input hidden bind:value={$formData.adjustmentTypeId} name={attrs.name} />
					</Control>
					<FieldErrors class="text-destructive text-sm" />
				</Field>
				<Field {form} name="amount">
					<Control let:attrs>
						<Form.Label>Amount</Form.Label>
						<Input
							{...attrs}
							bind:value={$formData.amount}
							tabindex={0}
							type="number"
							step="0.01"
							on:focus={(e) => e.currentTarget.select()}
						/>
					</Control>
					<FieldErrors class="text-destructive text-sm" />
				</Field>
				<Alert.Root class="border-primary">
					<MessageCircleWarningIcon class="size-5 animate-bounce text-primary" />
					<Alert.Title>Heads up!</Alert.Title>
					<Alert.Description>
						The amount of <span class="font-semibold">R{Number($formData.amount).toFixed(2)}</span>
						will be
						{$formData.amount > 0 ? "added to" : "removed from"} the bill.
					</Alert.Description>
				</Alert.Root>
				<Field {form} name="note">
					<Control let:attrs>
						<Form.Label>Note</Form.Label>
						<Textarea {...attrs} bind:value={$formData.note} tabindex={0} />
					</Control>
					<FieldErrors class="text-destructive text-sm" />
				</Field>
			</div>
			<Drawer.Footer>
				{#if $mutation.isError}
					<Error message={getError($mutation.error).message} />
				{/if}
				<Button type="submit">Add</Button>
			</Drawer.Footer>
		</form>
	</Drawer.Content>
</Drawer.Root>
