<script lang="ts">
	import { Card, CardContent, CardHeader, CardTitle } from "@kayord/ui";
	import type { PageData } from "./$types";
	import SetupForm from "./SetupForm.svelte";

	export let data: PageData;
</script>

<Card class="p-5 m-5">
	<CardHeader>
		<CardTitle>Setup Device</CardTitle>
	</CardHeader>
	<CardContent>
		<SetupForm form={data.form} />
	</CardContent>
</Card>
