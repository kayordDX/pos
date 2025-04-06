<script lang="ts">
	import type { DTOStockOrderItemDTO } from "$lib/api";
	import { getError } from "$lib/types";
	import { Button, Card, Combobox, Dialog, Form, Input, Select, Table, toast } from "@kayord/ui";
	import { defaults, superForm } from "sveltekit-superforms";
	import { zod } from "sveltekit-superforms/adapters";
	import { z } from "zod";
	import {
		createStockOrderItemCreate,
		createStockOrderItemUpdate,
		createStockGetAll,
		createStockOrderItemStatus,
		createStockOrderItemLastPrice,
	} from "$lib/api";
	import { status } from "$lib/stores/status.svelte";
	import QueryBuilder from "fluent-querykit";
	import { page } from "$app/state";

	interface Props {
		refetch: () => void;
		open: boolean;
		orderItem?: DTOStockOrderItemDTO;
	}
	let { refetch, open = $bindable(false), orderItem }: Props = $props();

	const isEdit = $derived(orderItem != null);

	const editMutation = createStockOrderItemUpdate();
	const createMutation = createStockOrderItemCreate();

	const itemStatusQuery = createStockOrderItemStatus();
	const itemStatus = $derived($itemStatusQuery.data ?? []);

	const itemStatusValue = $derived(itemStatus.find((i) => i.id == $formData.statusId)?.name);

	const schema = z.object({
		stockId: z.number().min(1, { message: "Stock is Required" }),
		orderAmount: z.coerce.number().gt(0, { message: "Order Amount is Required" }),
		actual: z.coerce.number().min(0, { message: "Actual is Required" }),
		price: z.coerce.number().gt(0, { message: "Price is Required" }),
		statusId: z.number().min(1, { message: "Status is Required" }),
	});

	type FormSchema = z.infer<typeof schema>;

	const updateMenu = async (data: FormSchema) => {
		try {
			open = false;
			if (isEdit) {
				await $editMutation.mutateAsync({
					data: {
						stockId: data.stockId,
						stockOrderId: Number(page.params.Id),
						orderAmount: data.orderAmount,
						actual: data.actual,
						price: data.price,
						stockOrderItemStatusId: data.statusId,
					},
				});
				toast.info("Edited Order Item");
			} else {
				await $createMutation.mutateAsync({
					data: {
						stockOrderId: Number(page.params.Id),
						stockId: data.stockId,
						orderAmount: data.orderAmount,
						price: data.price,
					},
				});
				toast.info("Added Order Item");
			}
			refetch();
		} catch (err) {
			toast.error(getError(err).message);
		}
	};

	const defaultValues = $derived({
		stockId: orderItem?.stockId,
		orderAmount: orderItem?.orderAmount,
		actual: orderItem?.actual ?? 0,
		price: orderItem?.price,
		statusId: orderItem?.stockOrderItemStatusId ?? 1,
	});

	// svelte-ignore state_referenced_locally
	const form = superForm(defaults(defaultValues, zod(schema)), {
		SPA: true,
		validators: zod(schema),
		id: `order-item-${orderItem?.stockId ?? 0}-${orderItem?.stockOrderId ?? 0}`,
		onUpdate({ form }) {
			if (form.valid) {
				updateMenu(form.data);
			}
		},
	});

	const { form: formData, enhance, reset, validateForm } = form;

	$effect(() => {
		if (open == true) {
			reset({ data: defaultValues });
			validateForm({ update: true });
		}
	});

	let filters = $state("");
	const stockQuery = $derived(
		createStockGetAll({
			page: 1,
			pageSize: 10,
			filters,
			sorts: "",
			outletId: status.value.outletId,
		})
	);

	const stockList = $derived($stockQuery.data?.items ?? []);

	let stockSearch = $state("");

	$effect(() => {
		const qb = new QueryBuilder(false, false);
		if (stockSearch) {
			qb.containsCaseInsensitive("name", stockSearch);
		}
		filters = qb.build();
	});

	const stockListSelect = $derived(
		stockList.map((s) => ({ value: s.id, label: `${s.name} - (${s.unitName})` }))
	);

	const pricePerUnit = $derived(
		isNaN($formData.price / $formData.orderAmount) ? 0 : $formData.price / $formData.orderAmount
	);

	const last = $derived(
		createStockOrderItemLastPrice(
			{
				stockId: $formData.stockId ?? 0,
				stockOrderId: Number(page.params.Id),
			},
			{ query: { enabled: ($formData.stockId ?? 0) > 0 } }
		)
	);
	const lastPriceData = $derived($last.data ?? { lastPrice: 0, totalAmount: 0 });
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="max-h-[98%] overflow-auto">
		<form method="POST" use:enhance>
			<Dialog.Header>
				<Dialog.Title>{isEdit ? "Edit" : "Add"} Order Item</Dialog.Title>
				<Dialog.Description>Complete form to {isEdit ? "Edit" : "Add"} order</Dialog.Description>
			</Dialog.Header>
			<div class="flex flex-col gap-4 p-4">
				{#if isEdit}
					<Card.Root class="p-2">
						{orderItem?.stock.name}
					</Card.Root>
				{:else}
					<Form.Field {form} name="stockId" class="flex flex-col">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Stock</Form.Label>
								<Combobox
									bind:value={$formData.stockId}
									items={stockListSelect}
									bind:search={stockSearch}
									shouldFilter={false}
									{...props}
								/>
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
				{/if}

				<Table.Root>
					<Table.Body>
						<Table.Row class="border-none">
							<Table.Cell class="text-sm text-muted-foreground p-1">Current Total Stock</Table.Cell>
							<Table.Cell class="text-right p-1">{lastPriceData.totalAmount}</Table.Cell>
						</Table.Row>
					</Table.Body>
				</Table.Root>

				{#if isEdit}
					<Form.Field {form} name="orderAmount">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Order Amount</Form.Label>
								<Input {...props} bind:value={$formData.orderAmount} type="number" step="any" />
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
				{:else}
					<Form.Field {form} name="orderAmount">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Order Amount</Form.Label>
								<Input {...props} bind:value={$formData.orderAmount} type="number" step="any" />
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
				{/if}

				{#if isEdit}
					<Form.Field {form} name="actual">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Actual</Form.Label>
								<Input {...props} bind:value={$formData.actual} type="number" step="any" />
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
				{/if}

				<Form.Field {form} name="price">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Price</Form.Label>
							<Input {...props} bind:value={$formData.price} type="number" step="0.01" />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
					<Table.Root>
						<Table.Body>
							<Table.Row class="border-none">
								<Table.Cell class="text-sm text-muted-foreground p-1">
									Previous price per unit
								</Table.Cell>
								<Table.Cell class="text-right p-1">
									R {lastPriceData.lastPrice.toFixed(2)}
								</Table.Cell>
							</Table.Row>
							<Table.Row class="border-none">
								<Table.Cell class="text-sm text-muted-foreground p-1">
									Current price per unit
								</Table.Cell>
								<Table.Cell class="text-right p-1">R {pricePerUnit.toFixed(2)}</Table.Cell>
							</Table.Row>
						</Table.Body>
					</Table.Root>
				</Form.Field>
				{#if isEdit}
					<Form.Field {form} name="statusId">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Status</Form.Label>
								<Select.Root
									type="single"
									name="itemStatusId"
									bind:value={
										() => $formData.statusId.toString(), (v) => ($formData.statusId = Number(v))
									}
									allowDeselect={false}
								>
									<Select.Trigger {...props}>
										{itemStatusValue ? itemStatusValue : "Select Status"}
									</Select.Trigger>
									<Select.Content>
										{#each itemStatus as status}
											<Select.Item value={status.id.toString()}>{status.name}</Select.Item>
										{/each}
									</Select.Content>
								</Select.Root>
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
				{/if}
			</div>
			<Dialog.Footer class="gap-2">
				<Button type="submit">Submit</Button>
				<Button variant="outline" onclick={() => (open = false)}>Cancel</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
