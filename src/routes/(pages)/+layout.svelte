<script lang="ts">
	import type { Snippet } from "svelte";
	import { theme, setTheme } from "mode-watcher";
	import { Toaster } from "@kayord/ui/sonner";
	import { browser } from "$app/environment";
	import { QueryClient, QueryClientProvider } from "@tanstack/svelte-query";
	import AuthCheck from "$lib/components/Check/AuthCheck.svelte";
	import OutletCheck from "$lib/components/Check/OutletCheck.svelte";
	import { Notification } from "$lib/components/Notification";
	import { status } from "$lib/stores/status.svelte";
	import { session } from "$lib/firebase.svelte";
	import { info } from "$lib/stores/info.svelte";
	import Hub from "$lib/components/Hub.svelte";

	let { children }: { children?: Snippet } = $props();

	$effect(() => {
		if (session.user) {
			status.getStatus();
		}
	});

	// Refresh Status Every 5 minutes
	$effect(() => {
		const interval = setInterval(() => {
			const difference = new Date().getTime() - status.lastRefresh.getTime();
			const isDue = difference > 60 * 1000 * 5;
			if (isDue) {
				status.getStatus();
			}
		}, 60 * 1000);
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

<QueryClientProvider client={queryClient}>
	<Toaster />
	<AuthCheck>
		<Hub />
		<Notification />
		<OutletCheck>
			{#if children}
				{@render children()}
			{/if}
		</OutletCheck>
	</AuthCheck>
</QueryClientProvider>
