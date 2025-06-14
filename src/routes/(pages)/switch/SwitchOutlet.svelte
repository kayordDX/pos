<script lang="ts">
	import { Button, Card, Form, Select, toast } from "@kayord/ui";
	import { zod } from "sveltekit-superforms/adapters";
	import { defaults, superForm } from "sveltekit-superforms/client";
	import { z } from "zod";
	import { createUserAssignOutlet, createOutletGetAllAssigned } from "$lib/api";
	import { getError } from "$lib/types";
	import { goto } from "$app/navigation";
	import { status } from "$lib/stores/status.svelte";
	import { menu } from "$lib/stores/menu.svelte";

	const query = createOutletGetAllAssigned();

	export const schema = z.object({
		outletId: z.number().min(1, { message: "Please select outlet" }),
	});
	type FormSchema = z.infer<typeof schema>;

	const assignMutation = createUserAssignOutlet();
	const onSubmit = async (data: FormSchema) => {
		try {
			const response = await $assignMutation.mutateAsync({
				data: {
					outletId: data.outletId,
				},
			});
			if (response.id) {
				toast.info("Successfully updated outlet");
				menu.value = { menuId: 0 };
				if (!status.isLoading) {
					await status.getStatus();
				}
				await goto("/", { replaceState: true, invalidateAll: true });
			} else {
				toast.error("Could not set outlet");
			}
		} catch (err) {
			toast.error(getError(err).message);
		}
	};

	const form = superForm(defaults({ outletId: status.value.outletId }, zod(schema)), {
		SPA: true,
		validators: zod(schema),
		onUpdate({ form }) {
			if (form.valid) {
				onSubmit(form.data);
			}
		},
	});
	const { form: formData, enhance } = form;

	const outletList = $derived(
		$query.data?.find((i) => i.id === $formData.outletId)?.name ?? "Select outlet to link to device"
	);
</script>

<Card.Root class="p-5 m-5">
	<Card.Header>
		<Card.Title>
			<h3 class="text-lg">Switch Outlet</h3>
		</Card.Title>
	</Card.Header>
	<Card.Content>
		<form method="POST" use:enhance>
			<Form.Field {form} name="outletId">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Outlet</Form.Label>
						<Select.Root
							type="single"
							allowDeselect={false}
							onValueChange={(v: string) => {
								v && ($formData.outletId = Number(v));
							}}
						>
							<Select.Trigger {...props}>
								{outletList}
							</Select.Trigger>
							<Select.Content>
								{#each $query.data ?? [] as outlet}
									<Select.Item value={outlet.id.toString()}>{outlet.name}</Select.Item>
								{/each}
							</Select.Content>
						</Select.Root>
						<input hidden bind:value={$formData.outletId} name={props.name} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Button type="submit">Submit</Form.Button>
			<Button variant="link" href="/">Cancel</Button>
		</form>
	</Card.Content>
</Card.Root>
