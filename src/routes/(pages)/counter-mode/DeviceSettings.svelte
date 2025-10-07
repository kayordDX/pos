<script lang="ts">
	import { logout } from "$lib/firebase.svelte";
	import { getError } from "$lib/types";
	import { Button, Card, Form, Input, toast } from "@kayord/ui";
	import { TvMinimalIcon } from "@lucide/svelte";
	import { defaults, superForm } from "sveltekit-superforms";
	import { zod4 } from "sveltekit-superforms/adapters";
	import z from "zod";
	import { status } from "$lib/stores/status.svelte";
	import { mode } from "$lib/stores/mode.svelte";
	import { createOutletCounterCreate } from "$lib/api";

	export const schema = z.object({
		deviceName: z.string().min(1, { message: "Please enter a device name" }),
	});
	type FormSchema = z.infer<typeof schema>;

	const mutation = createOutletCounterCreate();
	const onSubmit = async (data: FormSchema) => {
		try {
			const deviceId = await mutation.mutateAsync({
				data: { outletId: status.value.outletId, deviceName: data.deviceName },
			});

			if (deviceId.length > 0) {
				mode.value = {
					mode: "counter",
					outletId: status.value.outletId,
					deviceId: deviceId,
					deviceName: data.deviceName,
				};
				await logout();
				toast.info("Updated user pin");
			} else {
				toast.error("An error occurred getting Device Id");
			}
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

	const { form: formData, enhance } = form;
</script>

<Card.Root class="p-5 m-5">
	<Card.Header>
		<Card.Title>Device Settings enable Counter Mode</Card.Title>
		<Card.Description>This will log you out and activate counter mode on device</Card.Description>
	</Card.Header>
	<form method="POST" use:enhance>
		<Card.Content>
			<Form.Field {form} name="deviceName">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Device Name</Form.Label>
						<Input {...props} class="max-w-xs" bind:value={$formData.deviceName} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		</Card.Content>
		<Card.Footer class="mt-4">
			<Button variant="destructive" type="submit">
				<TvMinimalIcon /> Enable Counter Mode
			</Button>
		</Card.Footer>
	</form>
</Card.Root>
