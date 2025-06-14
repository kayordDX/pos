<script lang="ts">
	import { ModeWatcher, theme, setTheme } from "@kayord/ui/mode-watcher";
	import "../app.css";
	import { Toaster } from "@kayord/ui";
	import { browser } from "$app/environment";
	import { QueryClient, QueryClientProvider } from "@tanstack/svelte-query";
	import AuthCheck from "$lib/components/Check/AuthCheck.svelte";
	import OutletCheck from "$lib/components/Check/OutletCheck.svelte";
	import { Notification } from "$lib/components/Notification";
	import { status } from "$lib/stores/status.svelte";
	import type { Snippet } from "svelte";
	import { session } from "$lib/firebase.svelte";
	let { children }: { children?: Snippet } = $props();

	import { info } from "$lib/stores/info.svelte";
	import Hub from "$lib/components/Hub.svelte";

	$effect(() => {
		if (session.user) {
			status.getStatus();
		}
	});

	// Refresh Status Every 5 minutes
	$effect(() => {
		const interval = setInterval(
			() => {
				status.getStatus();
			},
			1000 * 60 * 5
		);
		return () => clearInterval(interval);
	});

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser,
			},
		},
	});

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

<ModeWatcher defaultMode="dark" track={false} />
<AuthCheck>
	<Hub />
	<Toaster />
	<Notification />
	<QueryClientProvider client={queryClient}>
		<OutletCheck>
			{#if children}
				{@render children()}
			{/if}
		</OutletCheck>
	</QueryClientProvider>
</AuthCheck>
