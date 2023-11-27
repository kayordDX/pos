<script lang="ts">
	import { Button, Form } from "@kayord/ui";
	import { outletSchema, type OutletSchema } from "./schema";
	import type { SuperValidated } from "sveltekit-superforms";

	const outlets = [
		{
			name: "Jessica's",
			value: 1,
		},
		{
			name: "Eagle Canyon",
			value: 2,
		},
		{
			name: "Ruimsig",
			value: 3,
		},
	];

	export let form: SuperValidated<OutletSchema>;
</script>

<Form.Root method="POST" {form} schema={outletSchema} let:config>
	<Form.Field {config} name="outletId" let:attrs>
		<Form.Item>
			{@const { value } = attrs.input}
			<Form.Label>Outlet</Form.Label>
			<Form.Select selected={{ value, label: outlets.find((i) => i.value === value)?.name }}>
				<Form.SelectTrigger placeholder="Select outlet to link to device" />
				<Form.SelectContent>
					{#each outlets as outlet}
						<Form.SelectItem value={outlet.value}>{outlet.name}</Form.SelectItem>
					{/each}
				</Form.SelectContent>
			</Form.Select>
			<Form.Description>The current outlet this device is linked to.</Form.Description>
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Button type="submit">Submit</Form.Button>
	<Button variant="link" href="/">Cancel</Button>
</Form.Root>
