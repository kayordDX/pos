<script lang="ts" generics="T">
	import { flip } from "svelte/animate";
	import type { HTMLAttributes } from "svelte/elements";
	import { fade } from "svelte/transition";
	import type { Snippet } from "svelte";

	// type Item = $$Generic;

	interface Props {
		itemChild?: Snippet<[T]>;
		columnClass?: string;
		class?: string;
		animate?: boolean;
		duration?: number;
		gap: number;
		idKey: string;
		items: T[];
		maxColWidth: number;
		minColWidth: number;
		maxColHeight?: number;
	}

	let {
		itemChild,
		columnClass,
		class: className,
		animate = true,
		duration = 200,
		gap = 20,
		idKey = `id`,
		items = [],
		maxColWidth = 500,
		minColWidth = 330,
		maxColHeight,
	}: Props = $props();

	let masonryWidth = $state(0);

	const getId = (item: T): string | number => {
		if (typeof item === `number`) return item;
		if (typeof item === `string`) return item;
		return (item as Record<string, string | number>)[idKey] ?? "";
	};

	const nCols = $derived(
		Math.min(items.length, Math.floor((masonryWidth + gap) / (minColWidth + gap)) || 1)
	);

	const itemsToCols = $derived(
		items.reduce(
			(cols: [T, number][][], item, idx) => {
				cols[idx % cols.length]?.push([item, idx]);
				return cols;
			},
			Array(nCols).fill(null).map(() => []) // prettier-ignore
		)
	);

	const itemStyles = $derived.by(() => {
		let style = `gap: ${gap}px; max-width: ${maxColWidth}px;`;
		if (maxColHeight != undefined && maxColHeight > 0) {
			style += ` max-height: ${maxColHeight}px;`;
		}
		return style;
	});
</script>

<div
	class="flex break-normal justify-center box-border {className}"
	bind:clientWidth={masonryWidth}
	style="gap: {gap}px;"
>
	{#each itemsToCols as col}
		<div class="grid w-full {columnClass}" style={itemStyles}>
			{#if animate}
				{#each col as [item, idx] (getId(item))}
					<div
						in:fade={{ delay: 100, duration }}
						out:fade={{ delay: 0, duration }}
						animate:flip={{ duration }}
					>
						{#if itemChild}
							{@render itemChild(item)}
						{:else}
							Please specify itemChild
						{/if}
					</div>
				{/each}
			{:else}
				{#each col as [item, idx] (getId(item))}
					{#if itemChild}
						{@render itemChild(item)}
					{:else}
						Please specify itemChild
					{/if}
				{/each}
			{/if}
		</div>
	{/each}
</div>
