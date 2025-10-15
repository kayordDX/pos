<script lang="ts">
	import type { DTOStockAllocateDTO } from "$lib/api";
	import { getError } from "$lib/types";
	import { Button, Dialog, Form, Input, Label, Select, Combobox, Switch, toast } from "@kayord/ui";
	import { defaults, superForm } from "sveltekit-superforms";
	import { zod4 } from "sveltekit-superforms/adapters";
	import { z } from "zod";
	import {
		createStockDivisionGetAll,
		createStockAllocateCreate,
		createBusinessGetOutlets,
		createDivisionGetUsers,
	} from "$lib/api";
	import { status } from "$lib/stores/status.svelte";
	import { session } from "$lib/firebase.svelte";

	interface Props {
		refetch: () => void;
		open: boolean;
		allocate?: DTOStockAllocateDTO;
	}
	let { refetch, open = $bindable(false), allocate }: Props = $props();

	const isEdit = $derived(allocate != null);

	// const editMutation = createStockAllocate();
	const createMutation = createStockAllocateCreate();

	const outletsQuery = createBusinessGetOutlets(status.value.outletId);
	const outlets = $derived(outletsQuery.data ?? []);

	const outletSelect = $derived(
		outlets.find((i) => i.id === $formData.toOutletId)?.name ?? "Select Outlet"
	);

	const schema = z.object({
		comment: z.string().min(1, { message: "Comment is Required" }),
		toOutletId: z.number().min(1, { message: "Outlet is Required" }),
		fromDivisionId: z.number().min(1, { message: "From Division is Required" }),
		toDivisionId: z.number().min(1, { message: "To Division is Required" }),
		assignedUserId: z
			.string()
			.min(1, { message: "Assigned User is Required" })
			.check((ctx) => {
				if (ctx.value == (session.user?.uid ?? "")) {
					ctx.issues.push({
						code: "custom",
						message: "Cannot assign to yourself",
						input: ctx.value,
					});
				}
			}),
	});
	type FormSchema = z.infer<typeof schema>;

	const updateMenu = async (data: FormSchema) => {
		try {
			open = false;
			if (isEdit) {
				// await editMutation.mutateAsync({
				// 	data: {
				// 		id: order?.id ?? 0,
				// 		orderNumber: data.orderNumber,
				// 		divisionId: data.divisionId,
				// 		supplierId: data.supplierId,
				// 	},
				// });
				toast.info("Edited Allocation");
			} else {
				await createMutation.mutateAsync({
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
	const form = superForm(defaults(defaultValues, zod4(schema)), {
		SPA: true,
		validators: zod4(schema),
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

	let isDifferentOutlet = $state(false);

	const fromDivisionQuery = createStockDivisionGetAll({ outletId: status.value.outletId });
	const fromDivisions = $derived(fromDivisionQuery.data ?? []);
	const fromDivisionSelect = $derived(
		fromDivisions.find((i) => i.divisionId === $formData.fromDivisionId)?.divisionName ??
			"Select Division"
	);

	const toDivisionQuery = $derived(createStockDivisionGetAll({ outletId: $formData.toOutletId }));
	const toDivisions = $derived(toDivisionQuery.data ?? []);
	const toDivisionSelect = $derived(
		toDivisions.find((i) => i.divisionId === $formData.toDivisionId)?.divisionName ??
			"Select Division"
	);

	const divisionUsersQuery = $derived(
		createDivisionGetUsers($formData.toDivisionId, { excludeSelf: true })
	);
	const divisionUsers = $derived(divisionUsersQuery.data ?? []);
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
				<div class="flex items-center space-x-2">
					<Switch id="different-outlet" bind:checked={isDifferentOutlet} />
					<Label for="different-outlet">Different Outlet</Label>
				</div>
				{#if isDifferentOutlet}
					<Form.Field {form} name="toOutletId">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>To Outlet</Form.Label>
								<Select.Root
									type="single"
									allowDeselect={false}
									onValueChange={(v: string) => {
										v && ($formData.toOutletId = Number(v));
									}}
								>
									<Select.Trigger {...props}>
										{outletSelect}
									</Select.Trigger>
									<Select.Content>
										{#each outlets ?? [] as result}
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
				{/if}
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
									{fromDivisionSelect}
								</Select.Trigger>
								<Select.Content>
									{#each fromDivisions ?? [] as result}
										<Select.Item value={result.divisionId.toString()}>
											{result.divisionName}
										</Select.Item>
									{/each}
								</Select.Content>
							</Select.Root>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors class="text-destructive text-sm" />
				</Form.Field>
				<Form.Field {form} name="toDivisionId">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>To Division</Form.Label>
							<Select.Root
								type="single"
								allowDeselect={false}
								onValueChange={(v: string) => {
									v && ($formData.toDivisionId = Number(v));
								}}
							>
								<Select.Trigger {...props}>
									{toDivisionSelect}
								</Select.Trigger>
								<Select.Content>
									{#each toDivisions ?? [] as result}
										<Select.Item value={result.divisionId.toString()}>
											{result.divisionName}
										</Select.Item>
									{/each}
								</Select.Content>
							</Select.Root>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors class="text-destructive text-sm" />
				</Form.Field>
				<Form.Field {form} name="assignedUserId">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Assigned User</Form.Label>
							<Combobox
								{...props}
								bind:value={$formData.assignedUserId}
								name="User"
								items={divisionUsers.map((i) => ({ value: i.userId, label: i.name }))}
							/>
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
