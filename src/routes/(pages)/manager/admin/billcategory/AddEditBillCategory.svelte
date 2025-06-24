<script lang="ts">
	import { createBillCategoryCreate, createBillCategoryUpdate } from "$lib/api";
	import { status } from "$lib/stores/status.svelte";
	import { Button, Dialog, Form, Input, toast } from "@kayord/ui";
	import { defaults, superForm } from "sveltekit-superforms";
	import { zod } from "sveltekit-superforms/adapters";
	import { z } from "zod";
	import { getError } from "$lib/types";
	import type { EntitiesBillCategory } from "$lib/api";

	interface Props {
		refetch: () => void;
		open: boolean;
		billCat?: EntitiesBillCategory;
	}

	let { refetch, open = $bindable(false), billCat }: Props = $props();

	const isEdit = $derived(billCat != null);

	const schema = z.object({
		name: z.string().min(1, { message: "Name is Required" }),
	});

	type FormSchema = z.infer<typeof schema>;

	const createMutation = createBillCategoryCreate();
	const editMutation = createBillCategoryUpdate();

	const handleSubmit = async (data: FormSchema) => {
		try {
			open = false;
			if (isEdit) {
				await $editMutation.mutateAsync({
					id: billCat?.id ?? 0,
					data: {
						name: data.name,
					},
				});
				toast.info("Edited Bill Category");
			} else {
				await $createMutation.mutateAsync({
					data: {
						name: data.name,
						outletId: status.value.outletId,
					},
				});
				toast.info("Added Bill Category");
			}
			refetch();
		} catch (err) {
			toast.error(getError(err).message);
		}
	};

	const defaultValues = $derived({
		name: billCat?.name ?? "",
	});

	// svelte-ignore state_referenced_locally
	const form = superForm(defaults(defaultValues, zod(schema)), {
		SPA: true,
		id: `section-form-${billCat?.id}`,
		validators: zod(schema),
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
				<Dialog.Title>{isEdit ? "Edit" : "Add"} Bill Category</Dialog.Title>
				<Dialog.Description>
					Complete form to {isEdit ? "edit" : "add"} Bill Category
				</Dialog.Description>
			</Dialog.Header>
			<div class="flex flex-col gap-4 p-4">
				<Form.Field {form} name="name">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Category Name</Form.Label>
							<Input {...props} bind:value={$formData.name} />
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
