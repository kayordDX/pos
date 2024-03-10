<script lang="ts">
	import { ModeWatcher } from "@kayord/ui/mode-watcher";
	import { Header } from "$lib/components/Header";
	import "../app.pcss";
	import { page } from "$app/stores";
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
	import { onMount } from "svelte";
	import { type HubNotification } from "$lib/types";

	const initHub = async () => {
		const token = await $session?.getIdToken();
		const connection = new signalR.HubConnectionBuilder()
			.withUrl(`${env.PUBLIC_API_URL}/hub`, {
				accessTokenFactory: () => token ?? "",
			})
			.configureLogging(signalR.LogLevel.Error)
			.withAutomaticReconnect()
			.build();

		connection.start().catch((err) => console.error(err));
		hub.set(connection);
	};

	$: $session && status.getStatus();
	$: $session && initHub();

	onMount(() => {
		if (!$hub) {
			return;
		}

		$hub.on("ReceiveMessage", (message: string) => {
			console.log("received", message);
		});

		$hub.on("Notification", (notification: HubNotification) => {
			toast.custom(HeadlessToast, {
				componentProps: { message: notification.notification, type: "success" },
			});
		});
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
