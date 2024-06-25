<script lang="ts">
	import { page } from "$app/stores";
	import { createCashUpUserCreate, createCashUpUserItemType } from "$lib/api";
	import { status } from "$lib/stores/status";
	import { Button, Drawer, Form, Input, Select } from "@kayord/ui";
	import { PlusIcon } from "lucide-svelte";
	import { zod } from "sveltekit-superforms/adapters";
	import { defaults, superForm } from "sveltekit-superforms/client";
	import { z } from "zod";

	let { refetch, cashUpUserId }: { refetch: () => void; cashUpUserId: number } = $props();
	let open = $state(false);

	const query = createCashUpUserItemType();

	const mutation = createCashUpUserCreate();

	export const schema = z.object({
		cashUpUserItemTypeId: z.number().min(1, { message: "Please select Cash Up User Item Type Id" }),
		value: z.number(),
	});
	type FormSchema = z.infer<typeof schema>;

	const onSubmit = async (data: FormSchema) => {
		await $mutation.mutateAsync({
			data: {
				cashUpUserId: cashUpUserId,
				cashUpUserItemTypeId: data.cashUpUserItemTypeId,
				outletId: $status.outletId,
				userId: $page.params.Id ?? "",
				value: data.value,
			},
		});
		open = false;
		refetch();
	};

	const form = superForm(defaults({ value: 0 }, zod(schema)), {
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
	<Drawer.Trigger class="w-full">
		<Button class="w-full mt-5 p-86"><PlusIcon class="size-4 mr-2" /> Add Cash Up Item</Button>
	</Drawer.Trigger>
	<Drawer.Content>
		<form method="POST" use:enhance>
			<Drawer.Header>
				<Drawer.Title>Add Cash Up Item</Drawer.Title>
				<Drawer.Description>This will add additional items to user cash up.</Drawer.Description>
			</Drawer.Header>
			<div class="m-4">
				<Form.Field {form} name="cashUpUserItemTypeId">
					<Form.Control let:attrs>
						<Form.Label>Type</Form.Label>
						<Select.Root
							selected={{
								value: $formData.cashUpUserItemTypeId,
								label: $query.data?.find((i) => i.id === $formData.cashUpUserItemTypeId)?.itemType,
							}}
							onSelectedChange={(v) => {
								v && ($formData.cashUpUserItemTypeId = v.value);
							}}
						>
							<Select.Trigger {...attrs}>
								<Select.Value placeholder="Select type" />
							</Select.Trigger>
							<Select.Content>
								{#each $query.data ?? [] as item}
									<Select.Item value={item.id}>{item.itemType}</Select.Item>
								{/each}
							</Select.Content>
						</Select.Root>
						<input hidden bind:value={$formData.cashUpUserItemTypeId} name={attrs.name} />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="value">
					<Form.Control let:attrs>
						<Form.Label>Value</Form.Label>
						<Input
							{...attrs}
							type="number"
							step="0.01"
							bind:value={$formData.value}
							on:focus={(e) => e.currentTarget.select()}
						/>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>
			<Drawer.Footer>
				<Form.Button type="submit">Add</Form.Button>
				<Drawer.Close>Cancel</Drawer.Close>
			</Drawer.Footer>
		</form>
	</Drawer.Content>
</Drawer.Root>
