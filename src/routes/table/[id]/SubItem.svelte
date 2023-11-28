<script lang="ts">
	import { CornerDownRight } from "lucide-svelte";

	export let name: string;
	export let price: number;
	export let quantity: number;
</script>

<div class="flex justify-between ml-4 text-muted-foreground">
	<div class="flex items-center">
		<CornerDownRight class="h-3 w-3" />
		{quantity}
		{name}
	</div>
	<div>{price.toFixed(2)}</div>
</div>
