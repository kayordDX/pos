<script lang="ts">
	import { createPayPayConfigCreate } from "$lib/api";
	import { Button, Dialog, Form, Input, toast } from "@kayord/ui";
	import { PlusIcon } from "lucide-svelte";
	import { defaults, superForm } from "sveltekit-superforms";
	import { zod } from "sveltekit-superforms/adapters";
	import { z } from "zod";
	import { status } from "$lib/stores/status.svelte";
	import { getError } from "$lib/types";

	const mutation = createPayPayConfigCreate();

	interface Props {
		refetch: () => void;
	}
	let { refetch }: Props = $props();

	const schema = z.object({
		merchantId: z.string().min(1, { message: "MerchantId is Required" }),
		xApiKey: z.string().min(1, { message: "xApiKey is Required" }),
	});

	let open = $state(false);

	type FormSchema = z.infer<typeof schema>;

	const createHaloConfig = async (data: FormSchema) => {
		try {
			await $mutation.mutateAsync({
				data: {
					merchantId: data.merchantId,
					outletId: status.value.outletId,
					xApiKey: data.xApiKey,
				},
			});
			open = false;
			toast.info("Created Halo Config");
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
				createHaloConfig(form.data);
			}
		},
	});

	const { form: formData, enhance } = form;
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger class="w-full">
		<Button class="w-full">
			<PlusIcon class="mr-2 size-4" />Add Config
		</Button>
	</Dialog.Trigger>
	<Dialog.Content>
		<form method="POST" use:enhance>
			<Dialog.Header>
				<Dialog.Title>Create new Halo Config</Dialog.Title>
				<Dialog.Description>Complete form to add new halo config</Dialog.Description>
			</Dialog.Header>
			<div class="flex flex-col gap-4 p-4">
				<Form.Field {form} name="merchantId">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Merchant Id</Form.Label>
							<Input {...props} bind:value={$formData.merchantId} />
						{/snippet}
					</Form.Control>
					<Form.Description>
						This is the merchant id. You can get it from the halo dashboard
					</Form.Description>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="xApiKey">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>API Key</Form.Label>
							<Input {...props} bind:value={$formData.xApiKey} />
						{/snippet}
					</Form.Control>
					<Form.Description>
						This is api key to generate from halo. Can only be seen once.
					</Form.Description>
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
