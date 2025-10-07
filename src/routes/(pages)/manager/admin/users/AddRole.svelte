<script lang="ts">
	import { Button, Dialog, Select, Form } from "@kayord/ui";
	import { PlusIcon } from "@lucide/svelte";
	import { createUserAddUserOutletRole, createRoleGetAll } from "$lib/api";
	import { z } from "zod";
	import { defaults, superForm } from "sveltekit-superforms";
	import { zod4 } from "sveltekit-superforms/adapters";
	import { getError } from "$lib/types";
	import Error from "$lib/components/Error.svelte";
	import { status } from "$lib/stores/status.svelte";

	const mutation = createUserAddUserOutletRole();
	const rolesQuery = createRoleGetAll(status.value.outletId);

	interface Props {
		userId: string;
		refetch: () => void;
		open: boolean;
	}

	let { refetch, userId, open = $bindable() }: Props = $props();

	export const schema = z.object({
		roleId: z.number().min(1, { message: "Please select Role" }),
	});
	type FormSchema = z.infer<typeof schema>;

	const onSubmit = async (data: FormSchema) => {
		await mutation.mutateAsync({
			data: { userId: userId, roleId: Number(data.roleId) },
		});
		open = false;
		refetch();
	};

	const form = superForm(defaults({}, zod4(schema)), {
		SPA: true,
		validators: zod4(schema),
		id: `add-role-${userId}`,
		onUpdate({ form }) {
			if (form.valid) {
				onSubmit(form.data);
			}
		},
	});
	const { form: formData, enhance } = form;

	const roleSelect = $derived(
		rolesQuery.data?.find((i) => i.roleId === $formData.roleId)?.name ?? "Select Role"
	);
</script>

<Dialog.Root bind:open>
	<Dialog.Content>
		<form method="POST" use:enhance>
			<Dialog.Header>
				<Dialog.Title>Add new Role</Dialog.Title>
				<Dialog.Description>Choose role</Dialog.Description>
			</Dialog.Header>
			<div class="w-full p-4">
				<Form.Field {form} name="roleId">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Role</Form.Label>
							<Select.Root
								type="single"
								allowDeselect={false}
								name={props.name}
								bind:value={
									() => $formData.roleId.toString(), (v) => ($formData.roleId = Number(v))
								}
							>
								<Select.Trigger {...props}>{roleSelect}</Select.Trigger>
								<Select.Content>
									{#each rolesQuery.data ?? [] as item}
										<Select.Item value={item.roleId.toString()} label={item.name}
											>{item.name}</Select.Item
										>
									{/each}
								</Select.Content>
							</Select.Root>
							<input hidden bind:value={$formData.roleId} name={props.name} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>
			<Dialog.Footer>
				<div class="flex flex-col gap-2 w-full">
					{#if mutation.isError}
						<Error message={getError(mutation.error).message} />
					{/if}
					<Form.Button type="submit" class="w-full" disabled={mutation.isPending}>
						Add Role
					</Form.Button>
				</div>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
