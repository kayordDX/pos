<script lang="ts">
	import type { EntitiesStockOrderItem } from "$lib/api";
	import { getError } from "$lib/types";
	import { Button, Combobox, Dialog, Form, Input, toast } from "@kayord/ui";
	import { defaults, superForm } from "sveltekit-superforms";
	import { zod } from "sveltekit-superforms/adapters";
	import { z } from "zod";
	import {
		createStockOrderItemCreate,
		createStockOrderItemUpdate,
		createStockGetAll,
	} from "$lib/api";
	import { status } from "$lib/stores/status.svelte";
	import QueryBuilder from "fluent-querykit";
	import { page } from "$app/state";

	interface Props {
		refetch: () => void;
		open: boolean;
		orderItem?: EntitiesStockOrderItem;
	}
	let { refetch, open = $bindable(false), orderItem }: Props = $props();

	const isEdit = $derived(orderItem != null);

	const editMutation = createStockOrderItemUpdate();
	const createMutation = createStockOrderItemCreate();

	const schema = z.object({
		stockId: z.number().min(1, { message: "Stock is Required" }),
		orderAmount: z.coerce.number().min(1, { message: "Order Amount is Required" }),
		price: z.coerce.number().min(1, { message: "Price is Required" }),
	});
	type FormSchema = z.infer<typeof schema>;

	const updateMenu = async (data: FormSchema) => {
		try {
			open = false;
			if (isEdit) {
				// await $editMutation.mutateAsync({
				// 	data: {
				// 		id: order?.id ?? 0,
				// 		orderNumber: data.orderNumber,
				// 		divisionId: data.divisionId,
				// 		supplierId: data.supplierId,
				// 	},
				// });
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
		price: orderItem?.price,
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
		console.log("what", stockSearch);
	});

	$effect(() => {
		const qb = new QueryBuilder(false, false);
		if (stockSearch) {
			qb.containsCaseInsensitive("name", stockSearch);
		}
		filters = qb.build();
	});

	const stockListSelect = $derived(
		stockList.map((s) => ({ value: s.id, label: `${s.name} - (${s.unit.name})` }))
	);
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="max-h-[98%] overflow-scroll">
		<form method="POST" use:enhance>
			<Dialog.Header>
				<Dialog.Title>{isEdit ? "Edit" : "Add"} Order Item</Dialog.Title>
				<Dialog.Description>Complete form to {isEdit ? "Edit" : "Add"} order</Dialog.Description>
			</Dialog.Header>
			<div class="flex flex-col gap-4 p-4">
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

				<Form.Field {form} name="orderAmount">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Order Amount</Form.Label>
							<Input {...props} bind:value={$formData.orderAmount} type="number" step="0.01" />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="price">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Price</Form.Label>
							<Input {...props} bind:value={$formData.price} type="number" step="0.01" />
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
