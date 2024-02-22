<script lang="ts">
	import { createOrderAddItems, type DTOMenuItemDTO, type DTOMenuItemDTOBasic } from "$lib/api";
	import { Button, Checkbox, Drawer, Form, Separator, Textarea } from "@kayord/ui";
	import { zod } from "sveltekit-superforms/adapters";
	import { defaults, message, superForm } from "sveltekit-superforms/client";
	import { z } from "zod";
	import { Field, Control, FieldErrors, Fieldset, Legend, Label } from "@kayord/ui/formsnap";
	import SuperDebug from "sveltekit-superforms";

	export let data: DTOMenuItemDTO;
	export let menuItem: DTOMenuItemDTOBasic;
	export let tableBookingId: number;
	export let open = false;

	const schema = z.object({
		note: z.string(),
		extras: z.array(z.number()),
	});
	type FormSchema = z.infer<typeof schema>;

	const mutation = createOrderAddItems();

	const onSubmit = async (data: FormSchema) => {
		$mutation.mutateAsync({
			data: {
				orders: [{ menuItemId: menuItem.menuItemId, extraIds: [], optionIds: [], note: data.note }],
				tableBookingId: tableBookingId,
			},
		});
		open = false;
	};

	const form = superForm(defaults(zod(schema)), {
		SPA: true,
		validators: zod(schema),
		onUpdate({ form }) {
			if (form.valid) {
				onSubmit(form.data);
			}
		},
	});

	function addItem(id: number) {
		$formData.extras = [...$formData.extras, id];
	}

	function removeItem(id: number) {
		$formData.extras = $formData.extras.filter((i) => i !== id);
	}

	const { form: formData, enhance } = form;
</script>

<form use:enhance method="POST">
	<Drawer.Header>
		<Drawer.Title>{menuItem.name}</Drawer.Title>
		<Drawer.Description>{menuItem.description}</Drawer.Description>
		<div class="font-bold">R {menuItem.price.toFixed(2)}</div>
	</Drawer.Header>
	<div class="flex flex-col gap-2 p-4">
		<Field {form} name="note">
			<Control let:attrs>
				<Form.Label>Special instructions</Form.Label>
				<Textarea {...attrs} bind:value={$formData.note} />
			</Control>
			<FieldErrors />
		</Field>
	</div>
	{#each data.menuItemOptionGroups as optionGroup}
		{optionGroup.optionGroup.name} - {optionGroup.optionGroup.minSelections}/{optionGroup
			.optionGroup.maxSelections}
		{#each optionGroup.optionGroup.options as option}
			<div>Option: {option.optionGroupId} {option.name} {option.price}</div>
		{/each}
	{/each}
	<Separator />
	{#each data.menuItemExtraGroups as extraGroup}
		<Fieldset {form} name="extras">
			<Legend>{extraGroup.extraGroup.name}</Legend>
			{#each extraGroup.extraGroup.extras as extra}
				{@const checked = $formData.extras.includes(extra.extraId)}
				<div class="p-1">
					<Control let:attrs>
						<Checkbox
							class="rounded-[4px]"
							{...attrs}
							{checked}
							onCheckedChange={(v) => {
								if (v) {
									addItem(extra.extraId);
								} else {
									removeItem(extra.extraId);
								}
							}}
						/>
						<input hidden type="checkbox" name={attrs.name} value={extra.extraId} {checked} />
						<Label>{extra.name} - R{extra.price.toFixed(2)}</Label>
					</Control>
				</div>
			{/each}
			<FieldErrors />
		</Fieldset>
	{/each}
	<Separator />

	<Drawer.Footer>
		<Button type="submit">Add</Button>
	</Drawer.Footer>
	<SuperDebug data={$formData} />
</form>
