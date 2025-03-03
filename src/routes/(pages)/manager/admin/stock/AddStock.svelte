<script lang="ts">
	import {
		createUnitsGetAll,
		createStockCreate,
		createStockUpdate,
		type StockGetAllResponse,
	} from "$lib/api";
	import { status } from "$lib/stores/status.svelte";
	import { getError } from "$lib/types";
	import { Button, Dialog, Form, Input, Select, toast } from "@kayord/ui";
	import { zod } from "sveltekit-superforms/adapters";
	import { defaults, superForm } from "sveltekit-superforms/client";
	import { z } from "zod";

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
	});
	type FormSchema = z.infer<typeof schema>;

	const unitsQuery = createUnitsGetAll();
	const units = $derived($unitsQuery.data ?? []);
	const unitSelect = $derived(units.find((i) => i.id === $formData.unitId)?.name ?? "Select Unit");

	const onSubmit = async (data: FormSchema) => {
		try {
			open = false;
			if (isEdit) {
				await $editMutation.mutateAsync({
					data: {
						id: stock?.id ?? 0,
						name: data.name,
						unitId: data.unitId,
					},
				});
				toast.info("Edited Stock");
			} else {
				await $createMutation.mutateAsync({
					data: {
						name: data.name,
						unitId: data.unitId,
						outletId: status.value.outletId,
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
	});

	// svelte-ignore state_referenced_locally
	const form = superForm(defaults(defaultValues, zod(schema)), {
		SPA: true,
		validators: zod(schema),
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
	<Dialog.Content class="max-h-[98%] overflow-scroll">
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
			</div>
			<Dialog.Footer class="gap-2">
				<Button type="submit">Submit</Button>
				<Button variant="outline" onclick={() => (open = false)}>Cancel</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
