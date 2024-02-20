<script lang="ts">
	import { Card } from "@kayord/ui";
	import type { PageData } from "./$types";
	import SetupForm from "./SetupForm.svelte";

	export let data: PageData;
</script>

<Card.Root class="p-5 m-5">
	<Card.Header>
		<Card.Title>Setup Device</Card.Title>
	</Card.Header>
	<Card.Content>
		<SetupForm {data} />
	</Card.Content>
</Card.Root>
