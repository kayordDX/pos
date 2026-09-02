<script lang="ts">
	import { createPrinterCreate, createPrinterEdit, createDeviceList, type DTOPrinterDTO } from "$lib/api";
	import { Button, Dialog, Input, Select, Switch } from "@kayord/ui";
	import { toast } from "@kayord/ui/sonner";
	import { Form } from "@kayord/ui/form";
	import { defaults, superForm } from "sveltekit-superforms";
	import { zod4 } from "sveltekit-superforms/adapters";
	import { z } from "zod";
	import { status } from "$lib/stores/status.svelte";
	import { getError } from "$lib/types";
	import { untrack } from "svelte";

	const createMutation = createPrinterCreate();
	const editMutation = createPrinterEdit();

	/** Print devices are the owners of printers — pick the device this printer belongs to. */
	const devicesQuery = createDeviceList();
	const devices = $derived(devicesQuery.data ?? []);

	interface Props {
		refetch: () => void;
		open: boolean;
		printer?: DTOPrinterDTO;
		/** Used to prefill the form when adding a printer from a scan. */
		defaultIpAddress?: string;
		defaultPort?: number;
		defaultDeviceId?: number;
	}
	let { refetch, open = $bindable(false), printer, defaultIpAddress, defaultPort, defaultDeviceId }: Props = $props();

	const defaultValues = $derived({
		printerName: printer?.printerName,
		iPAddress: printer?.ipAddress ?? defaultIpAddress,
		port: printer?.port ?? defaultPort ?? 9100,
		lineCharacters: printer?.lineCharacters ?? 64,
		isEnabled: printer?.isEnabled ?? true,
		deviceId: printer?.deviceId ?? defaultDeviceId ?? 0,
	});

	const isEdit = $derived(printer != null);

	const schema = z.object({
		printerName: z.string().min(1, { message: "Printer Name is Required" }),
		iPAddress: z.string().min(1, { message: "IPAddress is Required" }),
		port: z.number(),
		lineCharacters: z.number(),
		isEnabled: z.boolean(),
		deviceId: z.number(),
	});

	type FormSchema = z.infer<typeof schema>;

	const createPrinter = async (data: FormSchema) => {
		try {
			if (isEdit) {
				open = false;
				await editMutation.mutateAsync({
					data: {
						id: printer?.id ?? 0,
						ipAddress: data.iPAddress,
						lineCharacters: data.lineCharacters,
						port: data.port,
						printerName: data.printerName,
						isEnabled: data.isEnabled,
						deviceId: data.deviceId,
					},
				});
				toast.info("Edited Printer");
			} else {
				open = false;
				await createMutation.mutateAsync({
					data: {
						outletId: status.value.outletId,
						ipAddress: data.iPAddress,
						lineCharacters: data.lineCharacters,
						port: data.port,
						printerName: data.printerName,
						deviceId: data.deviceId,
					},
				});
				toast.info("Created Printer");
			}
			refetch();
		} catch (err) {
			toast.error(getError(err).message);
		}
	};

	const form = superForm(
		defaults(
			untrack(() => defaultValues),
			zod4(schema)
		),
		{
			SPA: true,
			validators: zod4(schema),
			id: untrack(() => `printer-${printer?.id ?? 0}`),
			onUpdate({ form }) {
				if (form.valid) {
					createPrinter(form.data);
				}
			},
		}
	);

	const { form: formData, enhance, reset } = form;

	const selectedDeviceLabel = $derived(devices.find((d) => d.id === $formData.deviceId)?.name ?? "Select Device");

	// Reset form to default when open
	$effect(() => {
		if (open == true) {
			reset({ data: defaultValues });
		}
	});
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="max-h-[98%] overflow-auto">
		<form method="POST" use:enhance>
			<Dialog.Header>
				<Dialog.Title>{isEdit ? "Edit" : "Create"} Printer</Dialog.Title>
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
					<Form.Description>Make sure you enter a valid IP Address. Example 10.0.0.52</Form.Description>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="port">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Port</Form.Label>
							<Input {...props} bind:value={$formData.port} type="number" />
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
				{#if isEdit}
					<Form.Field {form} name="isEnabled">
						<Form.Control>
							{#snippet children({ props })}
								<div class="flex items-center gap-2">
									<Form.Label>Enabled</Form.Label>
									<Switch {...props} bind:checked={$formData.isEnabled} />
								</div>
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
				{/if}
				<Form.Field {form} name="deviceId">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Device</Form.Label>
							<Select.Root
								type="single"
								allowDeselect={false}
								name={props.name}
								bind:value={() => $formData.deviceId.toString(), (v) => ($formData.deviceId = Number(v))}
							>
								<Select.Trigger {...props}>{selectedDeviceLabel}</Select.Trigger>
								<Select.Content class="max-h-100">
									{#if devices.length === 0}
										<Select.Item value="" label="No devices" disabled>No devices — create one under Print Devices first</Select.Item>
									{:else}
										{#each devices as device (device.id)}
											<Select.Item value={device.id.toString()} label={device.name}>
												{device.name} · {device.printerCount} printer{device.printerCount === 1 ? "" : "s"}
											</Select.Item>
										{/each}
									{/if}
								</Select.Content>
							</Select.Root>
							<input hidden bind:value={$formData.deviceId} name={props.name} />
						{/snippet}
					</Form.Control>
					<Form.Description>The print device this printer is assigned to.</Form.Description>
					<Form.FieldErrors />
				</Form.Field>
			</div>
			<Dialog.Footer class="gap-2">
				<Button type="submit">Submit</Button>
				<Button variant="outline" onclick={() => (open = false)}>Cancel</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
