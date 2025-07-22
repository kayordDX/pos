<script lang="ts">
	import { createStockItemsUpdate, type StockItemsGetAllResponse } from "$lib/api";
	import { status } from "$lib/stores/status.svelte";
	import { getError } from "$lib/types";
	import { Button, Dialog, Form, Input, Select, toast } from "@kayord/ui";
	import { zod4 } from "sveltekit-superforms/adapters";
	import { defaults, superForm } from "sveltekit-superforms/client";
	import { z } from "zod";

	interface Props {
		refetch: () => void;
		parentRefetch: () => void;
		open: boolean;
		stockItem: StockItemsGetAllResponse;
	}
	let { refetch, parentRefetch, open = $bindable(false), stockItem }: Props = $props();

	const editMutation = createStockItemsUpdate();

	const schema = z.object({
		threshold: z.number().gte(0, { message: "Threshold cannot be negative" }),
		actual: z.number().gte(0, { message: "Actual cannot be negative" }),
	});
	type FormSchema = z.infer<typeof schema>;

	const onSubmit = async (data: FormSchema) => {
		try {
			open = false;
			await $editMutation.mutateAsync({
				data: {
					actual: data.actual,
					threshold: data.threshold,
					stockId: stockItem.stockId,
					divisionId: stockItem.divisionId,
				},
			});
			toast.info("Updated Stock Item");
			refetch();
			parentRefetch();
		} catch (err) {
			toast.error(getError(err).message);
		}
	};

	const defaultValues = $derived({
		threshold: stockItem?.threshold,
		actual: stockItem?.actual,
	});

	// svelte-ignore state_referenced_locally
	const form = superForm(defaults(defaultValues, zod4(schema)), {
		SPA: true,
		validators: zod4(schema),
		id: `stock-item-${stockItem?.id ?? 0}-${stockItem?.divisionId ?? 0}`,
		onUpdate({ form }) {
			if (form.valid) {
				onSubmit(form.data);
			}
		},
	});

	const { form: formData, enhance, reset } = form;

	$effect(() => {
		if (open == true) {
			reset({ data: defaultValues });
		}
	});
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="max-h-[98%] overflow-auto">
		<form method="POST" use:enhance>
			<Dialog.Header>
				<Dialog.Title>Edit Stock Item Location</Dialog.Title>
				<Dialog.Description>
					{stockItem?.stockName} - {stockItem?.divisionName}
				</Dialog.Description>
			</Dialog.Header>
			<div class="flex flex-col gap-4 p-4">
				<Form.Field {form} name="actual">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Actual</Form.Label>
							<Input {...props} type="number" bind:value={$formData.actual} step="any" />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="threshold">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Threshold</Form.Label>
							<Input {...props} type="number" bind:value={$formData.threshold} step="any" />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>
			<Dialog.Footer class="gap-2">
				<Button type="submit">Submit</Button>
				<Button variant="outline" onclick={() => (open = false)}>Cancel</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
