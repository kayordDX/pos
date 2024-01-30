<script lang="ts">
	import { Button, Form, Loader } from "@kayord/ui";
	import { outletSchema, type OutletSchema } from "./schema";
	import type { SuperValidated } from "sveltekit-superforms";
	import type { PageData } from "./$types";
	export let data: PageData;
	// import { createOutletList } from "$lib/api";
	import Error from "$lib/components/Error.svelte";

	// const query = createOutletList();

	export let form: SuperValidated<OutletSchema>;
</script>

<Form.Root method="POST" {form} schema={outletSchema} let:config>
	{#if data.outlets.error}
		<Error message={data.outlets?.error.reason} />
	{:else}
		<Form.Field {config} name="outletId" let:attrs>
			<Form.Item>
				{@const { value } = attrs.input}
				<Form.Label>Outlet</Form.Label>
				<Form.Select
					selected={{ value, label: data.outlets.data?.find((i) => i.id === value)?.name }}
				>
					<Form.SelectTrigger placeholder="Select outlet to link to device" />
					<Form.SelectContent>
						{#each data.outlets.data ?? [] as outlet}
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
