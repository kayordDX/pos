<script lang="ts">
	import { Button, Card, Form, Input, toast } from "@kayord/ui";
	import { Control, Field, FieldErrors } from "@kayord/ui/formsnap";
	import { zod } from "sveltekit-superforms/adapters";
	import { defaults, superForm } from "sveltekit-superforms/client";
	import { z } from "zod";
	import { createBillEmailBill } from "$lib/api";
	import { page } from "$app/state";
	import { getError } from "$lib/types";
	import { goto } from "$app/navigation";

	interface Props {
		bookingId: number;
	}
	let { bookingId }: Props = $props();

	const mutation = createBillEmailBill();

	const goBack = () => {
		goto(`/table/bill/${bookingId}`);
	};

	const schema = z.object({
		email: z
			.string()
			.min(1, { message: "Email is Required" })
			.email({ message: "This is not a valid email" }),
		name: z.string().min(1, { message: "Name is Required" }),
	});
	type FormSchema = z.infer<typeof schema>;
	const onSubmit = async (data: FormSchema) => {
		try {
			await $mutation.mutateAsync({
				data: { email: data.email, name: data.name, tableBookingId: Number(page.params.id) },
			});
			toast.info(`Sending email to ${data.email}`);
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
				<Card.Title>Email bill #{bookingId}</Card.Title>
				<Card.Description>This will send email with bill attached</Card.Description>
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
				<Field {form} name="email">
					<Control>
						<Form.Label>Email</Form.Label>
						<Input type="email" bind:value={$formData.email} />
					</Control>
					<FieldErrors class="text-sm text-destructive" />
				</Field>
			</div>
			<Card.Footer class="flex justify-between items-center">
				<Button variant="secondary" onclick={goBack}>Cancel</Button>
				<Button type="submit" disabled={$mutation.isPending}>Send Email</Button>
			</Card.Footer>
		</form>
	</div>
</Card.Root>
