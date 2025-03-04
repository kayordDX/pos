<script lang="ts">
	import { createStockGetAll, createStockLinkAdd } from "$lib/api";
	import { status } from "$lib/stores/status.svelte";
	import { getError, LinkType } from "$lib/types";
	import { Button, Combobox, Dialog, Form, Select, toast } from "@kayord/ui";
	import QueryBuilder from "fluent-querykit";
	import { defaults, superForm } from "sveltekit-superforms";
	import { zod } from "sveltekit-superforms/adapters";
	import { z } from "zod";

	interface Props {
		open: boolean;
		id: number;
		linkType: LinkType;
		refetch: () => void;
	}
	let { open = $bindable(false), id, linkType, refetch }: Props = $props();

	const schema = z.object({
		stockId: z.number().min(1, { message: "Stock is Required" }),
	});
	type FormSchema = z.infer<typeof schema>;

	const createMutation = createStockLinkAdd();

	const onSubmit = async (data: FormSchema) => {
		try {
			open = false;
			await $createMutation.mutateAsync({
				data: {
					id: id,
					linkType: linkType,
					stockId: data.stockId,
				},
			});
			toast.info("Linked Stock Item");
			refetch();
		} catch (err) {
			toast.error(getError(err).message);
		}
	};

	const form = superForm(defaults(zod(schema)), {
		SPA: true,
		validators: zod(schema),
		onUpdate({ form }) {
			if (form.valid) {
				onSubmit(form.data);
			}
		},
	});

	const { form: formData, enhance, reset } = form;

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
			$stockQuery.refetch();
		}
	});

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
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="max-h-[98%] overflow-scroll">
		<form method="POST" use:enhance>
			<Dialog.Header>
				<Dialog.Title>Link Stock</Dialog.Title>
				<Dialog.Description>Select stock item to link</Dialog.Description>
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
			</div>
			<Dialog.Footer class="gap-2">
				<Button type="submit">Link</Button>
				<Button variant="outline" onclick={() => (open = false)}>Cancel</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
