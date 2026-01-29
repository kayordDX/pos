<script lang="ts">
	import type { MenuItemMenuItemAdminDTO } from "$lib/api";
	import { getError } from "$lib/types";
	import {
		Button,
		Checkbox,
		Collapsible,
		Dialog,
		Input,
		Loader,
		Select,
		Textarea,
	} from "@kayord/ui";
	import { toast } from "@kayord/ui/sonner";
	import { Form } from "@kayord/ui/form";
	import { defaults, superForm } from "sveltekit-superforms";
	import { zod4 } from "sveltekit-superforms/adapters";
	import { z } from "zod";
	import { status } from "$lib/stores/status.svelte";
	import {
		createMenuItemUpdate,
		createMenuItemCreate,
		createMenuList,
		createMenuGetSectionsGetMenusSections,
		createDivisionGetAll,
		createBillCategoryGetAll,
		createAIGenerateMenuDescription,
	} from "$lib/api";
	import Extras from "./Extras.svelte";
	import Options from "./Options.svelte";
	import { ChevronsUpDownIcon, WandSparklesIcon } from "@lucide/svelte";

	interface Props {
		refetch: () => void;
		open: boolean;
		menuItem?: MenuItemMenuItemAdminDTO;
	}
	let { refetch, open = $bindable(false), menuItem }: Props = $props();

	const isEdit = $derived(menuItem != null);

	const editMutation = createMenuItemUpdate();
	const createMutation = createMenuItemCreate();

	const schema = z.object({
		name: z.string().min(1, { message: "Name is Required" }),
		menuId: z.coerce.number(),
		menuSectionId: z.coerce.number(),
		divisionId: z.coerce.number(),
		description: z.string().min(1, { message: "Description is Required" }),
		price: z.number(),
		isEnabled: z.boolean(),
		isAvailable: z.boolean(),
		positionId: z.number(),
		billCategoryId: z.number().min(1, { message: "Bill Category is Required" }),
		extraGroupIds: z.array(z.number()),
		optionGroupIds: z.array(z.number()),
	});
	type FormSchema = z.infer<typeof schema>;

	const updateMenu = async (data: FormSchema) => {
		try {
			open = false;
			if (isEdit) {
				await editMutation.mutateAsync({
					data: {
						id: menuItem?.menuItemId ?? 0,
						name: data.name,
						menuSectionId: data.menuSectionId,
						divisionId: data.divisionId,
						description: data.description,
						price: data.price,
						isEnabled: data.isEnabled,
						isAvailable: data.isAvailable,
						positionId: data.positionId,
						extraGroupIds: data.extraGroupIds,
						optionGroupIds: data.optionGroupIds,
						billCategoryId: data.billCategoryId,
					},
				});
				toast.info("Edited Menu");
			} else {
				await createMutation.mutateAsync({
					data: {
						name: data.name,
						menuSectionId: data.menuSectionId,
						divisionId: data.divisionId,
						description: data.description,
						price: data.price,
						isEnabled: data.isEnabled,
						isAvailable: data.isAvailable,
						positionId: data.positionId,
						extraGroupIds: data.extraGroupIds,
						optionGroupIds: data.optionGroupIds,
						billCategoryId: data.billCategoryId,
					},
				});
				toast.info("Added Menu");
			}
			refetch();
		} catch (err) {
			toast.error(getError(err).message);
		}
	};

	const defaultValues = $derived({
		name: menuItem?.name ?? "",
		menuId: menuItem?.menuSection.menuId ?? 0,
		menuSectionId: menuItem?.menuSectionId ?? 0,
		divisionId: menuItem?.divisionId ?? 0,
		description: menuItem?.description ?? "",
		price: menuItem?.price ?? 0,
		stockPrice: menuItem?.stockPrice ?? 0,
		isEnabled: menuItem?.isEnabled ?? true,
		isAvailable: menuItem?.isAvailable ?? true,
		positionId: menuItem?.position ?? 0,
		billCategoryId: menuItem?.billCategoryId ?? 0,
		extraGroupIds: menuItem?.menuItemExtraGroups.map((i) => i.extraGroupId) ?? new Array<number>(),
		optionGroupIds:
			menuItem?.menuItemOptionGroups.map((i) => i.optionGroupId) ?? new Array<number>(),
	});
	// svelte-ignore state_referenced_locally
	const form = superForm(defaults(defaultValues, zod4(schema)), {
		SPA: true,
		validators: zod4(schema),
		id: `menu-item-${menuItem?.menuItemId ?? 0}`,
		resetForm: false,
		onUpdate({ form }) {
			if (form.valid) {
				updateMenu(form.data);
			}
		},
	});

	const { form: formData, enhance, reset } = form;

	$effect(() => {
		if (open == true && isEdit) {
			reset({ data: defaultValues });
		}
	});

	const menuQuery = createMenuList(() => ({ outletId: status.value.outletId }));
	const menuList = $derived.by(() => {
		return (
			menuQuery.data?.map((m) => ({
				label: m.name,
				value: m.id.toString(),
			})) ?? []
		);
	});

	const sectionQuery = createMenuGetSectionsGetMenusSections(() => ({
		menuId: $formData.menuId,
		sectionId: 0,
	}));
	const sectionList = $derived.by(() => {
		return (
			sectionQuery.data?.sections?.map((m) => ({
				label: m.name,
				value: m.menuSectionId.toString(),
			})) ?? []
		);
	});

	const divisionQuery = createDivisionGetAll(() => ({ outletId: status.value.outletId }));
	const divisionList = $derived.by(() => {
		return (
			divisionQuery.data?.map((m) => ({
				label: m.divisionName,
				value: m.divisionId.toString(),
			})) ?? []
		);
	});

	const billCatQuery = createBillCategoryGetAll(() => ({ outletId: status.value.outletId }));
	const billCatList = $derived.by(() => {
		return (
			billCatQuery.data?.map((m) => ({
				label: m.name,
				value: m.id.toString(),
			})) ?? []
		);
	});

	const menuValue = $derived(menuList.find((i) => i.value == $formData.menuId.toString())?.label);
	const sectionValue = $derived(
		sectionList.find((i) => i.value == $formData.menuSectionId.toString())?.label
	);
	const divisionValue = $derived(
		divisionList.find((i) => i.value == $formData.divisionId.toString())?.label
	);
	const billCategoryValue = $derived(
		billCatList.find((i) => i.value == $formData.billCategoryId.toString())?.label
	);

	const aiGen = createAIGenerateMenuDescription();
	let aiLoading = $state(false);
	const generateDescription = async () => {
		try {
			aiLoading = true;
			const results = await aiGen.mutateAsync({
				data: {
					menu: menuValue ?? "",
					section: sectionValue ?? "",
					name: $formData.name,
				},
			});
			$formData.description = results;
		} catch (err) {
			toast.error(getError(err).message);
		} finally {
			aiLoading = false;
		}
	};
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="max-h-[98%] overflow-auto">
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
							<Select.Root
								type="single"
								name="menuId"
								bind:value={
									() => $formData.menuId.toString(), (v) => ($formData.menuId = Number(v))
								}
								allowDeselect={false}
							>
								<Select.Trigger {...props}>
									{menuValue ? menuValue : "Select Menu"}
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
							<Select.Root
								type="single"
								name="menuSectionId"
								bind:value={
									() => $formData.menuSectionId.toString(),
									(v) => ($formData.menuSectionId = Number(v))
								}
								allowDeselect={false}
							>
								<Select.Trigger {...props}>
									{sectionValue ? sectionValue : "Select Section"}
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
				<Form.Field {form} name="divisionId">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Division</Form.Label>
							<Select.Root
								type="single"
								name="divisionId"
								bind:value={
									() => $formData.divisionId.toString(), (v) => ($formData.divisionId = Number(v))
								}
								allowDeselect={false}
							>
								<Select.Trigger {...props}>
									{divisionValue ? divisionValue : "Select Division"}
								</Select.Trigger>
								<Select.Content>
									{#each divisionList as division}
										<Select.Item value={division.value}>{division.label}</Select.Item>
									{/each}
								</Select.Content>
							</Select.Root>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="billCategoryId">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Bill Category</Form.Label>
							<Select.Root
								type="single"
								name="billCategoryId"
								bind:value={
									() => $formData.billCategoryId.toString(),
									(v) => ($formData.billCategoryId = Number(v))
								}
								allowDeselect={false}
							>
								<Select.Trigger {...props}>
									{billCategoryValue ? billCategoryValue : "Select Bill Category"}
								</Select.Trigger>
								<Select.Content>
									{#each billCatList as cat}
										<Select.Item value={cat.value}>{cat.label}</Select.Item>
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
							<Form.Label>
								Description
								{#if status.hasFeature("ai")}
									<Button
										onclick={generateDescription}
										disabled={aiLoading}
										size="sm"
										variant="ghost"
									>
										{#if aiLoading}
											<Loader class="m-0" />
										{:else}
											<WandSparklesIcon />
										{/if}
										AI Generate
									</Button>
								{/if}
							</Form.Label>

							<Textarea {...props} bind:value={$formData.description} disabled={aiLoading} />
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
				<Form.Field {form} name="isEnabled">
					<Form.Control>
						{#snippet children({ props })}
							<div class="flex items-center gap-2">
								<Checkbox {...props} bind:checked={$formData.isEnabled} />
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
				<Form.Field {form} name="positionId">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Position</Form.Label>
							<Input {...props} type="number" step="1" bind:value={$formData.positionId} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Collapsible.Root>
					<Collapsible.Trigger class="w-full flex items-center justify-between">
						Extra's and Options <ChevronsUpDownIcon class="size-4" />
					</Collapsible.Trigger>
					<Collapsible.Content>
						<div class="flex flex-col gap-2 pt-2">
							<Extras bind:extras={$formData.extraGroupIds} />
							<Options bind:options={$formData.optionGroupIds} />
						</div>
					</Collapsible.Content>
				</Collapsible.Root>
			</div>
			<Dialog.Footer class="gap-2">
				<Button type="submit">Submit</Button>
				<Button variant="outline" onclick={() => (open = false)}>Cancel</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
