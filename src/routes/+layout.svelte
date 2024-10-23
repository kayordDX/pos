<script lang="ts">
	import { ModeWatcher } from "@kayord/ui/mode-watcher";
	import { Header } from "$lib/components/Header";
	import "../app.pcss";
	import { Toaster } from "@kayord/ui";
	import { browser } from "$app/environment";
	import { QueryClient, QueryClientProvider } from "@tanstack/svelte-query";
	import AuthCheck from "$lib/components/Check/AuthCheck.svelte";
	import OutletCheck from "$lib/components/Check/OutletCheck.svelte";
	import { Notification } from "$lib/components/Notification";
	import { status } from "$lib/stores/status.svelte";
	import type { Snippet } from "svelte";
	import { session } from "$lib/firebase";
	let { children }: { children?: Snippet } = $props();

	$effect(() => {
		if ($session) {
			status.getStatus();
		}
	});

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser,
			},
		},
	});
</script>

<AuthCheck>
	<Toaster />
	<ModeWatcher />
	<Notification />
	<QueryClientProvider client={queryClient}>
		<OutletCheck>
			{#if children}
				{@render children()}
			{/if}
		</OutletCheck>
	</QueryClientProvider>
</AuthCheck>
