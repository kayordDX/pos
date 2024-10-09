<script lang="ts">
	import { Button, Drawer, Select, Form } from "@kayord/ui";
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

	const items = [
		{ value: "apple", label: "Apple" },
		{ value: "banana", label: "Banana" },
		{ value: "blueberry", label: "Blueberry" },
		{ value: "grapes", label: "Grapes" },
		{ value: "pineapple", label: "Pineapple" },
	];

	let open = $state(false);

	export const schema = z.object({
		roleId: z.string().min(1, { message: "Please select Role" }),
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
</script>

<Drawer.Root bind:open>
	<Drawer.Trigger>
		<Button disabled={false} size="sm">
			Add
			<PlusIcon class=" ml-2 size-3" />
		</Button>
	</Drawer.Trigger>
	<Drawer.Content>
		<form method="POST" use:enhance>
			<Drawer.Header>
				<Drawer.Title>Add new Role</Drawer.Title>
				<Drawer.Description>Choose role</Drawer.Description>
			</Drawer.Header>
			<div class="w-full p-4">
				<Form.Field {form} name="roleId">
					<Form.Control let:attrs>
						<Form.Label>Role</Form.Label>
						<Select.Root
							onSelectedChange={(v) => {
								v && ($formData.roleId = String(v.value));
							}}
						>
							<Select.Trigger {...attrs}>
								<Select.Value placeholder="Select type" />
							</Select.Trigger>
							<Select.Content>
								{#each $rolesQuery.data ?? [] as item}
									<Select.Item value={item.roleId} label={item.name}>{item.name}</Select.Item>
								{/each}
							</Select.Content>
						</Select.Root>
						<input hidden bind:value={$formData.roleId} name={attrs.name} />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>
			<Drawer.Footer>
				{#if $mutation.isError}
					<Error message={getError($mutation.error).message} />
				{/if}
				<Form.Button type="submit" disabled={$mutation.isPending}>Add Role</Form.Button>
				<Drawer.Close>Cancel</Drawer.Close>
			</Drawer.Footer>
		</form>
	</Drawer.Content>
</Drawer.Root>
