<script lang="ts">
	import { Header } from "$lib/components/Header";
	import { page } from "$app/state";
	import type { Snippet } from "svelte";
	import { theme, setTheme } from "@kayord/ui/mode-watcher";
	import { Toaster } from "@kayord/ui";
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

	const hideHeader = $derived(!page.route.id?.startsWith("/(salesPeriod)/(clockedIn)/table"));
</script>

<AuthCheck>
	<Hub />
	<Toaster />
	<Notification />
	<QueryClientProvider client={queryClient}>
		<OutletCheck>
			{#if hideHeader}
				<Header />
			{/if}
			{#if children}
				{@render children()}
			{/if}
		</OutletCheck>
	</QueryClientProvider>
</AuthCheck>
