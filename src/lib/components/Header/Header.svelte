<script lang="ts">
	import Menu from "./Menu.svelte";
	import { goto } from "$app/navigation";
	import { session } from "$lib/firebase";
	import { header } from "$lib/stores/header";
	import { page } from "$app/stores";
	import { slide } from "svelte/transition";
	import type { Snippet } from "svelte";
	let { children }: { children?: Snippet } = $props();

	const hideHeaderPages = $derived(
		($page.route.id?.includes("kitchen") ?? false) || ($page.route.id?.includes("bar") ?? false)
	);
</script>

{#if $header || !hideHeaderPages}
	<div
		class="bg-secondary p-2 flex justify-between h-14 items-center border-b-2 border-secondary"
		transition:slide
	>
		<button class="flex items-center" onclick={() => goto("/")}>
			<img src="/logo.svg" alt="kayord-logo" class="h-10" />
			<span class="hidden md:block">ayord.Pos</span>
		</button>
		<span>
			{#if children}
				{@render children()}
			{/if}
		</span>
		<div class="flex gap-2">
			{#if $session}
				<Menu />
			{/if}
		</div>
	</div>
{/if}
