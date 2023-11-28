<script lang="ts">
	import { Card } from "@kayord/ui";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<div class="m-8">
	<h1>Menu</h1>
	<div class="flex flex-wrap gap-4 mt-4">
		<a href="menu/1">
			<Card class="p-5 w-48">
				<h3>Test1</h3>
			</Card>
		</a>
		<a href="menu/2">
			<Card class="p-5 w-48">
				<h3>Test2</h3>
			</Card>
		</a>
	</div>
</div>
