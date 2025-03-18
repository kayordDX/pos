<script lang="ts">
	import { Button, Input } from "@kayord/ui";
	import { debounce } from "$lib/util";
	import type { Snippet } from "svelte";
	import { XIcon } from "@lucide/svelte";

	interface Props {
		search: string;
		children?: Snippet;
		name?: string;
		hideReset?: boolean;
	}

	let { search = $bindable(), children, name, hideReset = false }: Props = $props();

	const debouncedCb = debounce((value: string) => (search = value), 300);
</script>

<div class="flex gap-2 items-center">
	<Input
		value={search}
		onchange={(e) => debouncedCb(e.currentTarget.value)}
		oninput={(e) => debouncedCb(e.currentTarget.value)}
		placeholder="Search {name}.."
		class="h-8 w-[150px] lg:w-[250px]"
	/>

	{#if !hideReset && search}
		<Button
			variant="ghost"
			onclick={() => {
				search = "";
				debouncedCb("");
			}}
			class="h-8 px-2 lg:px-3"
		>
			Reset
			<XIcon />
		</Button>
	{/if}

	{@render children?.()}
</div>
