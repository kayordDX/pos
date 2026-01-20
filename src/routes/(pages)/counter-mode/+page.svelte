<script lang="ts">
	import Header from "$lib/components/Header/Header.svelte";
	import { getError } from "$lib/types";
	import { Card, Input, Label, Switch } from "@kayord/ui";
	import { toast } from "@kayord/ui/sonner";
	import { Form } from "@kayord/ui/form";
	import { defaults, superForm } from "sveltekit-superforms";
	import z from "zod";
	import { zod4 } from "sveltekit-superforms/adapters";
	import { createUserPinGet, createUserPinCreate } from "$lib/api";
	import DeviceSettings from "./DeviceSettings.svelte";
	import { status } from "$lib/stores/status.svelte";
	import Devices from "./Devices.svelte";

	const query = createUserPinGet(() => ({ query: { retry: false } }));
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
			await pinMutation.mutateAsync({
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
		if (query.data) {
			reset({ data: { IsEnabled: query.data.isEnabled, pin: query.data.pin } });
		}
	});
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
				<Form.Description>Set pin for counter mode</Form.Description>
				<Form.FieldErrors />
			</Form.Field>
		</Card.Content>
		<Card.Footer>
			<Form.Button type="submit">Save</Form.Button>
		</Card.Footer>
	</Card.Root>
</form>
{#if status.hasRole("manager")}
	<DeviceSettings />
	<Devices />
{/if}
