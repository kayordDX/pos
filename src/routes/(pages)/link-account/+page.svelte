<script lang="ts">
	import Header from "$lib/components/Header/Header.svelte";
	import { getError } from "$lib/types";
	import { Button, Card, Form, InputOTP, toast } from "@kayord/ui";
	import { zod4 } from "sveltekit-superforms/adapters";
	import { defaults, superForm } from "sveltekit-superforms/client";
	import z from "zod";
	import { createUserLinkAccount } from "$lib/api";

	export const schema = z.object({
		token: z.string().length(6, { message: "Please enter valid code" }),
	});
	type FormSchema = z.infer<typeof schema>;

	const linkAccountMutation = createUserLinkAccount();

	const onSubmit = async (data: FormSchema) => {
		try {
			const response = await $linkAccountMutation.mutateAsync({
				data: { otp: data.token.toUpperCase() },
			});

			if (response.isSuccess) {
				toast.info(response.message == null ? "Linking account" : response.message);
			} else {
				toast.error(response.message ?? "An error occurred while linking account");
			}
		} catch (err) {
			toast.error(getError(err).message);
		}
	};

	const form = superForm(defaults(zod4(schema)), {
		SPA: true,
		validators: zod4(schema),
		onUpdate({ form }) {
			if (form.valid) {
				onSubmit(form.data);
			}
		},
	});
	const { form: formData, enhance } = form;
</script>

<Header />

<Card.Root class="p-5 m-5 max-w-sm flex justify-self-center">
	<Card.Header>
		<Card.Title>Link Account</Card.Title>
		<Card.Description>
			To link your account, please enter the 6-digit code displayed on your device
		</Card.Description>
	</Card.Header>
	<form method="POST" use:enhance>
		<Card.Content class="flex flex-col gap-2 items-center">
			<Form.Field {form} name="token">
				<Form.Control>
					{#snippet children({ props })}
						<InputOTP.Root
							maxlength={6}
							type="text"
							inputmode="text"
							{...props}
							bind:value={$formData.token}
							class="uppercase"
						>
							{#snippet children({ cells })}
								<InputOTP.Group>
									{#each cells.slice(0, 3) as cell (cell)}
										<InputOTP.Slot {cell} />
									{/each}
								</InputOTP.Group>
								<InputOTP.Group>
									{#each cells.slice(3, 6) as cell (cell)}
										<InputOTP.Slot {cell} />
									{/each}
								</InputOTP.Group>
							{/snippet}
						</InputOTP.Root>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Button type="submit" class="w-full">Link Account</Button>
		</Card.Content>
	</form>
</Card.Root>
