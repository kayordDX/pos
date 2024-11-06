<script lang="ts">
	import SalesPeriodCheck from "$lib/components/Check/SalesPeriodCheck.svelte";
	import type { Snippet } from "svelte";
	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<SalesPeriodCheck>
	{@render children?.()}
</SalesPeriodCheck>
