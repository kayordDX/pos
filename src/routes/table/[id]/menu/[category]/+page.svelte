<script lang="ts">
	import { Button, Card } from "@kayord/ui";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<div class="m-8">
	<div class="flex h-16 items-center gap-4">
		<a
			href="#top"
			class="text-sm font-medium transition-colors hover:text-primary"
			data-svelte-h="svelte-rv1goo">Overview</a
		>
		<a
			href="/examples/dashboard"
			class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
			data-svelte-h="svelte-1l86vod">Customers</a
		>
		<a
			href="/examples/dashboard"
			class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
			data-svelte-h="svelte-ycuaxa">Products</a
		>
		<a
			href="/examples/dashboard"
			class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
			data-svelte-h="svelte-i9jxor">Settings</a
		>
	</div>

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
