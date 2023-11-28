<script lang="ts">
	import { Separator } from "@kayord/ui";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<div class="m-8">
	<h1 class="mt-8">Items</h1>
	<p class="text-muted-foreground">Current bill for table {data.tableId}</p>
	<Separator />
	1 Latte Lets go {data.tableId}
</div>
