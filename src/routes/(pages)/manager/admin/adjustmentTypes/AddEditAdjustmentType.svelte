<script lang="ts">
	import { createAdjutmentTypeOutletCreate } from "$lib/api";
	import { status } from "$lib/stores/status.svelte";
	import { Button, Dialog, Form, Input, toast } from "@kayord/ui";
	import { defaults, superForm } from "sveltekit-superforms";
	import { zod4 } from "sveltekit-superforms/adapters";
	import { z } from "zod";
	import { getError } from "$lib/types";
	import type { EntitiesAdjustmentType } from "$lib/api";

	interface Props {
		refetch: () => void;
		open: boolean;
		adjustmentType?: EntitiesAdjustmentType;
		adjustmentTypeId?: number;
	}

	let { refetch, open = $bindable(false), adjustmentType, adjustmentTypeId }: Props = $props();

	const isEdit = $derived(adjustmentType != null);

	const schema = z.object({
		name: z.string().min(1, { message: "Name is Required" }),
		description: z.string(),
	});

	type FormSchema = z.infer<typeof schema>;

	const createMutation = createAdjutmentTypeOutletCreate();
	const editMutation = createAdjutmentTypeOutletCreate(); //TODO

	const handleSubmit = async (data: FormSchema) => {
		try {
			open = false;
			if (isEdit) {
				await editMutation.mutateAsync({
					data: {
						outletId: status.value.outletId,
						name: data.name,
						description: data.description,
					},
				});
				toast.info("Edited Adjustment Type");
			} else {
				await createMutation.mutateAsync({
					data: {
						name: data.name,
						outletId: status.value.outletId,
						description: data.description,
					},
				});
				toast.info("Added Adjustment Type");
			}
			refetch();
		} catch (err) {
			toast.error(getError(err).message);
		}
	};

	const defaultValues = $derived({
		name: adjustmentType?.name ?? "",
		description: adjustmentType?.description ?? "",
	});

	// svelte-ignore state_referenced_locally
	const form = superForm(defaults(defaultValues, zod4(schema)), {
		SPA: true,
		validators: zod4(schema),
		onUpdate({ form }) {
			if (form.valid) handleSubmit(form.data);
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
	<Dialog.Content class="max-h-[98%] overflow-auto">
		<form method="POST" use:enhance>
			<Dialog.Header>
				<Dialog.Title>{isEdit ? "Edit" : "Add"} Adjustment Type</Dialog.Title>
				<Dialog.Description>
					Complete form to {isEdit ? "edit" : "add"} Adjustment Type
				</Dialog.Description>
			</Dialog.Header>
			<div class="flex flex-col gap-4 p-4">
				<Form.Field {form} name="name">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Adjustment Type Name</Form.Label>
							<Input {...props} bind:value={$formData.name} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="description">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Adjustment Description</Form.Label>
							<Input {...props} bind:value={$formData.description} />
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
