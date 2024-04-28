<script lang="ts">
	import { ModeWatcher } from "@kayord/ui/mode-watcher";
	import { Header } from "$lib/components/Header";
	import "../app.pcss";
	import { Toaster } from "@kayord/ui";
	import { browser } from "$app/environment";
	import { QueryClient, QueryClientProvider } from "@tanstack/svelte-query";
	import AuthCheck from "$lib/components/Check/AuthCheck.svelte";
	import OutletCheck from "$lib/components/Check/OutletCheck.svelte";
	import { page } from "$app/stores";
	import { Notification } from "$lib/components/Notification";
	import { status } from "$lib/stores/status";
	import { session } from "$lib/firebase";

	$: hideHeader = !$page.route.id?.startsWith("/(salesPeriod)/(clockedIn)/table");
	$: $session && status.getStatus();

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
		{#if hideHeader}
			<Header />
		{/if}
		<OutletCheck>
			<slot />
		</OutletCheck>
	</QueryClientProvider>
</AuthCheck>
