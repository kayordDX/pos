<script lang="ts" generics="T extends RowData">
	import { Button } from "@kayord/ui";
	import { type Table } from "@tanstack/svelte-table";
	import { XIcon } from "@lucide/svelte";
	import type { DataTableFeatures, RowData } from "@kayord/ui/data-table";

	interface Props<T extends RowData> {
		table: Table<DataTableFeatures, T>;
		cb?: () => void;
	}

	let { table, cb }: Props<T> = $props();

	const isFiltered = $derived(table.store.state.columnFilters.length > 0);
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
