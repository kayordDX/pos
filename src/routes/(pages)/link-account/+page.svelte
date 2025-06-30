<script lang="ts">
	import Header from "$lib/components/Header/Header.svelte";
	import { getError } from "$lib/types";
	import { Button, Card, Form, InputOTP, toast } from "@kayord/ui";
	import { zod } from "sveltekit-superforms/adapters";
	import { defaults, superForm } from "sveltekit-superforms/client";
	import z from "zod";

	export const schema = z.object({
		token: z.string().length(8, { message: "Please enter valid code" }),
	});
	type FormSchema = z.infer<typeof schema>;

	const onSubmit = async (data: FormSchema) => {
		try {
			// await $assignMutation.mutateAsync({
			// 	data: { outletId: data.outletId },
			// });
			toast.info("Linking account");
		} catch (err) {
			toast.error(getError(err).message);
		}
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

<Header />

<Card.Root class="p-5 m-5">
	<Card.Header>
		<Card.Title>Link Account</Card.Title>
		<Card.Description>
			To link your account, please enter the 8-digit code displayed on your device
		</Card.Description>
	</Card.Header>
	<Card.Content>
		<form method="POST" use:enhance>
			<Form.Field {form} name="token">
				<Form.Control>
					{#snippet children({ props })}
						<InputOTP.Root pattern="[0-9A-Z]" maxlength={6} {...props} bind:value={$formData.token}>
							{#snippet children({ cells })}
								<InputOTP.Group>
									{#each cells as cell (cell)}
										<InputOTP.Slot {cell} />
									{/each}
								</InputOTP.Group>
							{/snippet}
						</InputOTP.Root>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Button>Link Account</Button>
		</form>
	</Card.Content>
</Card.Root>
