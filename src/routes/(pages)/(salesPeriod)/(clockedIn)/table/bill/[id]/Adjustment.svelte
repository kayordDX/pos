<script lang="ts">
	import { createAdjustmentCreate, createAdjustmentGetAll } from "$lib/api";
	import { Alert, Button, Dialog, Form, Input, Select, Textarea } from "@kayord/ui";
	import { zod } from "sveltekit-superforms/adapters";
	import { defaults, superForm } from "sveltekit-superforms/client";
	import { z } from "zod";
	import { Field, Control, FieldErrors } from "@kayord/ui/formsnap";
	import Error from "$lib/components/Error.svelte";
	import { getError } from "$lib/types";
	import { status } from "$lib/stores/status.svelte";
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

	const query = $derived(
		createAdjustmentGetAll(status.value.outletId, { query: { enabled: open } })
	);
	const typeSelect = $derived(
		$query.data?.find((i) => i.adjustmentTypeId === $formData.adjustmentTypeId)?.name ??
			"Select adjustment type"
	);
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger>
		<Button class="w-full" variant="secondary">
			<SquareDotIcon class="size-4 mr-2" /> Manual Adjustment
		</Button>
	</Dialog.Trigger>
	<!-- fixed bottom-0 left-0 right-0 flex max-h-[96%] w-full -->
	<Dialog.Content class="max-h-[98%] overflow-scroll">
		<form use:enhance method="POST">
			<Dialog.Header class="mb-4">
				<Dialog.Title>Make Adjustment</Dialog.Title>
				<Dialog.Description>
					This will apply a discount or change the price of the bill
				</Dialog.Description>
			</Dialog.Header>
			<div class="flex flex-col gap-5 p-4 pt-0">
				<Field {form} name="adjustmentTypeId">
					<Control>
						{#snippet children({ props })}
							<Form.Label>Type</Form.Label>
							<Select.Root
								type="single"
								allowDeselect={false}
								onValueChange={(v: string) => {
									v && ($formData.adjustmentTypeId = Number(v));
								}}
							>
								<Select.Trigger {...props}>
									{typeSelect}
								</Select.Trigger>
								<Select.Content>
									{#each $query.data ?? [] as result}
										<Select.Item value={result.adjustmentTypeId.toString()}
											>{result.name}</Select.Item
										>
									{/each}
								</Select.Content>
							</Select.Root>
							<input hidden bind:value={$formData.adjustmentTypeId} name={props.name} />
						{/snippet}
					</Control>
					<FieldErrors class="text-destructive text-sm" />
				</Field>
				<Field {form} name="amount">
					<Control>
						{#snippet children({ props })}
							<Form.Label>Amount</Form.Label>
							<Input
								{...props}
								bind:value={$formData.amount}
								tabindex={0}
								type="number"
								step="0.01"
								onfocus={(e) => e.currentTarget.select()}
							/>
						{/snippet}
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
					<Control>
						{#snippet children({ props })}
							<Form.Label>Note</Form.Label>
							<Textarea {...props} bind:value={$formData.note} tabindex={0} />
						{/snippet}
					</Control>
					<FieldErrors class="text-destructive text-sm" />
				</Field>
			</div>
			<Dialog.Footer class="sm:flex-col gap-2">
				{#if $mutation.isError}
					<Error message={getError($mutation.error).message} />
				{/if}
				<Button type="submit">Add</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
