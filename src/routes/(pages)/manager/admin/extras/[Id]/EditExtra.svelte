<script lang="ts">
	import type { DTOExtraDTO } from "$lib/api";
	import { getError } from "$lib/types";
	import { Button, Checkbox, Dialog, Form, Input, toast } from "@kayord/ui";
	import { defaults, superForm } from "sveltekit-superforms";
	import { zod4 } from "sveltekit-superforms/adapters";
	import { z } from "zod";
	import { createExtraCreate, createExtraUpdate } from "$lib/api";
	import { status } from "$lib/stores/status.svelte";
	import { page } from "$app/state";

	interface Props {
		refetch: () => void;
		open: boolean;
		extra?: DTOExtraDTO;
	}
	let { refetch, open = $bindable(false), extra }: Props = $props();

	const isEdit = $derived(extra != null);

	const editMutation = createExtraUpdate();
	const createMutation = createExtraCreate();

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
				await $editMutation.mutateAsync({
					data: {
						extraId: extra?.extraId ?? 0,
						outletId: status.value.outletId,
						name: data.name,
						price: data.price,
						positionId: data.position,
						extraGroupId: Number(page.params.Id),
					},
				});
				toast.info("Edited Extra");
			} else {
				await $createMutation.mutateAsync({
					data: {
						name: data.name,
						outletId: status.value.outletId,
						positionId: data.position,
						extraGroupId: Number(page.params.Id),
						price: data.price,
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
		name: extra?.name,
		price: extra?.price,
		position: extra?.positionId,
	});

	// svelte-ignore state_referenced_locally
	const form = superForm(defaults(defaultValues, zod4(schema)), {
		SPA: true,
		validators: zod4(schema),
		id: `extra-item-${extra?.extraId ?? 0}`,
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
				<Dialog.Title>{isEdit ? "Edit" : "Add"} Extra</Dialog.Title>
				<Dialog.Description>Complete form to {isEdit ? "Edit" : "Add"} extra</Dialog.Description>
			</Dialog.Header>
			<div class="flex flex-col gap-4 p-4">
				<Form.Field {form} name="name">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Extra Name</Form.Label>
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
