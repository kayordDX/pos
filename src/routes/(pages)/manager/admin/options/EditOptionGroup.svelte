<script lang="ts">
	import type { DTOOptionGroupBasicDTO } from "$lib/api";
	import { getError } from "$lib/types";
	import { Button, Dialog, Form, Input, toast } from "@kayord/ui";
	import { defaults, superForm } from "sveltekit-superforms";
	import { zod } from "sveltekit-superforms/adapters";
	import { z } from "zod";
	import { createOptionGroupCreate, createOptionGroupUpdate } from "$lib/api";
	import { status } from "$lib/stores/status.svelte";
	import { page } from "$app/stores";

	interface Props {
		refetch: () => void;
		open: boolean;
		optionGroup?: DTOOptionGroupBasicDTO;
	}
	let { refetch, open = $bindable(false), optionGroup }: Props = $props();

	const isEdit = $derived(optionGroup != null);

	const editMutation = createOptionGroupUpdate();
	const createMutation = createOptionGroupCreate();

	const schema = z.object({
		name: z.string().min(1, { message: "Name is Required" }),
		minSelections: z.number(),
		maxSelections: z.number(),
	});
	type FormSchema = z.infer<typeof schema>;

	const updateExtra = async (data: FormSchema) => {
		try {
			open = false;
			if (isEdit) {
				await $editMutation.mutateAsync({
					data: {
						optionGroupId: optionGroup?.optionGroupId ?? 0,
						name: data.name,
						minSelections: data.minSelections,
						maxSelections: data.maxSelections,
					},
				});
				toast.info("Edited Extra");
			} else {
				await $createMutation.mutateAsync({
					data: {
						name: data.name,
						minSelections: data.minSelections,
						maxSelections: data.maxSelections,
						outletId: status.value.outletId,
					},
				});
				toast.info("Added Extra");
			}
			refetch();
		} catch (err) {
			toast.error(getError(err).message);
		}
	};

	const defaultValues = $derived({
		name: optionGroup?.name,
		minSelections: optionGroup?.minSelections,
		maxSelections: optionGroup?.maxSelections,
	});

	// svelte-ignore state_referenced_locally
	const form = superForm(defaults(defaultValues, zod(schema)), {
		SPA: true,
		validators: zod(schema),
		id: `options-${optionGroup?.optionGroupId ?? 0}`,
		onUpdate({ form }) {
			if (form.valid) {
				updateExtra(form.data);
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
				<Dialog.Title>{isEdit ? "Edit" : "Add"} Option Group</Dialog.Title>
				<Dialog.Description
					>Complete form to {isEdit ? "Edit" : "Add"} option group</Dialog.Description
				>
			</Dialog.Header>
			<div class="flex flex-col gap-4 p-4">
				<Form.Field {form} name="name">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Option Group Name</Form.Label>
							<Input {...props} bind:value={$formData.name} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="minSelections">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Min Selections</Form.Label>
							<Input {...props} type="number" step="1" bind:value={$formData.minSelections} />
						{/snippet}
					</Form.Control>
					<Form.Description>
						Will require {$formData.minSelections ?? 0} options to be selected
					</Form.Description>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="maxSelections">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Max Selection</Form.Label>
							<Input {...props} type="number" step="1" bind:value={$formData.maxSelections} />
						{/snippet}
					</Form.Control>
					<Form.Description>
						Will not allow more than {$formData.maxSelections ?? 0} options to be selected
					</Form.Description>
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
