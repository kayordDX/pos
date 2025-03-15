<script lang="ts">
	import { Badge, Button, Dialog, Form, Input, Select, toast } from "@kayord/ui";
	import { SettingsIcon, SigmaIcon } from "@lucide/svelte";
	import {
		createStockDivisionGetAll,
		createSupplierCreate,
		createSupplierUpdate,
		type DTOSupplierDTO,
		type StockGetAllResponse,
	} from "$lib/api";
	import { defaults, superForm } from "sveltekit-superforms/client";
	import { zod } from "sveltekit-superforms/adapters";
	import { z } from "zod";
	import { getError } from "$lib/types";
	import { status } from "$lib/stores/status.svelte";

	interface Props {
		isOpen: boolean;
		refetch: () => void;
		supplier?: DTOSupplierDTO;
	}

	let { isOpen = $bindable(false), supplier, refetch }: Props = $props();

	const schema = z.object({
		name: z.string().min(1, { message: "Name is Required" }),
		contactName: z.string().min(1, { message: "Contact Name is Required" }),
		contactNumber: z.string().min(1, { message: "Contact Number is Required" }),
		email: z.string().min(1, { message: "Email is Required" }),
	});

	type FormSchema = z.infer<typeof schema>;

	const defaultValues = $derived({
		name: supplier?.name,
		contactName: supplier?.contactName,
		contactNumber: supplier?.contactNumber,
		email: supplier?.email,
	});

	const editMutation = createSupplierUpdate();
	const createMutation = createSupplierCreate();

	const onSubmit = async (data: FormSchema) => {
		try {
			isOpen = false;
			if (isEdit) {
				await $editMutation.mutateAsync({
					data: {
						id: supplier?.id ?? 0,
						name: data.name,
						contactName: data.contactName,
						contactNumber: data.contactNumber,
						email: data.email,
					},
				});
				toast.info("Edited Supplier");
			} else {
				await $createMutation.mutateAsync({
					data: {
						name: data.name,
						outletId: status.value.outletId,
						contactName: data.contactName,
						contactNumber: data.contactNumber,
						email: data.email,
					},
				});
				toast.info("Added Supplier");
			}
			refetch();
		} catch (err) {
			toast.error(getError(err).message);
		}
	};

	// svelte-ignore state_referenced_locally
	const form = superForm(defaults(defaultValues, zod(schema)), {
		SPA: true,
		id: supplier?.id.toString() ?? "0",
		validators: zod(schema),
		onUpdate({ form }) {
			if (form.valid) {
				onSubmit(form.data);
			}
		},
	});

	const { form: formData, enhance, reset } = form;

	const isEdit = $derived(supplier != undefined);

	$effect(() => {
		if (isOpen == true) {
			reset({ data: defaultValues });
		}
	});
</script>

<Dialog.Root bind:open={isOpen}>
	<Dialog.Content class="max-h-[98%] overflow-auto">
		<form method="POST" use:enhance>
			<Dialog.Header>
				<Dialog.Title>{isEdit ? "Edit" : "Add"} Supplier</Dialog.Title>
				<Dialog.Description>Complete form to {isEdit ? "Edit" : "Add"} Supplier</Dialog.Description>
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
				<Form.Field {form} name="contactName">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Contact Name</Form.Label>
							<Input {...props} bind:value={$formData.contactName} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="contactNumber">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Contact Number</Form.Label>
							<Input {...props} bind:value={$formData.contactNumber} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="email">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Email</Form.Label>
							<Input {...props} bind:value={$formData.email} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>
			<Dialog.Footer class="gap-2">
				<Button type="submit">Submit</Button>
				<Button variant="outline" onclick={() => (isOpen = false)}>Cancel</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
