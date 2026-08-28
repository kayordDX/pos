<script lang="ts">
	import type { DTOOptionDTO } from "$lib/api";
	import { getError } from "$lib/types";
	import { Button, Dialog, Input } from "@kayord/ui";
	import { toast } from "@kayord/ui/sonner";
	import { Form } from "@kayord/ui/form";
	import { defaults, superForm } from "sveltekit-superforms";
	import { zod4 } from "sveltekit-superforms/adapters";
	import { z } from "zod";
	import { createOptionCreate, createOptionUpdate } from "$lib/api";
	import { status } from "$lib/stores/status.svelte";
	import { page } from "$app/state";

	interface Props {
		refetch: () => void;
		open: boolean;
		option?: DTOOptionDTO;
	}
	let { refetch, open = $bindable(false), option }: Props = $props();

	const isEdit = $derived(option != null);

	const editMutation = createOptionUpdate();
	const createMutation = createOptionCreate();

	const schema = z.object({
		name: z.string().min(1, { message: "Name is Required" }),
		price: z.number(),
		position: z.number(),
	});
	type FormSchema = z.infer<typeof schema>;

	const updateExtra = async (data: FormSchema) => {
		try {
			open = false;
			if (isEdit) {
				await editMutation.mutateAsync({
					data: {
						optionId: option?.optionId ?? 0,
						name: data.name,
						price: data.price,
						positionId: data.position,
						optionGroupId: Number(page.params.Id),
					},
				});
				toast.info("Option Updated");
			} else {
				await createMutation.mutateAsync({
					data: {
						name: data.name,
						outletId: status.value.outletId,
						positionId: data.position,
						optionGroupId: Number(page.params.Id),
						price: data.price,
					},
				});
				toast.info("Added Option");
			}
			refetch();
		} catch (err) {
			toast.error(getError(err).message);
		}
	};

	const defaultValues = $derived({
		name: option?.name,
		price: option?.price,
		position: option?.positionId,
	});

	// svelte-ignore state_referenced_locally
	const form = superForm(defaults(defaultValues, zod4(schema)), {
		SPA: true,
		validators: zod4(schema),
		id: `option-item-${option?.optionId ?? 0}`,
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
				<Dialog.Title>{isEdit ? "Edit" : "Add"} Option</Dialog.Title>
				<Dialog.Description>Complete form to {isEdit ? "Edit" : "Add"} option</Dialog.Description>
			</Dialog.Header>
			<div class="flex flex-col gap-4 p-4">
				<Form.Field {form} name="name">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Option Name</Form.Label>
							<Input {...props} bind:value={$formData.name} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="price">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Price</Form.Label>
							<Input {...props} type="number" step="0.01" bind:value={$formData.price} />
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
