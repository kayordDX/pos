<script lang="ts">
	import { Badge } from "@kayord/ui";
	import Order from "./Order.svelte";
</script>

<div class="m-2">
	<Badge>2 pending orders</Badge>
	<div class="m-2">
		<Order />
	</div>
</div>
