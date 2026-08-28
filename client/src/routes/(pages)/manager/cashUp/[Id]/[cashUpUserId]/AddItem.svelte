<script lang="ts">
	import { page } from "$app/state";
	import { createCashUpUserCreate, createCashUpUserItemType } from "$lib/api";
	import { status } from "$lib/stores/status.svelte";
	import { Alert, Button, Dialog, Input, Select } from "@kayord/ui";
	import { Form } from "@kayord/ui/form";
	import { MessageCircleWarningIcon, PlusIcon } from "@lucide/svelte";
	import { zod4Client, zod4 } from "sveltekit-superforms/adapters";
	import { defaults, superForm } from "sveltekit-superforms/client";
	import { z } from "zod";

	interface Props {
		cashUpUserId: number;
		refetch: () => void;
	}

	let { refetch, cashUpUserId }: Props = $props();
	let open = $state(false);

	const query = createCashUpUserItemType(() => ({ isAuto: false }));

	const mutation = createCashUpUserCreate();

	export const schema = z.object({
		cashUpUserItemTypeId: z.number().min(1, { message: "Please select Cash Up User Item Type Id" }),
		value: z.number(),
	});
	type FormSchema = z.infer<typeof schema>;

	const onSubmit = async (data: FormSchema) => {
		await mutation.mutateAsync({
			data: {
				cashUpUserId: cashUpUserId,
				cashUpUserItemTypeId: data.cashUpUserItemTypeId,
				outletId: status.value.outletId,
				userId: page.params.Id ?? "",
				value: data.value,
			},
		});
		open = false;
		refetch();
	};

	const form = superForm(defaults({ value: 0 }, zod4(schema)), {
		SPA: true,
		validators: zod4Client(schema),
		onUpdate({ form }) {
			if (form.valid) {
				onSubmit(form.data);
			}
		},
	});
	const { form: formData, enhance } = form;

	const typeSelect = $derived(
		query.data?.find((i) => i.id === $formData.cashUpUserItemTypeId)?.itemType ?? "Select type"
	);
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger>
		<Button class="p-4" variant="secondary">
			<PlusIcon class="size-4 mr-2 hidden sm:block" /> Add Cash Up Item
		</Button>
	</Dialog.Trigger>
	<Dialog.Content class="max-h-[98%] overflow-auto">
		<form method="POST" use:enhance>
			<Dialog.Header>
				<Dialog.Title>Add Cash Up Item</Dialog.Title>
				<Dialog.Description>This will add additional items to user cash up.</Dialog.Description>
			</Dialog.Header>
			<div class="m-4">
				<Form.Field {form} name="cashUpUserItemTypeId">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Type</Form.Label>
							<Select.Root
								type="single"
								allowDeselect={false}
								onValueChange={(v: string) => {
									v && ($formData.cashUpUserItemTypeId = Number(v));
								}}
							>
								<Select.Trigger {...props}>
									{typeSelect}
								</Select.Trigger>
								<Select.Content>
									{#each query.data ?? [] as item}
										<Select.Item value={item.id.toString()}>{item.itemType}</Select.Item>
									{/each}
								</Select.Content>
							</Select.Root>
							<input hidden bind:value={$formData.cashUpUserItemTypeId} name={props.name} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="value">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Value</Form.Label>
							<Input
								{...props}
								type="number"
								step="0.01"
								bind:value={$formData.value}
								onfocus={(e) => e.currentTarget.select()}
							/>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Alert.Root class="border-primary">
					<MessageCircleWarningIcon class="size-5 animate-bounce text-primary" />
					<Alert.Title>Heads up!</Alert.Title>
					<Alert.Description>
						The amount of <span class="font-semibold">R{Number($formData.value).toFixed(2)}</span>
						will be
						{$formData.value > 0 ? "added to" : "removed from"} the balance.
					</Alert.Description>
				</Alert.Root>
			</div>
			<Dialog.Footer class="sm:flex-col gap-2">
				<Form.Button type="submit">Add</Form.Button>
				<Dialog.Close type="reset">Cancel</Dialog.Close>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
