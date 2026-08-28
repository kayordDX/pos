<script lang="ts">
	import type { DTOStockAllocateItemDTO } from "$lib/api";
	import { getError } from "$lib/types";
	import { Button, Card, Combobox, Dialog, Input, Table } from "@kayord/ui";
	import { toast } from "@kayord/ui/sonner";
	import { Form } from "@kayord/ui/form";
	import { defaults, superForm } from "sveltekit-superforms";
	import { zod4 } from "sveltekit-superforms/adapters";
	import { z } from "zod";
	import {
		createStockAllocateItemCreate,
		createStockAllocateItemUpdate,
		createStockGetAllDivision,
		createStockItemsGet,
	} from "$lib/api";

	import QueryBuilder from "fluent-querykit";
	import { page } from "$app/state";

	interface Props {
		refetch: () => void;
		open: boolean;
		divisionId: number;
		allocateItem?: DTOStockAllocateItemDTO;
	}
	let { refetch, open = $bindable(false), divisionId, allocateItem }: Props = $props();

	const isEdit = $derived(allocateItem != null);

	const editMutation = createStockAllocateItemUpdate();
	const createMutation = createStockAllocateItemCreate();

	const schema = z.object({
		stockId: z.number().min(1, { message: "Stock is Required" }),
		actual: z.coerce.number().min(0, { message: "Actual is Required" }),
	});

	type FormSchema = z.infer<typeof schema>;

	const updateMenu = async (data: FormSchema) => {
		try {
			open = false;
			if (isEdit) {
				await editMutation.mutateAsync({
					data: {
						id: allocateItem?.id ?? 0,
						stockId: data.stockId,
						actual: data.actual,
					},
				});
				toast.info("Edited Allocation Item");
			} else {
				await createMutation.mutateAsync({
					data: {
						stockAllocateId: Number(page.params.Id),
						stockId: data.stockId,
						actual: data.actual,
					},
				});
				toast.info("Added Allocation Item");
			}
			refetch();
		} catch (err) {
			toast.error(getError(err).message);
		}
	};

	const defaultValues = $derived({
		stockId: allocateItem?.stockId,
		actual: allocateItem?.actual ?? 0,
	});

	// svelte-ignore state_referenced_locally
	const form = superForm(defaults(defaultValues, zod4(schema)), {
		SPA: true,
		validators: zod4(schema),
		id: `allocate-item-${allocateItem?.stockId ?? 0}-${allocateItem?.stockId ?? 0}`,
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
	const stockQuery = createStockGetAllDivision(() => ({
		page: 1,
		pageSize: 10,
		filters,
		sorts: "",
		divisionId: divisionId,
	}));

	const stockList = $derived(stockQuery.data?.items ?? []);

	let stockSearch = $state("");

	$effect(() => {
		const qb = new QueryBuilder(false, false);
		if (stockSearch) {
			qb.containsCaseInsensitive("name", stockSearch);
		}
		filters = qb.build();
	});

	const stockListSelect = $derived(
		stockList.map((s) => ({ value: s.stockId, label: `${s.name} - (${s.unitName})` }))
	);

	const last = createStockItemsGet(
		() => $formData.stockId ?? 0,
		() => divisionId,
		() => ({
			query: { enabled: ($formData.stockId ?? 0) > 0 },
		})
	);
	const lastData = $derived(last.data);
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="max-h-[98%] overflow-auto">
		<form method="POST" use:enhance>
			<Dialog.Header>
				<Dialog.Title>{isEdit ? "Edit" : "Add"} Allocation Item</Dialog.Title>
				<Dialog.Description
					>Complete form to {isEdit ? "Edit" : "Add"} allocation</Dialog.Description
				>
			</Dialog.Header>
			<div class="flex flex-col gap-4 p-4">
				{#if isEdit}
					<Card.Root class="p-2">
						{allocateItem?.stock.name}
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
							<Table.Cell class="text-sm text-muted-foreground p-1">
								Current Division Stock
							</Table.Cell>
							<Table.Cell class="text-right p-1">{lastData?.actual ?? 0}</Table.Cell>
						</Table.Row>
					</Table.Body>
				</Table.Root>

				<Form.Field {form} name="actual">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Allocate Actual</Form.Label>
							<Input {...props} bind:value={$formData.actual} type="number" step="any" />
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
