<script lang="ts" generics="T">
	import { XIcon } from "@lucide/svelte";

	import type { Table } from "@tanstack/table-core";
	import { Popover, Badge, Select, Input } from "@kayord/ui";

	interface Props<T> {
		table: Table<T>;
	}
	let { table }: Props<T> = $props();
</script>

<div class="mb-2 flex gap-2">
	{#each table.getAllColumns() as col}
		{#if col.getFilterValue()}
			<Badge variant="secondary">
				<Popover.Root>
					<Popover.Trigger>
						<div class="max-w-36 overflow-hidden text-ellipsis whitespace-nowrap">
							{col.columnDef.header}: {col.getFilterValue()}
						</div>
					</Popover.Trigger>
					<Popover.Content class="flex flex-col gap-2">
						<Select.Root type="single">
							<Select.Trigger>Value</Select.Trigger>
							<Select.Content>
								<Select.Item value="light">Light</Select.Item>
								<Select.Item value="dark">Dark</Select.Item>
								<Select.Item value="system">System</Select.Item>
							</Select.Content>
						</Select.Root>
						<Input
							value={col.getFilterValue()}
							onchange={(e) => col.setFilterValue(e.currentTarget.value)}
							oninput={(e) => col.setFilterValue(e.currentTarget.value)}
						/>
					</Popover.Content>
				</Popover.Root>
				<button
					onclick={(e) => {
						e.stopPropagation();
						col.setFilterValue(undefined);
					}}
				>
					<XIcon class="ml-2 size-4" />
				</button>
			</Badge>
		{/if}
	{/each}
</div>
