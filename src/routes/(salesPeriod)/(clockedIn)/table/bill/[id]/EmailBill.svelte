<script lang="ts">
	import { Button, Drawer, Form, Input, toast } from "@kayord/ui";
	import { Control, Field, FieldErrors } from "@kayord/ui/formsnap";
	import { zod } from "sveltekit-superforms/adapters";
	import { defaults, superForm } from "sveltekit-superforms/client";
	import { z } from "zod";
	import { createTableBookingEmailBill } from "$lib/api";
	import { page } from "$app/stores";

	const mutation = createTableBookingEmailBill();

	export let bookingId: number;
	let dialogOpen = false;

	const schema = z.object({
		email: z
			.string()
			.min(1, { message: "Email is Required" })
			.email({ message: "This is not a valid email" }),
		name: z.string().min(1, { message: "Name is Required" }),
	});
	type FormSchema = z.infer<typeof schema>;
	const onSubmit = async (data: FormSchema) => {
		await $mutation.mutateAsync({
			data: { email: data.email, name: data.name, tableBookingId: Number($page.params.id) },
		});
		dialogOpen = false;
		toast.info(`Sending email to ${data.email}`);
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

<Button class="w-full" on:click={() => (dialogOpen = true)}>Email bill</Button>

<Drawer.Root bind:open={dialogOpen}>
	<Drawer.Trigger />
	<Drawer.Content class="fixed bottom-0 left-0 right-0 flex max-h-[96%] w-full">
		<form use:enhance method="POST">
			<Drawer.Header>
				<Drawer.Title>Email bill #{bookingId}</Drawer.Title>
				<Drawer.Description>This will send email with bill attached</Drawer.Description>
			</Drawer.Header>
			<div class="mx-auto flex w-full flex-col overflow-auto rounded-t-[10px] p-4 gap-2">
				<Field {form} name="name">
					<Control let:attrs>
						<Form.Label>Name</Form.Label>
						<Input bind:value={$formData.name} />
					</Control>
					<FieldErrors class="text-sm text-destructive" />
				</Field>
				<Field {form} name="email">
					<Control let:attrs>
						<Form.Label>Email</Form.Label>
						<Input type="email" bind:value={$formData.email} />
					</Control>
					<FieldErrors class="text-sm text-destructive" />
				</Field>
			</div>
			<Drawer.Footer>
				<Button type="submit" disabled={false}>Send Email</Button>
			</Drawer.Footer>
		</form>
	</Drawer.Content>
</Drawer.Root>
