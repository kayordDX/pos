<script lang="ts">
	import { ModeWatcher } from "@kayord/ui/mode-watcher";
	import "../app.pcss";
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
	import { hub } from "$lib/stores/hub.svelte";

	$effect(() => {
		if (session.user) {
			status.getStatus();
		}
	});

	const receiveMessage = (message: string) => {
		console.log(message);
	};

	$effect(() => {
		hub.on("ReceiveMessage", receiveMessage);
		return () => {
			hub.off("ReceiveMessage", receiveMessage);
		};
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
