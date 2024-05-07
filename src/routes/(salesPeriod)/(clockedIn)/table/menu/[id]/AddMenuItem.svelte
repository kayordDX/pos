<script lang="ts">
	import {
		createOrderAddItems,
		type DTOMenuItemDTO,
		type DTOMenuItemDTOBasic,
		type DTOOptionDTO,
	} from "$lib/api";
	import { Button, Checkbox, Drawer, Form, Input, Textarea } from "@kayord/ui";
	import { zod } from "sveltekit-superforms/adapters";
	import { defaults, superForm } from "sveltekit-superforms/client";
	import { z } from "zod";
	import { Field, Control, FieldErrors, Fieldset, Legend, Label } from "@kayord/ui/formsnap";
	import SpecialExtra from "./SpecialExtra.svelte";
	import { arrayUnique } from "$lib/util";
	import Error from "$lib/components/Error.svelte";
	import { getError } from "$lib/types";
	import Quantity from "$lib/components/Quantity/Quantity.svelte";

	export let data: DTOMenuItemDTO;
	export let menuItem: DTOMenuItemDTOBasic;
	export let tableBookingId: number;
	export let open = false;

	let currentExtras: Array<number> = [];

	const getSelectedCountInOptionGroup = (options: Array<DTOOptionDTO>) => {
		return options.filter((x) => $formData.options.includes(x.optionId)).length;
	};

	const schema = z.object({
		note: z.string(),
		extras: z.array(z.number()),
		quantity: z.coerce.number().min(1),
		options: z.array(z.number()).superRefine((val, ctx) => {
			data.menuItemOptionGroups.map((o) => {
				const maxSelections = o.optionGroup.maxSelections;
				const minSelections = o.optionGroup.minSelections;
				const count = getSelectedCountInOptionGroup(o.optionGroup.options);
				if (count > maxSelections) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: `${o.optionGroup.name} has maxSelection as ${maxSelections} but has ${count}`,
						fatal: true,
					});
					return;
				}
				if (count < minSelections) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: `${o.optionGroup.name} has minSelections as ${maxSelections} but has ${count}`,
						fatal: true,
					});
					return;
				}
			});
		}),
	});
	type FormSchema = z.infer<typeof schema>;

	const mutation = createOrderAddItems();

	const onSubmit = async (data: FormSchema) => {
		await $mutation.mutateAsync({
			data: {
				orders: [
					{
						menuItemId: menuItem.menuItemId,
						extraIds: arrayUnique(data.extras.concat(currentExtras)),
						optionIds: data.options,
						note: data.note,
						quantity: data.quantity,
					},
				],
				tableBookingId: tableBookingId,
			},
		});
		open = false;
	};

	const form = superForm(defaults({ quantity: 1 }, zod(schema)), {
		SPA: true,
		validators: zod(schema),
		onUpdate({ form }) {
			if (form.valid) {
				onSubmit(form.data);
			}
		},
	});

	function addExtra(id: number) {
		$formData.extras = [...$formData.extras, id];
	}

	function removeExtra(id: number) {
		$formData.extras = $formData.extras.filter((i) => i !== id);
	}

	function addOption(id: number) {
		$formData.options = [...$formData.options, id];
	}

	function removeOption(id: number) {
		$formData.options = $formData.options.filter((i) => i !== id);
	}

	const { form: formData, enhance } = form;
</script>

<form use:enhance method="POST">
	<Drawer.Header>
		<Drawer.Title>{menuItem.name}</Drawer.Title>
		<Drawer.Description>{menuItem.description}</Drawer.Description>
		<div class="font-bold">R {menuItem.price.toFixed(2)}</div>
	</Drawer.Header>
	<div class="flex flex-col gap-5 p-4 pt-0">
		<div>
			{#if data.menuItemOptionGroups.length > 0}
				<h3 class="font-bold">Options</h3>
			{/if}
			<Fieldset {form} name="options" class="mt-2">
				{#each data.menuItemOptionGroups as optionGroup}
					<Legend>
						{optionGroup.optionGroup.name}
						{optionGroup.optionGroup.minSelections > 0 ? "*" : ""} -
						<span class="text-xs text-muted-foreground">
							min {optionGroup.optionGroup.minSelections}, max {optionGroup.optionGroup
								.maxSelections}
						</span>
					</Legend>

					{#each optionGroup.optionGroup.options as option}
						{@const checked = $formData.options.includes(option.optionId)}
						<div class="p-1 flex items-center gap-2">
							<Control let:attrs>
								<Checkbox
									class="rounded-[4px] w-4 h-4"
									{...attrs}
									{checked}
									onCheckedChange={(v) => {
										if (v) {
											addOption(option.optionId);
										} else {
											removeOption(option.optionId);
										}
									}}
								/>
								<input hidden type="checkbox" name={attrs.name} value={option.optionId} {checked} />
								<Label>{option.name} - R{option.price.toFixed(2)}</Label>
							</Control>
						</div>
					{/each}
				{/each}
				<FieldErrors class="text-destructive" />
			</Fieldset>
		</div>
		<div>
			{#if data.menuItemExtraGroups.length > 0}
				<h3 class="font-bold">Extras</h3>
			{/if}
			{#each data.menuItemExtraGroups as extraGroup}
				<Fieldset {form} name="extras" class="mt-2">
					<Legend>{extraGroup.extraGroup.name}</Legend>
					{#each extraGroup.extraGroup.extras as extra}
						{@const checked = $formData.extras.includes(extra.extraId)}
						<div class="p-1 flex items-center gap-2">
							<Control let:attrs>
								<Checkbox
									class="rounded-[4px]"
									{...attrs}
									{checked}
									onCheckedChange={(v) => {
										if (v) {
											addExtra(extra.extraId);
										} else {
											removeExtra(extra.extraId);
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
		</div>
		<SpecialExtra bind:currentExtras />
		<Field {form} name="note">
			<Control let:attrs>
				<Form.Label>Special instructions</Form.Label>
				<Textarea {...attrs} bind:value={$formData.note} tabindex={-1} />
			</Control>
			<FieldErrors />
		</Field>
	</div>
	<Field {form} name="quantity">
		<Control>
			<Quantity bind:value={$formData.quantity} />
		</Control>
		<FieldErrors />
	</Field>
	<Drawer.Footer>
		{#if $mutation.isError}
			<Error message={getError($mutation.error).message} />
		{/if}
		<Button type="submit">Add</Button>
	</Drawer.Footer>
</form>
