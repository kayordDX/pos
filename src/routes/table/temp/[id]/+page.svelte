<script lang="ts">
	import { Button, Separator } from "@kayord/ui";
	import type { PageData } from "./$types";
	import { page } from "$app/stores";
</script>

<div class="m-2">
	<h1 class="mt-8">Items</h1>
	<p class="text-muted-foreground">Current bill for table {$page.params.id}</p>
	<Separator />
	<div class="my-5"></div>
	<Separator />
	<div class="flex justify-between">
		<h2>Total</h2>
		<h2>R40.00</h2>
	</div>

	<div class="mt-10">
		<Button href="/waiter" variant="outline">Dashboard</Button>
		<Button>Send to Kitchen</Button>
		<Button href={`/table/${$page.params.id}/menu/0`}>Add Item</Button>
		<Button href={`/table/${$page.params.id}/pay`}>Pay Bill</Button>
	</div>
</div>
