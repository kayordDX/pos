<script lang="ts" generics="T">
	import { Button } from "@kayord/ui";
	import { type Table } from "@tanstack/table-core";
	import { XIcon } from "@lucide/svelte";

	interface Props<T> {
		table: Table<T>;
		cb?: () => void;
	}

	let { table, cb }: Props<T> = $props();

	const isFiltered = $derived(table.getState().columnFilters.length > 0);
</script>

{#if isFiltered}
	<Button
		variant="ghost"
		onclick={() => {
			table.resetColumnFilters();
			cb?.();
		}}
		class="h-8 px-2 lg:px-3"
	>
		Reset
		<XIcon />
	</Button>
{/if}
