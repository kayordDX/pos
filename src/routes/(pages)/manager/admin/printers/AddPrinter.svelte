<script lang="ts">
	import { createPrinterCreate } from "$lib/api";
	import { Button, Dialog, Form, Input, toast } from "@kayord/ui";
	import { PlusIcon } from "lucide-svelte";
	import { defaults, superForm } from "sveltekit-superforms";
	import { zod } from "sveltekit-superforms/adapters";
	import { z } from "zod";
	import { status } from "$lib/stores/status.svelte";
	import { getError } from "$lib/types";

	const mutation = createPrinterCreate();

	interface Props {
		refetch: () => void;
	}
	let { refetch }: Props = $props();

	const schema = z.object({
		printerName: z.string().min(1, { message: "Printer Name is Required" }),
		iPAddress: z.string().min(1, { message: "IPAddress is Required" }),
		port: z.number().default(9100),
		lineCharacters: z.number().default(64),
		isEnabled: z.boolean().default(true),
	});

	let open = $state(false);

	type FormSchema = z.infer<typeof schema>;

	const createPrinter = async (data: FormSchema) => {
		try {
			await $mutation.mutateAsync({
				data: {
					outletId: status.value.outletId,
					ipAddress: data.iPAddress,
					lineCharacters: data.lineCharacters,
					port: data.port,
					printerName: data.printerName,
				},
			});
			open = false;
			toast.info("Created Printer");
			refetch();
		} catch (err) {
			toast.error(getError(err).message);
		}
	};

	const form = superForm(defaults(zod(schema)), {
		SPA: true,
		validators: zod(schema),
		onUpdate({ form }) {
			if (form.valid) {
				createPrinter(form.data);
			}
		},
	});

	const { form: formData, enhance } = form;
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger class="w-full">
		<Button class="w-full">
			<PlusIcon class="mr-2 size-4" />Add Printer
		</Button>
	</Dialog.Trigger>
	<Dialog.Content>
		<form method="POST" use:enhance>
			<Dialog.Header>
				<Dialog.Title>Create new Printer</Dialog.Title>
				<Dialog.Description>Complete form to add printer to Outlet</Dialog.Description>
			</Dialog.Header>
			<div class="flex flex-col gap-4 p-4">
				<Form.Field {form} name="printerName">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Printer Name</Form.Label>
							<Input {...props} bind:value={$formData.printerName} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="iPAddress">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>IP Address</Form.Label>
							<Input {...props} bind:value={$formData.iPAddress} />
						{/snippet}
					</Form.Control>
					<Form.Description>
						Make sure you enter a valid IP Address. Example 10.0.0.52
					</Form.Description>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="port">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Port</Form.Label>
							<Input {...props} bind:value={$formData.port} />
						{/snippet}
					</Form.Control>
					<Form.Description>The printer port. Default is 9100</Form.Description>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="lineCharacters">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Printer Line Characters</Form.Label>
							<Input {...props} bind:value={$formData.lineCharacters} type="number" />
						{/snippet}
					</Form.Control>
					<Form.Description>The number of characters per line. The default is 64.</Form.Description>
					<Form.FieldErrors />
				</Form.Field>
			</div>
			<Dialog.Footer>
				<Button type="submit">Submit</Button>
				<Dialog.Close>Cancel</Dialog.Close>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
