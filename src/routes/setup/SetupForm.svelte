<script lang="ts">
	import { Button, Form, Loader, Select } from "@kayord/ui";
	import { outletSchema, type OutletSchema } from "./schema";
	import { superForm, type SuperValidated } from "sveltekit-superforms/client";
	import type { PageData } from "./$types";
	export let data: PageData;
	import Error from "$lib/components/Error.svelte";
	import { zod } from "sveltekit-superforms/adapters";
	import SuperDebug from "sveltekit-superforms";

	const form = superForm(data.form, {
		validators: zod(outletSchema),
	});
	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance>
	{#if data.outlets.error}
		<Error message={data.outlets?.error.reason} />
	{:else}
		<Form.Field {form} name="outletId">
			<Form.Control let:attrs>
				<Form.Label>Outlet</Form.Label>
				<Select.Root
					selected={{
						value: $formData.outletId,
						label: data.outlets.data?.find((i) => i.id === $formData.outletId)?.name,
					}}
					onSelectedChange={(v) => {
						v && ($formData.outletId = v.value);
					}}
				>
					<Select.Trigger {...attrs}>
						<Select.Value placeholder="Select outlet to link to device" />
					</Select.Trigger>
					<Select.Content>
						{#each data.outlets.data ?? [] as outlet}
							<Select.Item value={outlet.id}>{outlet.name}</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
				<input hidden bind:value={$formData.outletId} name={attrs.name} />
			</Form.Control>
			<Form.Description>The current outlet this device is linked to.</Form.Description>
			<Form.FieldErrors />
		</Form.Field>
	{/if}

	<Form.Button type="submit">Submit</Form.Button>
	<Button variant="link" href="/">Cancel</Button>
</form>
