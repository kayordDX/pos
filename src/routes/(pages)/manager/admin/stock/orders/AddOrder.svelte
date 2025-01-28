<script lang="ts">
	import type { EntitiesStockOrder } from "$lib/api";
	import { getError } from "$lib/types";
	import { Button, Dialog, Form, Input, Select, toast } from "@kayord/ui";
	import { defaults, superForm } from "sveltekit-superforms";
	import { zod } from "sveltekit-superforms/adapters";
	import { z } from "zod";
	import {
		createStockOrderCreate,
		createStockOrderUpdate,
		createSupplierGetAll,
		createStockLocationGetAll,
	} from "$lib/api";
	import { status } from "$lib/stores/status.svelte";

	interface Props {
		refetch: () => void;
		open: boolean;
		order?: EntitiesStockOrder;
	}
	let { refetch, open = $bindable(false), order }: Props = $props();

	const isEdit = $derived(order != null);

	const editMutation = createStockOrderUpdate();
	const createMutation = createStockOrderCreate();

	const suppliersQuery = createSupplierGetAll({ outletId: status.value.outletId });
	const stockLocationQuery = createStockLocationGetAll({ outletId: status.value.outletId });
	const suppliers = $derived($suppliersQuery.data ?? []);
	const stockLocations = $derived($stockLocationQuery.data ?? []);
	const supplierSelect = $derived(
		suppliers.find((i) => i.id === $formData.supplierId)?.name ?? "Select Supplier"
	);
	const stockLocationSelect = $derived(
		stockLocations.find((i) => i.id === $formData.stockLocationId)?.name ?? "Select Stock Location"
	);

	const schema = z.object({
		orderNumber: z.string().min(1, { message: "Order Number is Required" }),
		stockLocationId: z.number().min(1, { message: "Stock Location is Required" }),
		supplierId: z.number().min(1, { message: "Supplier is Required" }),
	});
	type FormSchema = z.infer<typeof schema>;

	const updateMenu = async (data: FormSchema) => {
		try {
			open = false;
			if (isEdit) {
				await $editMutation.mutateAsync({
					data: {
						id: order?.id ?? 0,
						orderNumber: data.orderNumber,
						stockLocationId: data.stockLocationId,
						supplierId: data.supplierId,
					},
				});
				toast.info("Edited Menu");
			} else {
				await $createMutation.mutateAsync({
					data: {
						orderNumber: data.orderNumber,
						outletId: status.value.outletId,
						stockLocationId: data.stockLocationId,
						supplierId: data.supplierId,
					},
				});
				toast.info("Added Menu");
			}
			refetch();
		} catch (err) {
			toast.error(getError(err).message);
		}
	};

	const defaultValues = $derived({
		orderNumber: order?.orderNumber,
		stockLocationId: order?.stockLocationId,
		supplierId: order?.supplierId,
	});

	// svelte-ignore state_referenced_locally
	const form = superForm(defaults(defaultValues, zod(schema)), {
		SPA: true,
		validators: zod(schema),
		onUpdate({ form }) {
			if (form.valid) {
				updateMenu(form.data);
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
				<Dialog.Title>{isEdit ? "Edit" : "Add"} Order</Dialog.Title>
				<Dialog.Description>Complete form to {isEdit ? "Edit" : "Add"} order</Dialog.Description>
			</Dialog.Header>
			<div class="flex flex-col gap-4 p-4">
				<Form.Field {form} name="orderNumber">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Order Number</Form.Label>
							<Input {...props} bind:value={$formData.orderNumber} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="stockLocationId">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Stock Location</Form.Label>
							<Select.Root
								type="single"
								allowDeselect={false}
								onValueChange={(v: number) => {
									v && ($formData.stockLocationId = v);
								}}
							>
								<Select.Trigger {...props}>
									{stockLocationSelect}
								</Select.Trigger>
								<Select.Content>
									{#each stockLocations ?? [] as result}
										<Select.Item value={result.id}>{result.name}</Select.Item>
									{/each}
								</Select.Content>
							</Select.Root>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors class="text-destructive text-sm" />
				</Form.Field>
				<Form.Field {form} name="supplierId">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Supplier</Form.Label>
							<Select.Root
								type="single"
								allowDeselect={false}
								onValueChange={(v: number) => {
									v && ($formData.supplierId = v);
								}}
							>
								<Select.Trigger {...props}>
									{supplierSelect}
								</Select.Trigger>
								<Select.Content>
									{#each suppliers ?? [] as result}
										<Select.Item value={result.id}>{result.name}</Select.Item>
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
