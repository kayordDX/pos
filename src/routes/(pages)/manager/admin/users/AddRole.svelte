<script lang="ts">
	import { Button, Dialog, Select, Form } from "@kayord/ui";
	import { PlusIcon } from "lucide-svelte";
	import { createUserAddUserOutletRole, createRoleGetAll } from "$lib/api";
	import { z } from "zod";
	import { defaults, superForm } from "sveltekit-superforms";
	import { zod } from "sveltekit-superforms/adapters";
	import { getError } from "$lib/types";
	import Error from "$lib/components/Error.svelte";

	const mutation = createUserAddUserOutletRole();
	const rolesQuery = createRoleGetAll();

	interface Props {
		userId: string;
		refetch: () => void;
	}

	let { refetch, userId }: Props = $props();

	let open = $state(false);

	export const schema = z.object({
		roleId: z.number().min(1, { message: "Please select Role" }),
	});
	type FormSchema = z.infer<typeof schema>;

	const onSubmit = async (data: FormSchema) => {
		await $mutation.mutateAsync({
			data: { userId: userId, roleId: Number(data.roleId) },
		});
		open = false;
		refetch();
	};

	const form = superForm(defaults({}, zod(schema)), {
		SPA: true,
		validators: zod(schema),
		onUpdate({ form }) {
			if (form.valid) {
				onSubmit(form.data);
			}
		},
	});
	const { form: formData, enhance } = form;

	const roleSelect = $derived(
		$rolesQuery.data?.find((i) => i.roleId === $formData.roleId)?.name ?? "Select Role"
	);
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger>
		<Button disabled={false} size="sm">
			Add
			<PlusIcon class=" ml-2 size-3" />
		</Button>
	</Dialog.Trigger>
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
								bind:value={$formData.roleId}
							>
								<Select.Trigger {...props}>{roleSelect}</Select.Trigger>
								<Select.Content>
									{#each $rolesQuery.data ?? [] as item}
										<Select.Item value={item.roleId} label={item.name}>{item.name}</Select.Item>
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
				{#if $mutation.isError}
					<Error message={getError($mutation.error).message} />
				{/if}
				<Form.Button type="submit" disabled={$mutation.isPending}>Add Role</Form.Button>
				<Dialog.Close>Cancel</Dialog.Close>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
