<script lang="ts">
	import { Button, Checkbox } from "@kayord/ui";
	import BasketItem from "./BasketItem.svelte";
	import EmptyBasket from "./EmptyBasket.svelte";
	import { ChefHatIcon } from "lucide-svelte";
	import {
		createTableOrderGetBasket,
		createTableOrderSendToKitchen,
		createTableOrderUpdateOrderItem,
	} from "$lib/api";
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { defaults, superForm } from "sveltekit-superforms/client";
	import { zod } from "sveltekit-superforms/adapters";
	import { schema, type FormSchema } from "./types";
	import { Control, FieldErrors, Fieldset, Label } from "@kayord/ui/formsnap";

	const query = createTableOrderGetBasket({ tableBookingId: Number($page.params.id) });

	const refetch = async () => {
		await $query.refetch();
	};

	const updateOrderItem = createTableOrderUpdateOrderItem();

	const onSubmit = async (data: FormSchema) => {
		await $updateOrderItem.mutateAsync({
			data,
		});
		refetch();
	};
	const form = superForm(
		defaults(zod(schema), { defaults: { orderItemIds: [], orderItemStatusId: 2 } }),
		{
			SPA: true,
			validators: zod(schema),
			onUpdate({ form }) {
				if (form.valid) {
					onSubmit(form.data);
				}
			},
		}
	);
	const { form: formData, enhance } = form;

	const mutation = createTableOrderSendToKitchen();

	const sendAllToKitchen = async () => {
		await $mutation.mutateAsync({
			data: {
				tableBookingId: Number($page.params.id),
			},
		});
		goto(`/table/menu/${$page.params.id}`);
	};

	function addItem(id: number) {
		$formData.orderItemIds = [...$formData.orderItemIds, id];
	}

	function removeItem(id: number) {
		$formData.orderItemIds = $formData.orderItemIds.filter((i) => i !== id);
	}
</script>

<div class="m-2 mb-12">
	<form use:enhance>
		<Fieldset {form} name="orderItemIds" class="flex flex-col gap-2">
			{#each $query.data?.orderItems ?? [] as item, i (item.orderItemId)}
				{@const checked = $formData.orderItemIds.includes(item.orderItemId)}

				<BasketItem
					id={item.orderItemId}
					price={item.menuItem.price}
					note={item.note}
					options={item.orderItemOptions ?? []}
					extras={item.orderItemExtras ?? []}
					quantity={item.quantity}
					{refetch}
				>
					<div class="p-1 flex items-center gap-2">
						<Control let:attrs>
							<Checkbox
								class="rounded-[4px]"
								{...attrs}
								{checked}
								onCheckedChange={(v) => {
									if (v) {
										addItem(item.orderItemId);
									} else {
										removeItem(item.orderItemId);
									}
								}}
							/>
							<input hidden type="checkbox" name={attrs.name} value={item.orderItemId} {checked} />
							<Label class="font-bold">{item.menuItem.name}</Label>
						</Control>
					</div>
				</BasketItem>
			{/each}
			<FieldErrors />
		</Fieldset>
		{#if ($query.data?.orderItems.length ?? 0) <= 0}
			<EmptyBasket />
		{:else}
			<div class="flex flex-col mt-4 gap-2 w-full items-end">
				<div class="flex items-center gap-2">
					<div class="text-muted-foreground">Total:</div>
					<h2>R{$query.data?.total.toFixed(2)}</h2>
				</div>
				{#if $formData.orderItemIds.length > 0}
					<Button type="submit" variant="secondary" class="w-full border-2 border-primary">
						Send Selected to Kitchen <ChefHatIcon class="h-4 w-4 ml-2" />
					</Button>
				{:else}
					<Button on:click={sendAllToKitchen} class="w-full">
						Send All to Kitchen <ChefHatIcon class="h-4 w-4 ml-2" />
					</Button>
				{/if}
			</div>
		{/if}
	</form>
</div>
