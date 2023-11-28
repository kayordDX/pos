<script lang="ts">
	import { Button, Form, Loader } from "@kayord/ui";
	import { outletSchema, type OutletSchema } from "./schema";
	import type { SuperValidated } from "sveltekit-superforms";

	import { createOutletList, useOutletListQueryOptions } from "$lib/api";
	import Error from "$lib/components/Error.svelte";

	const query = createOutletList();
	console.log($query.isPending);

	export let form: SuperValidated<OutletSchema>;
</script>

<Form.Root method="POST" {form} schema={outletSchema} let:config>
	{#if $query.isPending}
		<Loader />
	{/if}
	{#if $query.error}
		<Error message={$query.error.reason} />
	{/if}
	{#if $query.isSuccess}
		<Form.Field {config} name="outletId" let:attrs>
			<Form.Item>
				{@const { value } = attrs.input}
				<Form.Label>Outlet</Form.Label>
				<Form.Select selected={{ value, label: $query.data.find((i) => i.id === value)?.name }}>
					<Form.SelectTrigger placeholder="Select outlet to link to device" />
					<Form.SelectContent>
						{#each $query.data as outlet}
							<Form.SelectItem value={outlet.id}>{outlet.name}</Form.SelectItem>
						{/each}
					</Form.SelectContent>
				</Form.Select>
				<Form.Description>The current outlet this device is linked to.</Form.Description>
				<Form.Validation />
			</Form.Item>
		</Form.Field>
	{/if}
	<Form.Button type="submit">Submit</Form.Button>
	<Button variant="link" href="/">Cancel</Button>
</Form.Root>
