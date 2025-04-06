<script lang="ts">
	import type { DTOStockAllocateDTO } from "$lib/api";
	import { getError } from "$lib/types";
	import { Button, Dialog, Form, Input, Label, Select, Switch, toast } from "@kayord/ui";
	import { defaults, superForm } from "sveltekit-superforms";
	import { zod } from "sveltekit-superforms/adapters";
	import { z } from "zod";
	import {
		createStockOrderCreate,
		createStockOrderUpdate,
		createSupplierGetAll,
		createStockDivisionGetAll,
		createStockAllocateCreate,
	} from "$lib/api";
	import { status } from "$lib/stores/status.svelte";

	interface Props {
		refetch: () => void;
		open: boolean;
		allocate?: DTOStockAllocateDTO;
	}
	let { refetch, open = $bindable(false), allocate }: Props = $props();

	const isEdit = $derived(allocate != null);

	// const editMutation = createStockAllocate();
	const createMutation = createStockAllocateCreate();

	const suppliersQuery = createSupplierGetAll({ outletId: status.value.outletId });
	const divisionQuery = createStockDivisionGetAll({ outletId: status.value.outletId });
	const suppliers = $derived($suppliersQuery.data ?? []);
	const divisions = $derived($divisionQuery.data ?? []);
	// const supplierSelect = $derived(
	// 	suppliers.find((i) => i.id === $formData.supplierId)?.name ?? "Select Supplier"
	// );
	const divisionSelect = $derived(
		divisions.find((i) => i.divisionId === $formData.fromDivisionId)?.divisionName ??
			"Select Division"
	);

	const schema = z.object({
		comment: z.string().min(1, { message: "Comment is Required" }),
		toOutletId: z.number().min(1, { message: "Outlet is Required" }),
		fromDivisionId: z.number().min(1, { message: "Division is Required" }),
		toDivisionId: z.number().min(1, { message: "Supplier is Required" }),
		assignedUserId: z.string().min(1, { message: "Assigned User is Required" }),
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
				toast.info("Edited Allocation");
			} else {
				await $createMutation.mutateAsync({
					data: {
						comment: data.comment,
						fromDivisionId: data.fromDivisionId,
						toDivisionId: data.toDivisionId,
						assignedUserId: data.assignedUserId,
						toOutletId: data.toOutletId,
						outletId: status.value.outletId,
					},
				});
				toast.info("Added Allocation");
			}
			refetch();
		} catch (err) {
			toast.error(getError(err).message);
		}
	};

	const defaultValues = $derived({
		comment: allocate?.comment,
		toOutletId: allocate?.toOutletId ?? status.value.outletId,
		fromDivisionId: allocate?.fromDivisionId,
		toDivisionId: allocate?.toDivisionId,
		assignedUserId: allocate?.assignedUserId,
	});

	// svelte-ignore state_referenced_locally
	const form = superForm(defaults(defaultValues, zod(schema)), {
		SPA: true,
		validators: zod(schema),
		onUpdate({ form }) {
			console.log(form);
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

	let isDifferentOutlet = $state(false);
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="max-h-[98%] overflow-auto">
		<form method="POST" use:enhance>
			<Dialog.Header>
				<Dialog.Title>{isEdit ? "Edit" : "Add"} Allocation</Dialog.Title>
				<Dialog.Description
					>Complete form to {isEdit ? "Edit" : "Add"} allocation
				</Dialog.Description>
			</Dialog.Header>
			<div class="flex flex-col gap-4 p-4">
				<Form.Field {form} name="comment">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Comment</Form.Label>
							<Input {...props} bind:value={$formData.comment} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="fromDivisionId">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>From Division</Form.Label>
							<Select.Root
								type="single"
								allowDeselect={false}
								onValueChange={(v: string) => {
									v && ($formData.fromDivisionId = Number(v));
								}}
							>
								<Select.Trigger {...props}>
									{divisionSelect}
								</Select.Trigger>
								<Select.Content>
									{#each divisions ?? [] as result}
										<Select.Item value={result.divisionId.toString()}
											>{result.divisionName}</Select.Item
										>
									{/each}
								</Select.Content>
							</Select.Root>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors class="text-destructive text-sm" />
				</Form.Field>
				<div class="flex items-center space-x-2">
					<Switch id="different-outlet" bind:checked={isDifferentOutlet} />
					<Label for="different-outlet">Different Outlet</Label>
				</div>
			</div>
			<Dialog.Footer class="gap-2">
				<Button type="submit">Submit</Button>
				<Button variant="outline" onclick={() => (open = false)}>Cancel</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
