<script lang="ts">
	import { createDivisionCreate, createDivisionEdit, createDivisionTypeGetAll } from "$lib/api";
	import { status } from "$lib/stores/status.svelte";
	import { Button, Dialog, Form, Input, toast, Select } from "@kayord/ui";
	import { defaults, superForm } from "sveltekit-superforms";
	import { zod4 } from "sveltekit-superforms/adapters";
	import { z } from "zod";
	import { getError } from "$lib/types";
	import type { EntitiesDivision } from "$lib/api";

	interface Props {
		refetch: () => void;
		open: boolean;
		division?: EntitiesDivision;
	}

	let { refetch, open = $bindable(false), division }: Props = $props();

	const isEdit = $derived(division != null);

	const schema = z.object({
		name: z.string().min(1, { message: "Name is Required" }),
		divisionTypeId: z.number().min(1, { message: "Division Type is Required" }),
	});

	type FormSchema = z.infer<typeof schema>;

	const createMutation = createDivisionCreate();
	const editMutation = createDivisionEdit();

	const handleSubmit = async (data: FormSchema) => {
		try {
			open = false;
			if (isEdit) {
				await $editMutation.mutateAsync({
					data: {
						id: division?.divisionId ?? 0,
						name: division?.divisionName ?? "",
						outletId: status.value.outletId,
						divisionTypeId: data.divisionTypeId,
					},
				});
				toast.info("Edited Division");
			} else {
				await $createMutation.mutateAsync({
					data: {
						name: data.name,
						outletId: status.value.outletId,
						divisionTypeId: data.divisionTypeId,
					},
				});
				toast.info("Added Division");
			}
			refetch();
		} catch (err) {
			toast.error(getError(err).message);
		}
	};

	const defaultValues = $derived({
		name: division?.divisionName ?? "",
		divisionTypeId: division?.divisionTypeId ?? 0,
	});

	// svelte-ignore state_referenced_locally
	const form = superForm(defaults(defaultValues, zod4(schema)), {
		SPA: true,
		id: `section-form-${division?.divisionId}`,
		validators: zod4(schema),
		onUpdate({ form }) {
			if (form.valid)
				handleSubmit({ name: form.data.name, divisionTypeId: Number(form.data?.divisionTypeId) });
		},
	});
	let selectedDivisionTypeId = $derived(() => $formData.divisionTypeId.toString());

	$effect(() => {
		$formData.divisionTypeId = Number(selectedDivisionTypeId);
	});
	const { form: formData, enhance, reset } = form;

	$effect(() => {
		if (open == true) {
			reset({ data: defaultValues });
		}
	});
	const divisionTypeList = createDivisionTypeGetAll({ outletId: status.value.outletId });

	const divTypeList = $derived.by(() => {
		return (
			$divisionTypeList.data?.map((m) => ({
				label: m.divisionName,
				value: m.id.toString(),
			})) ?? []
		);
	});
	const divTypeValue = $derived(
		divTypeList.find((i) => i.value == $formData.divisionTypeId.toString())?.label
	);
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="max-h-[98%] overflow-auto">
		<form method="POST" use:enhance>
			<Dialog.Header>
				<Dialog.Title>{isEdit ? "Edit" : "Add"} Division</Dialog.Title>
				<Dialog.Description>
					Complete form to {isEdit ? "edit" : "add"} Division
				</Dialog.Description>
			</Dialog.Header>
			<div class="flex flex-col gap-4 p-4">
				<Form.Field {form} name="name">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Division Name</Form.Label>
							<Input {...props} bind:value={$formData.name} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="divisionTypeId">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Division Type</Form.Label>
							<Select.Root
								type="single"
								name="divisionTypeId"
								bind:value={
									() => $formData.divisionTypeId.toString(),
									(v) => ($formData.divisionTypeId = Number(v))
								}
								allowDeselect={false}
							>
								<Select.Trigger {...props}>
									{divTypeValue ? divTypeValue : "Select Divsion Type"}
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
