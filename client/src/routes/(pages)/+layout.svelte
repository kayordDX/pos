<script lang="ts">
	import type { Snippet } from "svelte";
	import { Toaster } from "@kayord/ui/sonner";
	import { browser } from "$app/environment";
	import { QueryClient, QueryClientProvider } from "@tanstack/svelte-query";
	import AuthCheck from "$lib/components/Check/AuthCheck.svelte";
	import OutletCheck from "$lib/components/Check/OutletCheck.svelte";
	import { Notification } from "$lib/components/Notification";
	import { status } from "$lib/stores/status.svelte";
	import { session } from "$lib/firebase.svelte";
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
