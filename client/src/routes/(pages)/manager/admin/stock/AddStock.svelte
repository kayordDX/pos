<script lang="ts">
	import {
		createUnitsGetAll,
		createStockCreate,
		createStockUpdate,
		createStockCategory,
		type StockGetAllResponse,
	} from "$lib/api";
	import { status } from "$lib/stores/status.svelte";
	import { getError } from "$lib/types";
	import { Button, Checkbox, Dialog, Input, Select } from "@kayord/ui";
	import { toast } from "@kayord/ui/sonner";
	import { Form } from "@kayord/ui/form";
	import { zod4 } from "sveltekit-superforms/adapters";
	import { defaults, superForm } from "sveltekit-superforms/client";
	import { z } from "zod";
	import { id } from "zod/v4/locales";

	interface Props {
		refetch: () => void;
		open: boolean;
		stock?: StockGetAllResponse;
	}
	let { refetch, open = $bindable(false), stock }: Props = $props();

	const isEdit = $derived(stock != null);

	const editMutation = createStockUpdate();
	const createMutation = createStockCreate();

	const schema = z.object({
		name: z.string().min(1, { message: "Stock Name is Required" }),
		unitId: z.number().min(1, { message: "Unit is Required" }),
		hasVat: z.boolean(),
		stockCategoryId: z.number().min(1, { message: "Stock Category is Required" }),
	});
	type FormSchema = z.infer<typeof schema>;

	const categoryQuery = createStockCategory(() => status.value.outletId);
	const category = $derived(categoryQuery.data ?? []);
	const categorySelect = $derived(
		category.find((i) => i.id === $formData.stockCategoryId)?.displayName ?? "Select Category"
	);

	const unitsQuery = createUnitsGetAll();
	const units = $derived(unitsQuery.data ?? []);
	const unitSelect = $derived(units.find((i) => i.id === $formData.unitId)?.name ?? "Select Unit");

	const onSubmit = async (data: FormSchema) => {
		try {
			open = false;
			if (isEdit) {
				await editMutation.mutateAsync({
					data: {
						id: stock?.id ?? 0,
						name: data.name,
						unitId: data.unitId,
						hasVat: data.hasVat,
						stockCategoryId: data.stockCategoryId,
					},
				});
				toast.info("Edited Stock");
			} else {
				await createMutation.mutateAsync({
					data: {
						name: data.name,
						unitId: data.unitId,
						outletId: status.value.outletId,
						hasVat: data.hasVat,
						stockCategoryId: data.stockCategoryId,
					},
				});
				toast.info("Added Stock");
			}
			refetch();
		} catch (err) {
			toast.error(getError(err).message);
		}
	};

	const defaultValues = $derived({
		name: stock?.name,
		unitId: stock?.unitId,
		hasVat: stock?.hasVat ?? true,
		stockCategoryId: stock?.stockCategoryId ?? 0,
	});

	// svelte-ignore state_referenced_locally
	const form = superForm(defaults(defaultValues, zod4(schema)), {
		SPA: true,
		validators: zod4(schema),
		id: `stock-${stock?.id ?? 0}`,
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
				<Dialog.Title>{isEdit ? "Edit" : "Add"} Stock</Dialog.Title>
				<Dialog.Description>Complete form to {isEdit ? "Edit" : "Add"} stock</Dialog.Description>
			</Dialog.Header>
			<div class="flex flex-col gap-4 p-4">
				<Form.Field {form} name="name">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Name</Form.Label>
							<Input {...props} bind:value={$formData.name} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="unitId">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Unit</Form.Label>
							<Select.Root
								type="single"
								allowDeselect={false}
								onValueChange={(v: string) => {
									v && ($formData.unitId = Number(v));
								}}
							>
								<Select.Trigger {...props}>
									{unitSelect}
								</Select.Trigger>
								<Select.Content>
									{#each units ?? [] as result}
										<Select.Item value={result.id.toString()}>
											{result.name}
										</Select.Item>
									{/each}
								</Select.Content>
							</Select.Root>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors class="text-destructive text-sm" />
				</Form.Field>
				<Form.Field {form} name="stockCategoryId">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Category</Form.Label>
							<Select.Root
								type="single"
								allowDeselect={false}
								onValueChange={(v: string) => {
									v && ($formData.stockCategoryId = Number(v));
								}}
							>
								<Select.Trigger {...props}>
									{categorySelect}
								</Select.Trigger>
								<Select.Content>
									{#each category ?? [] as result}
										<Select.Item value={result.id.toString()}>
											{result.displayName}
										</Select.Item>
									{/each}
								</Select.Content>
							</Select.Root>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors class="text-destructive text-sm" />
				</Form.Field>
				<Form.Field {form} name="hasVat">
					<Form.Control>
						{#snippet children({ props })}
							<div class="flex items-center gap-2">
								<Checkbox {...props} bind:checked={$formData.hasVat} />
								<Form.Label>VAT</Form.Label>
							</div>
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
