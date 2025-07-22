<script lang="ts">
	import { createRoleCreate, createRoleUpdate, createRoleTypeGetAll } from "$lib/api";
	import { status } from "$lib/stores/status.svelte";
	import { Button, Dialog, Form, Input, toast, Select } from "@kayord/ui";
	import { defaults, superForm } from "sveltekit-superforms";
	import { zod4 } from "sveltekit-superforms/adapters";
	import { z } from "zod";
	import { getError } from "$lib/types";
	import type { EntitiesRole } from "$lib/api";

	interface Props {
		refetch: () => void;
		open: boolean;
		role?: EntitiesRole;
	}

	let { refetch, open = $bindable(false), role }: Props = $props();

	const isEdit = $derived(role != null);

	const schema = z.object({
		name: z.string().min(1, { message: "Name is Required" }),
		description: z.string().min(1, { message: "Description is Required" }),
		roleTypeId: z.number().min(1, { message: "Role Type is Required" }),
		outletId: z.number(),
	});

	type FormSchema = z.infer<typeof schema>;

	const createMutation = createRoleCreate();
	const editMutation = createRoleUpdate();

	const handleSubmit = async (data: FormSchema) => {
		try {
			open = false;
			if (isEdit) {
				await $editMutation.mutateAsync({
					id: role?.roleId ?? 0,
					data: {
						name: data.name,
						outletId: status.value.outletId,
						roleTypeId: data.roleTypeId,
						description: data.description,
					},
				});
				toast.info("Edited Role");
			} else {
				await $createMutation.mutateAsync({
					data: {
						name: data.name,
						outletId: status.value.outletId,
						roleTypeId: data.roleTypeId,
						description: data.description,
					},
				});
				toast.info("Added Role");
			}
			refetch();
		} catch (err) {
			toast.error(getError(err).message);
		}
	};

	const defaultValues = $derived({
		name: role?.name ?? "",
		roleTypeId: role?.roleTypeId ?? 0,
		description: role?.description ?? "",
	});

	// svelte-ignore state_referenced_locally
	const form = superForm(defaults(defaultValues, zod4(schema)), {
		SPA: true,
		id: `section-form-${role?.roleId}`,
		validators: zod4(schema),
		onUpdate({ form }) {
			if (form.valid)
				handleSubmit({
					name: form.data.name,
					description: form.data.description,
					roleTypeId: Number(form.data?.roleTypeId),
					outletId: status.value.outletId,
				});
		},
	});

	const { form: formData, enhance, reset } = form;

	const roleTypeList = createRoleTypeGetAll(status.value.outletId);

	const divTypeList = $derived.by(
		() =>
			$roleTypeList.data?.map((m) => ({
				label: m.name,
				value: m.id.toString(),
			})) ?? []
	);

	const divTypeValue = $derived(
		divTypeList.find((i) => i.value == $formData.roleTypeId.toString())?.label
	);

	$effect(() => {
		if (open) {
			reset({ data: defaultValues });
		}
	});
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="max-h-[98%] overflow-auto">
		<form method="POST" use:enhance>
			<Dialog.Header>
				<Dialog.Title>{isEdit ? "Edit" : "Add"} Role</Dialog.Title>
				<Dialog.Description>
					Complete form to {isEdit ? "edit" : "add"} Role
				</Dialog.Description>
			</Dialog.Header>
			<div class="flex flex-col gap-4 p-4">
				<Form.Field {form} name="name">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Role Name</Form.Label>
							<Input {...props} bind:value={$formData.name} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="description">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Role Description</Form.Label>
							<Input {...props} bind:value={$formData.description} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="roleTypeId">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Role Type</Form.Label>
							<Select.Root
								type="single"
								name="roleTypeId"
								bind:value={
									() => $formData.roleTypeId.toString(), (v) => ($formData.roleTypeId = Number(v))
								}
								allowDeselect={false}
							>
								<Select.Trigger {...props}>
									{divTypeValue ? divTypeValue : "Select Role Type"}
								</Select.Trigger>
								<Select.Content>
									{#each divTypeList as divType}
										<Select.Item value={divType.value}>{divType.label}</Select.Item>
									{/each}
								</Select.Content>
							</Select.Root>
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
