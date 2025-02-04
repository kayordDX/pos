<script lang="ts">
	import type { EntitiesStockOrderItem } from "$lib/api";
	import { getError } from "$lib/types";
	import {
		Button,
		buttonVariants,
		Command,
		Dialog,
		Form,
		Input,
		Popover,
		Select,
		toast,
	} from "@kayord/ui";
	import { defaults, superForm } from "sveltekit-superforms";
	import { zod } from "sveltekit-superforms/adapters";
	import { z } from "zod";
	import { createStockOrderCreate, createStockOrderUpdate, createStockGetAll } from "$lib/api";
	import { status } from "$lib/stores/status.svelte";
	import { cn } from "@kayord/ui/utils";
	import { Check, ChevronsUpDown } from "lucide-svelte";
	import { tick } from "svelte";
	import QueryBuilder from "fluent-querykit";

	interface Props {
		refetch: () => void;
		open: boolean;
		orderItem?: EntitiesStockOrderItem;
	}
	let { refetch, open = $bindable(false), orderItem }: Props = $props();

	const isEdit = $derived(orderItem != null);

	const editMutation = createStockOrderUpdate();
	const createMutation = createStockOrderCreate();

	const schema = z.object({
		stockId: z.number().min(1, { message: "Stock is Required" }),
		actual: z.coerce.number().min(1, { message: "Actual is Required" }),
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
				// await $createMutation.mutateAsync({
				// 	data: {
				// 		orderNumber: data.orderNumber,
				// 		outletId: status.value.outletId,
				// 		divisionId: data.divisionId,
				// 		supplierId: data.supplierId,
				// 	},
				// });
				toast.info("Added Order Item");
			}
			refetch();
		} catch (err) {
			toast.error(getError(err).message);
		}
	};

	const defaultValues = $derived({
		stockId: orderItem?.stockId,
		actual: orderItem?.actual,
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

	let stockOpen = $state(false);

	let triggerRef = $state<HTMLButtonElement>(null!);

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
	const stockSelect = $derived(
		stockList.find((f) => f.id === $formData.stockId)?.name ?? "Select Stock"
	);

	function closeAndFocusTrigger() {
		stockOpen = false;
		tick().then(() => {
			triggerRef.focus();
		});
	}

	let stockSearch = $state("");

	$effect(() => {
		const qb = new QueryBuilder(false, false);
		if (stockSearch) {
			qb.containsCaseInsensitive("name", stockSearch);
		}
		filters = qb.build();
	});
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
					<Popover.Root bind:open={stockOpen}>
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Stock</Form.Label>
								<Popover.Trigger
									bind:ref={triggerRef}
									class={cn(
										buttonVariants({ variant: "outline" }),
										"w-full justify-between",
										!$formData.stockId && "text-muted-foreground"
									)}
									role="combobox"
									{...props}
								>
									{stockSelect}
									<ChevronsUpDown class="opacity-50" />
								</Popover.Trigger>
								<input hidden value={$formData.stockId} name={props.name} />
							{/snippet}
						</Form.Control>
						<Popover.Content class="p-0">
							<Command.Root shouldFilter={false}>
								<Command.Input
									autofocus
									placeholder="Search Stock..."
									class="h-9"
									bind:value={stockSearch}
								/>
								<Command.Empty>No Stock found.</Command.Empty>
								<Command.Group>
									{#each stockList as s (s.id)}
										<Command.Item
											value={s.name}
											onSelect={() => {
												$formData.stockId = s.id;
												closeAndFocusTrigger();
											}}
										>
											{s.name}
											<Check
												class={cn("ml-auto", s.id !== $formData.stockId && "text-transparent")}
											/>
										</Command.Item>
									{/each}
								</Command.Group>
							</Command.Root>
						</Popover.Content>
					</Popover.Root>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="actual">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Actual</Form.Label>
							<Input {...props} bind:value={$formData.actual} type="number" step="0.01" />
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
