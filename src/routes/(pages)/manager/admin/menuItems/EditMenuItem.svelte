<script lang="ts">
	import type { MenuItemMenuItemAdminDTO } from "$lib/api";
	import { getError } from "$lib/types";
	import { Button, Checkbox, Dialog, Form, Input, Select, toast } from "@kayord/ui";
	import { defaults, superForm } from "sveltekit-superforms";
	import { zod } from "sveltekit-superforms/adapters";
	import { z } from "zod";
	import { status } from "$lib/stores/status.svelte";
	import {
		createMenuUpdate,
		createMenuCreate,
		createMenuList,
		createMenuGetSectionsGetMenusSections,
	} from "$lib/api";

	interface Props {
		refetch: () => void;
		open: boolean;
		menuItem?: MenuItemMenuItemAdminDTO;
	}
	let { refetch, open = $bindable(false), menuItem }: Props = $props();

	const isEdit = $derived(menuItem != null);

	const editMutation = createMenuUpdate();
	const createMutation = createMenuCreate();

	const schema = z.object({
		name: z.string().min(1, { message: "Name is Required" }),
		menuId: z.number(),
		menuSectionId: z.number(),
		description: z.string().min(1, { message: "Description is Required" }),
		price: z.number(),
		stockPrice: z.number(),
		IsEnabled: z.boolean(),
		isAvailable: z.boolean(),
		positionId: z.number(),
	});
	type FormSchema = z.infer<typeof schema>;

	const updateMenu = async (data: FormSchema) => {
		try {
			open = false;
			if (isEdit) {
				// await $editMutation.mutateAsync({
				// 	data: { id: menuItem?.id ?? 0, name: data.name, position: data.position },
				// });
				toast.info("Edited Menu");
			} else {
				// await $createMutation.mutateAsync({
				// 	data: { name: data.name, outletId: status.value.outletId, position: data.position },
				// });
				toast.info("Added Menu");
			}
			refetch();
		} catch (err) {
			toast.error(getError(err).message);
		}
	};

	const defaultValues = $derived({
		name: menuItem?.name,
		position: menuItem?.position,
	});

	// svelte-ignore state_referenced_locally
	const form = superForm(defaults(defaultValues, zod(schema)), {
		SPA: true,
		validators: zod(schema),
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

	const menuQuery = createMenuList({ outletId: status.value.outletId });
	const menuList = $derived.by(() => {
		return (
			$menuQuery.data?.map((m) => {
				return {
					label: m.name,
					value: m.id.toString(),
				};
			}) ?? []
		);
	});

	const sectionQuery = $derived(
		createMenuGetSectionsGetMenusSections({
			menuId: $formData.menuId,
			sectionId: 0,
		})
	);
	const sectionList = $derived.by(() => {
		return (
			$sectionQuery.data?.sections?.map((m) => {
				return {
					label: m.name,
					value: m.menuSectionId.toString(),
				};
			}) ?? []
		);
	});

	const menuValue = $derived(menuList.find((i) => i.value == $formData.menuId.toString())?.label);
	const sectionValue = $derived(
		sectionList.find((i) => i.value == $formData.menuSectionId.toString())?.label
	);
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="max-h-[98%] overflow-scroll">
		<form method="POST" use:enhance>
			<Dialog.Header>
				<Dialog.Title>{isEdit ? "Edit" : "Add"} Menu Item</Dialog.Title>
				<Dialog.Description>Complete form to {isEdit ? "Edit" : "Add"} menu item</Dialog.Description
				>
			</Dialog.Header>
			<div class="flex flex-col gap-4 p-4">
				<Form.Field {form} name="menuId">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Menu</Form.Label>
							<Select.Root type="single" name="menuId" bind:value={$formData.menuId}>
								<Select.Trigger {...props}>
									{menuValue ? menuValue : "Select a menuId"}
								</Select.Trigger>
								<Select.Content>
									{#each menuList as menu}
										<Select.Item value={menu.value}>{menu.label}</Select.Item>
									{/each}
								</Select.Content>
							</Select.Root>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="menuSectionId">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Section</Form.Label>
							<Select.Root type="single" name="menuSectionId" bind:value={$formData.menuSectionId}>
								<Select.Trigger {...props}>
									{sectionValue ? sectionValue : "Select a Section"}
								</Select.Trigger>
								<Select.Content>
									{#each sectionList as section}
										<Select.Item value={section.value}>{section.label}</Select.Item>
									{/each}
								</Select.Content>
							</Select.Root>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="name">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Name</Form.Label>
							<Input {...props} bind:value={$formData.name} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="description">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Description</Form.Label>
							<Input {...props} bind:value={$formData.description} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="price">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Price</Form.Label>
							<Input {...props} type="number" step="0.01" bind:value={$formData.price} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="stockPrice">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Stock Price</Form.Label>
							<Input {...props} type="number" step="0.01" bind:value={$formData.stockPrice} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="IsEnabled">
					<Form.Control>
						{#snippet children({ props })}
							<div class="flex items-center gap-2">
								<Checkbox {...props} bind:checked={$formData.IsEnabled} />
								<Form.Label>Enabled</Form.Label>
							</div>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="isAvailable">
					<Form.Control>
						{#snippet children({ props })}
							<div class="flex items-center gap-2">
								<Checkbox {...props} bind:checked={$formData.isAvailable} />
								<Form.Label>Available</Form.Label>
							</div>
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
