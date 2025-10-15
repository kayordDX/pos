<script lang="ts">
	import { createStockGetAll, createStockLinkAdd, createStockLinkUpdate } from "$lib/api";
	import { status } from "$lib/stores/status.svelte";
	import { getError, LinkType } from "$lib/types";
	import { Button, Card, Combobox, Dialog, Input } from "@kayord/ui";
	import { toast } from "@kayord/ui/sonner";
	import { Form } from "@kayord/ui/form";
	import QueryBuilder from "fluent-querykit";
	import { defaults, superForm } from "sveltekit-superforms";
	import { zod4 } from "sveltekit-superforms/adapters";
	import { z } from "zod";

	interface Props {
		open: boolean;
		id: number;
		linkType: LinkType;
		refetch: () => void;
		stockId?: number;
		stockName?: string;
		unitName?: string;
		quantity?: number;
	}
	let {
		open = $bindable(false),
		id,
		linkType,
		refetch,
		stockId,
		quantity,
		stockName,
		unitName,
	}: Props = $props();

	const schema = z.object({
		stockId: z.number().min(1, { message: "Stock is Required" }),
		quantity: z.number().gte(0, { message: "Quantity cannot be negative" }),
	});
	type FormSchema = z.infer<typeof schema>;

	const createMutation = createStockLinkAdd();
	const editMutation = createStockLinkUpdate();

	const isEdit = $derived(stockId != null);

	const onSubmit = async (data: FormSchema) => {
		try {
			open = false;
			stockSearch = "";
			if (isEdit) {
				await editMutation.mutateAsync({
					data: {
						id: id,
						linkType: linkType,
						stockId: data.stockId,
						quantity: data.quantity,
					},
				});
				toast.info("Edited Linked Stock Item");
			} else {
				await createMutation.mutateAsync({
					data: {
						id: id,
						linkType: linkType,
						stockId: data.stockId,
						quantity: data.quantity,
					},
				});
				toast.info("Linked Stock Item");
			}
			refetch();
		} catch (err) {
			toast.error(getError(err).message);
		}
	};

	const defaultValues = $derived({
		stockId: stockId ?? 0,
		quantity: quantity ?? 0,
	});

	// svelte-ignore state_referenced_locally
	const form = superForm(defaults(defaultValues, zod4(schema)), {
		SPA: true,
		validators: zod4(schema),
		id: `stock-link-${id}-${stockId}`,
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

	let filters = $state("");
	const stockQuery = $derived(
		createStockGetAll(
			{
				page: 1,
				pageSize: 10,
				filters,
				sorts: "",
				outletId: status.value.outletId,
			},
			{ query: { enabled: false } }
		)
	);

	$effect(() => {
		if (open) {
			stockQuery.refetch();
		}
	});

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
		stockList.map((s) => ({ value: s.id, label: `${s.name} - (${s.unitName})` }))
	);
</script>

<Dialog.Root
	bind:open
	onOpenChange={(o) => {
		if (o == false) stockSearch = "";
	}}
>
	<Dialog.Content class="max-h-[98%] overflow-auto flex-col z-60">
		<form method="POST" use:enhance>
			<Dialog.Header>
				<Dialog.Title>Link Stock</Dialog.Title>
				<Dialog.Description>Select stock item to link</Dialog.Description>
			</Dialog.Header>
			<div class="flex flex-col gap-4 p-4">
				{#if isEdit}
					<Card.Root class="p-2">
						{stockName} - ({unitName})
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
									popoverClass="z-70"
									{...props}
								/>
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
				{/if}
				<Form.Field {form} name="quantity">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Quantity</Form.Label>
							<Input
								{...props}
								bind:value={$formData.quantity}
								tabindex={0}
								type="number"
								step="any"
								onfocus={(e) => e.currentTarget.select()}
							/>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors class="text-destructive text-sm" />
				</Form.Field>
			</div>
			<Dialog.Footer>
				<div class="gap-2 flex flex-col w-full">
					<Button type="submit">{isEdit ? "Edit" : "Link"}</Button>
				</div>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
