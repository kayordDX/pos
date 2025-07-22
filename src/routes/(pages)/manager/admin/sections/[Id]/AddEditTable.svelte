<script lang="ts">
	import { createTableCreate, createTableUpdate } from "$lib/api";
	import { Button, Dialog, Form, Input, toast } from "@kayord/ui";
	import { defaults, superForm } from "sveltekit-superforms";
	import { zod4 } from "sveltekit-superforms/adapters";
	import { z } from "zod";
	import { getError } from "$lib/types";
	import type { EntitiesTable } from "$lib/api";
	interface Props {
		refetch: () => void;
		open: boolean;
		table?: EntitiesTable;
		sectionId?: number;
	}

	let { refetch, open = $bindable(false), table, sectionId }: Props = $props();

	const isEdit = $derived(table != null);

	const schema = z.object({
		name: z.string().min(1, { message: "Name is Required" }),
		capacity: z.number().min(1, { message: "Capacity is Required" }),
		sectionId: z.number().min(1, { message: "Section is Required" }),
		position: z.number().min(1, { message: "Position is Required" }),
	});

	type FormSchema = z.infer<typeof schema>;

	const createMutation = createTableCreate();
	const editMutation = createTableUpdate();

	const handleSubmit = async (data: FormSchema) => {
		try {
			open = false;
			if (isEdit) {
				await $editMutation.mutateAsync({
					tableId: table?.tableId ?? 0,
					data: {
						sectionId: table?.sectionId ?? 0,
						name: data.name,
						capacity: data.capacity ?? 1,
						position: data.position,
					},
				});
				toast.info("Edited Table");
			} else {
				await $createMutation.mutateAsync({
					data: {
						sectionId: sectionId ?? 0,
						name: data.name,
						capacity: data.capacity ?? 1,
						position: data.position,
					},
				});
				toast.info("Added Table");
			}
			refetch();
		} catch (err) {
			toast.error(getError(err).message);
		}
	};

	const defaultValues = $derived({
		name: table?.name ?? "",
		capacity: table?.capacity ?? 1,
		sectionId: table?.sectionId ?? sectionId ?? 0,
		position: table?.position ?? 0,
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
				<Dialog.Title>{isEdit ? "Edit" : "Add"} Table</Dialog.Title>
				<Dialog.Description>
					Complete form to {isEdit ? "edit" : "add"} Table
				</Dialog.Description>
			</Dialog.Header>
			<div class="flex flex-col gap-4 p-4">
				<Form.Field {form} name="name">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Table Name</Form.Label>
							<Input {...props} bind:value={$formData.name} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>
			<div class="flex flex-col gap-4 p-4">
				<Form.Field {form} name="capacity">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Table Capacity</Form.Label>
							<Input type="number" {...props} bind:value={$formData.capacity} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>
			<div class="flex flex-col gap-4 p-4">
				<Form.Field {form} name="position">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Position</Form.Label>
							<Input type="number" {...props} bind:value={$formData.position} />
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
