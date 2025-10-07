<script lang="ts">
	import type { DTOExtraGroupAdminDTO } from "$lib/api";
	import { getError } from "$lib/types";
	import { Button, Checkbox, Dialog, Form, Input, toast } from "@kayord/ui";
	import { defaults, superForm } from "sveltekit-superforms";
	import { zod4 } from "sveltekit-superforms/adapters";
	import { z } from "zod";
	import { createExtraGroupCreate, createExtraGroupUpdate } from "$lib/api";

	interface Props {
		refetch: () => void;
		open: boolean;
		extraGroup?: DTOExtraGroupAdminDTO;
	}
	let { refetch, open = $bindable(false), extraGroup }: Props = $props();

	const isEdit = $derived(extraGroup != null);

	const editMutation = createExtraGroupUpdate();
	const createMutation = createExtraGroupCreate();

	const schema = z.object({
		name: z.string().min(1, { message: "Name is Required" }),
		isGlobal: z.boolean(),
	});
	type FormSchema = z.infer<typeof schema>;

	const updateExtra = async (data: FormSchema) => {
		try {
			open = false;
			if (isEdit) {
				await editMutation.mutateAsync({
					data: {
						isGlobal: data.isGlobal,
						name: data.name,
						extraGroupId: extraGroup?.extraGroupId ?? 0,
					},
				});
				toast.info("Edited Extra Group");
			} else {
				await createMutation.mutateAsync({
					data: { name: data.name, isGlobal: data.isGlobal },
				});
				toast.info("Added Extra Group");
			}
			refetch();
		} catch (err) {
			toast.error(getError(err).message);
		}
	};

	const defaultValues = $derived({
		name: extraGroup?.name,
		isGlobal: extraGroup?.isGlobal ?? false,
	});

	// svelte-ignore state_referenced_locally
	const form = superForm(defaults(defaultValues, zod4(schema)), {
		SPA: true,
		validators: zod4(schema),
		id: `extras-${extraGroup?.extraGroupId ?? 0}`,
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
				<Dialog.Title>{isEdit ? "Edit" : "Add"} Extra Group</Dialog.Title>
				<Dialog.Description
					>Complete form to {isEdit ? "Edit" : "Add"} extra group</Dialog.Description
				>
			</Dialog.Header>
			<div class="flex flex-col gap-4 p-4">
				<Form.Field {form} name="name">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Extra Group Name</Form.Label>
							<Input {...props} bind:value={$formData.name} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="isGlobal">
					<Form.Control>
						{#snippet children({ props })}
							<div class="flex items-center gap-2">
								<Checkbox {...props} bind:checked={$formData.isGlobal} />
								<Form.Label>Global Extra</Form.Label>
							</div>
						{/snippet}
					</Form.Control>
					<Form.Description>Global extra groups are available on all menu items</Form.Description>
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
