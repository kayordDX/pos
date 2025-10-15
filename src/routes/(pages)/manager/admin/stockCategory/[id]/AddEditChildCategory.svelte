<script lang="ts">
	import { createStockCategoryCreate, createStockCategoryUpdate } from "$lib/api";
	import { Button, Dialog, Input } from "@kayord/ui";
	import { toast } from "@kayord/ui/sonner";
	import { Form } from "@kayord/ui/form";
	import { defaults, superForm } from "sveltekit-superforms";
	import { zod4 } from "sveltekit-superforms/adapters";
	import { z } from "zod";
	import { getError } from "$lib/types";
	import type { EntitiesStockCategory } from "$lib/api";
	import { status } from "$lib/stores/status.svelte";
	import { page } from "$app/state";
	interface Props {
		refetch: () => void;
		open: boolean;
		category?: EntitiesStockCategory;
	}

	let { refetch, open = $bindable(false), category }: Props = $props();

	const isEdit = $derived(category != null);

	const schema = z.object({
		name: z.string().min(1, { message: "Name is Required" }),
	});

	type FormSchema = z.infer<typeof schema>;

	const createMutation = createStockCategoryCreate();
	const editMutation = createStockCategoryUpdate();

	const handleSubmit = async (data: FormSchema) => {
		try {
			open = false;
			if (isEdit) {
				await editMutation.mutateAsync({
					id: category?.id ?? 0,
					data: {
						parentId: category?.parentId ?? 0,
						name: data.name,
					},
				});
				toast.info("Edited Child Category");
			} else {
				await createMutation.mutateAsync({
					data: {
						parentId: Number(page.params.id),
						name: data.name,
						outletId: status.value.outletId,
					},
				});
				toast.info("Added Child Category");
			}
			refetch();
		} catch (err) {
			toast.error(getError(err).message);
		}
	};

	const defaultValues = $derived({
		name: category?.name ?? "",
		parentId: category?.parentId ?? page.params.id ?? 0,
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
				<Dialog.Title>{isEdit ? "Edit" : "Add"} Child Category</Dialog.Title>
				<Dialog.Description>
					Complete form to {isEdit ? "edit this" : "add a"} Child Category
				</Dialog.Description>
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
			</div>
			<Dialog.Footer class="gap-2">
				<Button type="submit">Submit</Button>
				<Button variant="outline" onclick={() => (open = false)}>Cancel</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
