<script lang="ts">
	import { status } from "$lib/stores/status.svelte";
	import { Loader } from "@kayord/ui";
	import Setup from "../Setup.svelte";
	import type { Snippet } from "svelte";
	import SwitchOutlet from "../../../routes/(pages)/switch/SwitchOutlet.svelte";
	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

{#if status.value.isNotReady}
	<Loader />
{:else if status.value.outletId > 0}
	{@render children?.()}
{:else if status.value.statusId < 2}
	<Setup />
{:else}
	<SwitchOutlet />
{/if}
