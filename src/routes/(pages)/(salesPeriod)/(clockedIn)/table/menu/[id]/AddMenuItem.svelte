<script lang="ts">
	import { createOrderAddItems, type DTOMenuItemDTO, type DTOOptionDTO } from "$lib/api";
	import { Button, Checkbox, Drawer, Form, Textarea, toast } from "@kayord/ui";
	import { zod4 } from "sveltekit-superforms/adapters";
	import { defaults, superForm } from "sveltekit-superforms/client";
	import { z } from "zod";
	import { Field, Control, FieldErrors, Fieldset, Legend, Label } from "@kayord/ui/formsnap";
	import SpecialExtra from "./SpecialExtra.svelte";
	import { arrayUnique } from "$lib/util";
	import Error from "$lib/components/Error.svelte";
	import { getError } from "$lib/types";
	import Quantity from "$lib/components/Quantity/Quantity.svelte";

	interface Props {
		data: DTOMenuItemDTO;
		tableBookingId: number;
		open?: boolean;
	}

	let { data, tableBookingId, open = $bindable(false) }: Props = $props();

	let currentExtras: Array<number> = $state([]);

	const getSelectedCountInOptionGroup = (options: Array<DTOOptionDTO>) => {
		return options.filter((x) => $formData.options.includes(x.optionId)).length;
	};

	const schema = z.object({
		note: z.string(),
		extras: z.array(z.number()),
		quantity: z.coerce.number().min(1),
		options: z.array(z.number()).check((ctx) => {
			data.menuItemOptionGroups.map((o) => {
				const maxSelections = o.optionGroup.maxSelections;
				const minSelections = o.optionGroup.minSelections;
				const count = getSelectedCountInOptionGroup(o.optionGroup.options);
				if (count > maxSelections) {
					ctx.issues.push({
						code: "custom",
						message: `${o.optionGroup.name} has maxSelection as ${maxSelections} but has ${count}`,
						input: ctx.value,
					});
					return;
				}
				if (count < minSelections) {
					ctx.issues.push({
						code: "custom",
						message: `${o.optionGroup.name} has minSelections as ${maxSelections} but has ${count}`,
						input: ctx.value,
					});
					return;
				}
			});
		}),
	});
	type FormSchema = z.infer<typeof schema>;

	const mutation = createOrderAddItems();

	let isSubmitting = $state(false);

	const onSubmit = async (formData: FormSchema) => {
		try {
			isSubmitting = true;
			await $mutation.mutateAsync({
				data: {
					orders: [
						{
							menuItemId: data.menuItemId,
							extraIds: arrayUnique(formData.extras.concat(currentExtras)),
							optionIds: formData.options,
							note: formData.note,
							quantity: formData.quantity,
						},
					],
					tableBookingId: tableBookingId,
				},
			});
			toast.info("Added to basket");
		} catch (err) {
			toast.error(getError(err).message);
		} finally {
			open = false;
			isSubmitting = false;
		}
	};

	const form = superForm(defaults({ quantity: 1 }, zod4(schema)), {
		SPA: true,
		validators: zod4(schema),
		onUpdated: async ({ form }) => {
			if (form.valid) {
				await onSubmit(form.data);
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
	<Drawer.Header class="pt-0 px-0">
		<Drawer.Title>{data.name}</Drawer.Title>
		<Drawer.Description>{data.description}</Drawer.Description>
		<div class="font-bold">R {data.price.toFixed(2)}</div>
	</Drawer.Header>
	<div class="flex flex-col gap-2 p-0 pt-0">
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
							<Control>
								{#snippet children({ props })}
									<Checkbox
										disabled={!option.isAvailable}
										class="rounded-[4px] w-4 h-4"
										{...props}
										{checked}
										onCheckedChange={(checked) => {
											if (checked) {
												addOption(option.optionId);
											} else {
												removeOption(option.optionId);
											}
										}}
									/>
									<input
										hidden
										type="checkbox"
										name={props.name}
										value={option.optionId}
										{checked}
									/>
									<Label class={option.isAvailable ? "" : "text-muted"}
										>{option.name} - R{option.price.toFixed(2)}</Label
									>
								{/snippet}
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
							<Control>
								{#snippet children({ props })}
									<Checkbox
										disabled={!extra.isAvailable}
										class="rounded-[4px]"
										{...props}
										{checked}
										onCheckedChange={(v) => {
											if (v) {
												addExtra(extra.extraId);
											} else {
												removeExtra(extra.extraId);
											}
										}}
									/>
									<input hidden type="checkbox" name={props.name} value={extra.extraId} {checked} />
									<Label class={extra.isAvailable ? "" : "text-muted"}
										>{extra.name} - R{extra.price.toFixed(2)}</Label
									>
								{/snippet}
							</Control>
						</div>
					{/each}
					<FieldErrors />
				</Fieldset>
			{/each}
		</div>
		<SpecialExtra bind:currentExtras divisionId={data.divisionId} />
		<Field {form} name="note">
			<Control>
				{#snippet children({ props })}
					<Form.Label>Special instructions</Form.Label>
					<Textarea {...props} bind:value={$formData.note} tabindex={-1} />
				{/snippet}
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

		<Button class="mt-2" type="submit" disabled={isSubmitting || !open}>Add</Button>
	</Drawer.Footer>
</form>
