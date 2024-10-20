<script lang="ts">
	import SalesPeriodCheck from "$lib/components/Check/SalesPeriodCheck.svelte";
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<SalesPeriodCheck>
	{@render children?.()}
</SalesPeriodCheck>
