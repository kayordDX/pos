<script lang="ts">
	import type { DTOMenuSectionDTO } from "$lib/api";
	import { getError } from "$lib/types";
	import { Button, Dialog, Form, Input, toast } from "@kayord/ui";
	import { defaults, superForm } from "sveltekit-superforms";
	import { zod } from "sveltekit-superforms/adapters";
	import { z } from "zod";
	import { createMenuSectionsCreate, createMenuSectionsUpdate } from "$lib/api";
	import { page } from "$app/stores";

	interface Props {
		refetch: () => void;
		open: boolean;
		section?: DTOMenuSectionDTO;
	}
	let { refetch, open = $bindable(false), section }: Props = $props();

	const isEdit = $derived(section != null);

	const editMutation = createMenuSectionsUpdate();
	const createMutation = createMenuSectionsCreate();

	const schema = z.object({
		name: z.string().min(1, { message: "Name is Required" }),
		position: z.number(),
	});
	type FormSchema = z.infer<typeof schema>;

	const updateMenuSection = async (data: FormSchema) => {
		try {
			open = false;
			if (isEdit) {
				await $editMutation.mutateAsync({
					data: { id: section?.menuSectionId ?? 0, name: data.name, positionId: data.position },
				});
				toast.info("Edited Menu");
			} else {
				await $createMutation.mutateAsync({
					data: { menuId: Number($page.params.Id), name: data.name, positionId: data.position },
				});
				toast.info("Added Menu");
			}
			refetch();
		} catch (err) {
			toast.error(getError(err).message);
		}
	};

	const defaultValues = $derived({
		name: section?.name,
		position: section?.positionId ?? 0,
	});

	// svelte-ignore state_referenced_locally
	const form = superForm(defaults(defaultValues, zod(schema)), {
		SPA: true,
		validators: zod(schema),
		id: `sections-${section?.menuSectionId ?? 0}`,
		onUpdate({ form }) {
			if (form.valid) {
				updateMenuSection(form.data);
			}
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
				<Dialog.Title>{isEdit ? "Edit" : "Add"} Menu Section</Dialog.Title>
				<Dialog.Description>Complete form to change menu section</Dialog.Description>
			</Dialog.Header>
			<div class="flex flex-col gap-4 p-4">
				<Form.Field {form} name="name">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Section Name</Form.Label>
							<Input {...props} bind:value={$formData.name} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="position">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Position</Form.Label>
							<Input {...props} type="number" step="1" bind:value={$formData.position} />
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
