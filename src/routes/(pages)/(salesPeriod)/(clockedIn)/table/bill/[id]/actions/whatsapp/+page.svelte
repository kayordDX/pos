<script lang="ts">
	import { Button, Card, Form, Input, toast } from "@kayord/ui";
	import { Control, Field, FieldErrors } from "@kayord/ui/formsnap";
	import { zod } from "sveltekit-superforms/adapters";
	import { defaults, superForm } from "sveltekit-superforms/client";
	import { z } from "zod";
	import { createBillWhatsappBill, createWhatsappStatus } from "$lib/api";
	import { page } from "$app/state";
	import { getError } from "$lib/types";
	import { goto } from "$app/navigation";
	import { CheckIcon, XIcon } from "@lucide/svelte";

	const bookingId = Number(page.params.id);

	const query = createWhatsappStatus();
	const mutation = createBillWhatsappBill();

	const canWhatsapp = $derived($query.data?.success ?? false);

	const goBack = () => {
		goto(`/table/bill/${bookingId}`);
	};

	const schema = z.object({
		phoneNumber: z.string().min(1, { message: "Phone number is required" }),
		countryCode: z.string().default("27"),
		name: z.string().min(1, { message: "Name is Required" }),
	});
	type FormSchema = z.infer<typeof schema>;
	const onSubmit = async (data: FormSchema) => {
		try {
			await $mutation.mutateAsync({
				data: {
					phoneNumber: data.phoneNumber,
					countryCode: data.countryCode,
					name: data.name,
					tableBookingId: Number(page.params.id),
				},
			});
			toast.info(`Sending whatsapp to ${data.phoneNumber}`);
			await goBack();
		} catch (err) {
			toast.error(getError(err).message);
		}
	};

	const form = superForm(defaults(zod(schema)), {
		SPA: true,
		resetForm: false,
		validators: zod(schema),
		onUpdate({ form }) {
			if (form.valid) {
				onSubmit(form.data);
			}
		},
	});

	const { form: formData, enhance } = form;
</script>

<Card.Root class="m-4">
	<div class="flex flex-col gap-2">
		<form use:enhance method="POST">
			<Card.Header>
				<Card.Title>Whatsapp bill #{bookingId}</Card.Title>
				<Card.Description>This will send a whatsapp message with bill attached</Card.Description>
				<div class="flex items-center gap-2">
					Status: {#if $query.data?.success}
						<CheckIcon class="text-secondary-foreground" />
					{:else}
						<XIcon class="text-primary" />
					{/if}
				</div>
				<div>State: {$query.data?.state}</div>
				{#if !canWhatsapp}
					<div class="text-sm text-destructive">Whatsapp is not enabled</div>
				{/if}
			</Card.Header>
			<div
				class="mx-auto flex w-full flex-col overflow-auto rounded-t-[10px] p-4 gap-2 overflow-y-scroll"
			>
				<Field {form} name="name">
					<Control>
						<Form.Label>Name</Form.Label>
						<Input bind:value={$formData.name} />
					</Control>
					<FieldErrors class="text-sm text-destructive" />
				</Field>
				<Field {form} name="phoneNumber">
					<Control>
						<Form.Label>Phone Number</Form.Label>
						<Input bind:value={$formData.phoneNumber} />
					</Control>
					<FieldErrors class="text-sm text-destructive" />
				</Field>
				<Field {form} name="countryCode">
					<Control>
						<Form.Label>Country Code</Form.Label>
						<Input bind:value={$formData.countryCode} />
					</Control>
					<FieldErrors class="text-sm text-destructive" />
				</Field>
			</div>
			<Card.Footer class="flex justify-between items-center">
				<Button variant="secondary" onclick={goBack}>Cancel</Button>
				<Button type="submit" disabled={$mutation.isPending || !canWhatsapp}>Send Whatsapp</Button>
			</Card.Footer>
		</form>
	</div>
</Card.Root>
