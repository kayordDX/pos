<script lang="ts">
	let { price }: { price: number } = $props();
</script>

<div>R {price.toFixed(2)}</div>
