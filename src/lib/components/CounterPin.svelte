<script lang="ts">
	import { Dialog, Form, Input, Loader, toast } from "@kayord/ui";
	import { defaults, superForm } from "sveltekit-superforms";
	import { zod4 } from "sveltekit-superforms/adapters";
	import z from "zod";
	import { createUserPinLogin } from "$lib/api";
	import { signInCustomToken } from "$lib/firebase.svelte";
	import { goto } from "$app/navigation";

	interface Props {
		open: boolean;
		name: string;
		userId: string;
		outletId: number;
	}

	let { open = $bindable(), name, userId, outletId }: Props = $props();

	let isLoading = $state(false);

	export const schema = z.object({
		pin: z
			.string()
			.min(4, { message: "Pin needs to be at least 4 characters long" })
			.max(12, { message: "Pin cannot be longer than 12 characters" }),
	});
	type FormSchema = z.infer<typeof schema>;

	const form = superForm(defaults(zod4(schema)), {
		SPA: true,
		validators: zod4(schema),
		onUpdate({ form }) {
			if (form.valid) {
				onSubmit(form.data);
			}
		},
	});

	const loginMutation = createUserPinLogin();
	const onSubmit = async (data: FormSchema) => {
		try {
			isLoading = true;
			const loginResult = await $loginMutation.mutateAsync({
				data: { pin: data.pin, userId, outletId },
			});
			await signInCustomToken(loginResult.token);
			goto("/");
		} catch (err) {
			toast.error("Error Logging in");
		} finally {
			isLoading = false;
		}
	};

	const { form: formData, enhance } = form;
</script>

<Dialog.Root bind:open>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Enter Pin</Dialog.Title>
			<Dialog.Description>
				You are logging in as {name}
			</Dialog.Description>
		</Dialog.Header>
		<form method="POST" use:enhance class="flex flex-col gap-2">
			<Form.Field {form} name="pin">
				<Form.Control>
					{#snippet children({ props })}
						<Input {...props} type="password" bind:value={$formData.pin} autocomplete="off" />
					{/snippet}
				</Form.Control>
				<Form.Description>Please enter your counter</Form.Description>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Button type="submit" disabled={isLoading}>
				<Loader class="mr-0" {isLoading} />
				Login
			</Form.Button>
		</form>
	</Dialog.Content>
</Dialog.Root>
