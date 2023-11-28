<script lang="ts">
	import { Button, Card } from "@kayord/ui";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<div class="m-8">
	<h1>Menu {data.category}</h1>
	<div class="flex flex-wrap gap-4 mt-4">
		<a href="1">
			<Card class="p-5 w-48">
				<h3>Test3</h3>
			</Card>
		</a>
		<a href="2">
			<Card class="p-5 w-48">
				<h3>Test4</h3>
			</Card>
		</a>
	</div>
	<Button class="mt-8" href={`/table/${data.bookingId}`}>Cancel</Button>
</div>
