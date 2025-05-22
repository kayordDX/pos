<script lang="ts">
	import { Badge, Button, Card, Dialog, Form, Input, Label, Loader } from "@kayord/ui";
	import { goto } from "$app/navigation";
	import Error from "$lib/components/Error.svelte";
	import { getError } from "$lib/types";
	import { createTableBookingCreate, createTableGetAvailable } from "$lib/api";
	import { status } from "$lib/stores/status.svelte";
	import { z } from "zod";
	import { defaults, superForm } from "sveltekit-superforms/client";
	import { zod } from "sveltekit-superforms/adapters";
	import { Control, Field, FieldErrors } from "@kayord/ui/formsnap";

	const query = createTableGetAvailable({ outletId: status.value?.outletId ?? 0 });
	let dialogOpen = $state(false);
	let tableId: number = 0;

	const selectTable = (id: number) => {
		dialogOpen = true;
		tableId = id;
	};

	const mutate = createTableBookingCreate();

	const schema = z.object({
		bookingName: z.string().min(1, { message: "Booking Name is Required" }),
	});
	type FormSchema = z.infer<typeof schema>;
	const onSubmit = async (data: FormSchema) => {
		await $mutate.mutateAsync({
			data: {
				bookingName: data.bookingName,
				salesPeriodId: status.value?.salesPeriodId ?? 0,
				tableId: tableId,
			},
		});
		dialogOpen = false;
		goto("/waiter");
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
	const { form: formData, enhance } = form;
</script>

<div class="m-8">
	<h1>Available Tables</h1>
	<p class="text-muted-foreground">Select table to book</p>

	{#if $query.isPending}
		<Loader />
	{/if}
	{#if $query.error}
		<Error message={getError($query.error).message} />
	{/if}

	{#if $query.isSuccess}
		<div class="flex flex-wrap gap-4 mt-4 w-full">
			{#each $query.data as table}
				<button class="text-start w-full md:max-w-md" onclick={() => selectTable(table.tableId)}>
					<Card.Root class="p-4 gap-0">
						<div class="flex justify-between gap-2">
							<h3>{table.name}</h3>
							<Badge>{table.capacity}</Badge>
						</div>
						<p class="text-xs">{table.section.name}</p>
					</Card.Root>
				</button>
			{/each}
		</div>
	{/if}

	<Dialog.Root bind:open={dialogOpen}>
		<Dialog.Trigger />
		<!-- fixed bottom-0 left-0 right-0 flex max-h-[96%] w-full -->
		<Dialog.Content class="max-h-[98%] overflow-auto">
			<form use:enhance method="POST">
				<Dialog.Header>
					<Dialog.Title>Book Table</Dialog.Title>
					<Dialog.Description>This will book the table and assign it to you</Dialog.Description>
				</Dialog.Header>
				<div class="mx-auto flex w-full flex-col overflow-auto rounded-t-[10px] p-4 gap-2">
					{#if $mutate.isPending}
						<Loader />
					{/if}

					<Field {form} name="bookingName">
						<Control>
							<Form.Label>Booking Name</Form.Label>
							<Input bind:value={$formData.bookingName} />
						</Control>
						<FieldErrors class="text-sm text-destructive" />
					</Field>
				</div>

				<Dialog.Footer>
					<Button type="submit">Make Booking</Button>
				</Dialog.Footer>
			</form>
		</Dialog.Content>
	</Dialog.Root>
</div>
