<script lang="ts">
	import { InputGroup } from "@kayord/ui";
	import { debounce } from "$lib/util";
	import type { Snippet } from "svelte";
	import { SearchIcon, XIcon } from "@lucide/svelte";

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
	<InputGroup.Root>
		<InputGroup.Input
			value={search}
			onchange={(e) => debouncedCb(e.currentTarget.value)}
			oninput={(e) => debouncedCb(e.currentTarget.value)}
			placeholder="Search {name}..."
			class="h-8 w-[150px] lg:w-[250px]"
		/>
		<InputGroup.Addon>
			<SearchIcon />
		</InputGroup.Addon>
		<InputGroup.Addon align="inline-end">
			{#if !hideReset && search}
				<InputGroup.Button
					variant="ghost"
					onclick={() => {
						search = "";
						debouncedCb("");
					}}
				>
					<XIcon />
				</InputGroup.Button>
			{/if}
		</InputGroup.Addon>
	</InputGroup.Root>

	{@render children?.()}
</div>
