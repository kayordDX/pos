<script lang="ts">
	import { Button, Card } from "@kayord/ui";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<div class="m-8">
	<h1>Available Tables</h1>
	<p class="text-muted-foreground">Select table to book</p>
	<div class="flex flex-wrap gap-4 mt-4">
		<button class="text-start">
			<Card class="p-5 w-48">
				<h3>Test</h3>
				<p>Test</p>
			</Card>
		</button>
		<Card class="p-5 w-48">
			<h3>Test</h3>
			<p>Test</p>
		</Card>
	</div>
	<Button class="mt-4" href="/waiter">Cancel</Button>
</div>
