<script lang="ts">
	import Header from "$lib/components/Header/Header.svelte";
	import { getError } from "$lib/types";
	import { Button, Card, Form, Input, InputOTP, Label, Switch, toast } from "@kayord/ui";
	import { TvMinimalIcon } from "@lucide/svelte";
	import { defaults, superForm } from "sveltekit-superforms";
	import z from "zod";
	import { zod4 } from "sveltekit-superforms/adapters";
	import { createUserPinGet, createUserPinCreate } from "$lib/api";
	import { mode } from "$lib/stores/mode.svelte";
	import { status } from "$lib/stores/status.svelte";
	import { logout } from "$lib/firebase.svelte";

	const query = createUserPinGet({ query: { retry: false } });
	const pinMutation = createUserPinCreate();

	export const schema = z.object({
		pin: z
			.string()
			.min(4, { message: "Pin needs to be at least 4 characters long" })
			.max(12, { message: "Pin cannot be longer than 12 characters" }),
		IsEnabled: z.boolean(),
	});
	type FormSchema = z.infer<typeof schema>;

	const onSubmit = async (data: FormSchema) => {
		try {
			await $pinMutation.mutateAsync({
				data: { isEnabled: data.IsEnabled, pin: data.pin },
			});
			toast.info("Updated user pin");
		} catch (err) {
			toast.error(getError(err).message);
		}
	};

	const form = superForm(defaults(zod4(schema)), {
		SPA: true,
		validators: zod4(schema),
		resetForm: false,
		onUpdate({ form }) {
			if (form.valid) {
				onSubmit(form.data);
			}
		},
	});

	const { form: formData, enhance, reset } = form;

	$effect(() => {
		if ($query.data) {
			reset({ data: { IsEnabled: $query.data.isEnabled, pin: $query.data.pin } });
		}
	});

	const enableCounterMode = async () => {
		try {
			mode.value = { mode: "counter", outletId: status.value.outletId };
			await logout();
		} catch (err) {
			toast.error(getError(err).message);
		}
	};
</script>

<Header />

<form method="POST" use:enhance>
	<Card.Root class="p-5 m-5">
		<Card.Header>
			<Card.Title>User Settings</Card.Title>
			<Card.Description>Enable or Disable Counter Mode for current user</Card.Description>
		</Card.Header>
		<Card.Content class="flex flex-col gap-4">
			<Form.Field {form} name="IsEnabled">
				<div class="flex items-center space-x-2">
					<Switch id="different-outlet" bind:checked={$formData.IsEnabled} />
					<Label for="different-outlet">Pin Enabled</Label>
				</div>
			</Form.Field>
			<Form.Field {form} name="pin">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Pin</Form.Label>
						<Input
							{...props}
							class="max-w-xs"
							type="password"
							bind:value={$formData.pin}
							autocomplete="off"
						/>
					{/snippet}
				</Form.Control>
				<Form.Description>Request access to new outlet</Form.Description>
				<Form.FieldErrors />
			</Form.Field>
		</Card.Content>
		<Card.Footer>
			<Form.Button type="submit">Save</Form.Button>
		</Card.Footer>
	</Card.Root>
</form>

<Card.Root class="p-5 m-5">
	<Card.Header>
		<Card.Title>Device Settings enable Counter Mode</Card.Title>
		<Card.Description>This will log you out and activate counter mode on device</Card.Description>
	</Card.Header>
	<Card.Footer>
		<Button variant="destructive" onclick={enableCounterMode}>
			<TvMinimalIcon /> Enable Counter Mode
		</Button>
	</Card.Footer>
</Card.Root>
