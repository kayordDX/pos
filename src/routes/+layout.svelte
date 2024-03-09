<script lang="ts">
	import { ModeWatcher } from "@kayord/ui/mode-watcher";
	import { Header } from "$lib/components/Header";
	import "../app.pcss";
	import { page } from "$app/stores";
	import { getFlash } from "sveltekit-flash-message";
	import { HeadlessToast } from "$lib/components/HeadlessToast";
	import { Toaster, toast } from "@kayord/ui";
	import { browser } from "$app/environment";
	import { QueryClient, QueryClientProvider } from "@tanstack/svelte-query";
	import AuthCheck from "$lib/components/Check/AuthCheck.svelte";
	import { client } from "$lib/api";
	import { status } from "$lib/stores/status";
	import { session } from "$lib/firebase";
	import * as signalR from "@microsoft/signalr";
	import { env } from "$env/dynamic/public";
	import { hub } from "$lib/stores/hub";

	const initHub = async () => {
		const token = await $session?.getIdToken();
		const connection = new signalR.HubConnectionBuilder()
			.withUrl(`${env.PUBLIC_API_URL}/hub`, {
				accessTokenFactory: () => token ?? "",
			})
			.withAutomaticReconnect()
			.build();

		connection.start().catch((err) => console.error(err));
		hub.set(connection);
	};

	$: $session && status.getStatus();
	$: $session && initHub();

	const flash = getFlash(page);
	flash.subscribe(($flash) => {
		if (!$flash) return;
		if ($flash.type === "success") {
			toast.success($flash.message);
		} else if ($flash.type === "error") {
			toast.error($flash.message);
		} else {
			toast.custom(HeadlessToast, {
				componentProps: { message: $flash.message, type: $flash.type },
			});
		}
		flash.set(undefined);
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
	<QueryClientProvider client={queryClient}>
		<Header />
		<slot />
	</QueryClientProvider>
</AuthCheck>
