<script lang="ts">
	import "../app.css";
	import { ModeWatcher, theme, setTheme } from "@kayord/ui/mode-watcher";
	import type { Snippet } from "svelte";
	import { info } from "$lib/stores/info.svelte";

	let { children }: { children?: Snippet } = $props();

	// const themeName = $derived(info.isKayord() ? "kayord" : "default");
	$effect(() => {
		const themeName = info.isKayord() ? "kayord" : "default";
		if (theme.current != themeName) {
			setTheme(themeName);
		}
	});
</script>

<svelte:head>
	<link rel="icon" href={`${info.isKayord() ? "/kayord" : ""}/favicon.svg`} />
	<link rel="manifest" href={`${info.isKayord() ? "/kayord" : ""}/manifest.json`} />
</svelte:head>

<ModeWatcher defaultMode="dark" track={false} lightClassNames={["dark"]} />
{#if children}
	{@render children()}
{/if}
