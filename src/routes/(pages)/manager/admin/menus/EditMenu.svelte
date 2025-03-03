<script lang="ts">
	import type { EntitiesMenu } from "$lib/api";
	import { getError } from "$lib/types";
	import { Button, Dialog, Form, Input, toast } from "@kayord/ui";
	import { defaults, superForm } from "sveltekit-superforms";
	import { zod } from "sveltekit-superforms/adapters";
	import { z } from "zod";
	import { createMenuUpdate, createMenuCreate } from "$lib/api";
	import { status } from "$lib/stores/status.svelte";

	interface Props {
		refetch: () => void;
		open: boolean;
		menu?: EntitiesMenu;
	}
	let { refetch, open = $bindable(false), menu }: Props = $props();

	const isEdit = $derived(menu != null);

	const editMutation = createMenuUpdate();
	const createMutation = createMenuCreate();

	const schema = z.object({
		name: z.string().min(1, { message: "Name is Required" }),
		position: z.number(),
	});
	type FormSchema = z.infer<typeof schema>;

	const updateMenu = async (data: FormSchema) => {
		try {
			open = false;
			if (isEdit) {
				await $editMutation.mutateAsync({
					data: { id: menu?.id ?? 0, name: data.name, position: data.position },
				});
				toast.info("Edited Menu");
			} else {
				await $createMutation.mutateAsync({
					data: { name: data.name, outletId: status.value.outletId, position: data.position },
				});
				toast.info("Added Menu");
			}
			refetch();
		} catch (err) {
			toast.error(getError(err).message);
		}
	};

	const defaultValues = $derived({
		name: menu?.name,
		position: menu?.position,
	});

	// svelte-ignore state_referenced_locally
	const form = superForm(defaults(defaultValues, zod(schema)), {
		SPA: true,
		validators: zod(schema),
		id: `menu-${menu?.id ?? 0}`,
		onUpdate({ form }) {
			if (form.valid) {
				updateMenu(form.data);
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
	<Dialog.Content class="max-h-[98%] overflow-scroll">
		<form method="POST" use:enhance>
			<Dialog.Header>
				<Dialog.Title>{isEdit ? "Edit" : "Add"} Menu</Dialog.Title>
				<Dialog.Description>Complete form to {isEdit ? "Edit" : "Add"} menu</Dialog.Description>
			</Dialog.Header>
			<div class="flex flex-col gap-4 p-4">
				<Form.Field {form} name="name">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Menu Name</Form.Label>
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
