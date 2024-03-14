<script lang="ts">
	import { Button, Card, Form, Select, toast } from "@kayord/ui";
	import { zod } from "sveltekit-superforms/adapters";
	import { defaults, superForm } from "sveltekit-superforms/client";
	import { z } from "zod";
	import { client, createOutletList } from "$lib/api";
	import { getError } from "$lib/types";
	import { goto } from "$app/navigation";
	import { status } from "$lib/stores/status";

	const query = createOutletList();

	export const schema = z.object({
		outletId: z.number().min(1, { message: "Please select outlet" }),
	});
	type FormSchema = z.infer<typeof schema>;

	const onSubmit = async (data: FormSchema) => {
		try {
			const { response } = await client.POST("/user/assignOutlet", {
				body: { outletId: data.outletId },
			});
			if (response.ok) {
				toast.info("Successfully updated outlet");
				await status.getStatus();
				await goto("/", { replaceState: true, invalidateAll: true });
			} else {
				toast.error("Could not set outlet");
			}
		} catch (err) {
			console.log(err);
			toast.error(getError(err).message);
		}
	};

	const form = superForm(defaults({ outletId: $status.outletId }, zod(schema)), {
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

<Card.Root class="p-5 m-5">
	<Card.Header>
		<Card.Title>Setup Device</Card.Title>
	</Card.Header>
	<Card.Content>
		<form method="POST" use:enhance>
			<Form.Field {form} name="outletId">
				<Form.Control let:attrs>
					<Form.Label>Outlet</Form.Label>
					<Select.Root
						selected={{
							value: $formData.outletId,
							label: $query.data?.find((i) => i.id === $formData.outletId)?.name,
						}}
						onSelectedChange={(v) => {
							v && ($formData.outletId = v.value);
						}}
					>
						<Select.Trigger {...attrs}>
							<Select.Value placeholder="Select outlet to link to device" />
						</Select.Trigger>
						<Select.Content>
							{#each $query.data ?? [] as outlet}
								<Select.Item value={outlet.id}>{outlet.name}</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
					<input hidden bind:value={$formData.outletId} name={attrs.name} />
				</Form.Control>
				<Form.Description>The current outlet this device is linked to.</Form.Description>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Button type="submit">Submit</Form.Button>
			<Button variant="link" href="/">Cancel</Button>
		</form>
	</Card.Content>
</Card.Root>
