<script lang="ts">
	import { ModeWatcher } from "@kayord/ui/mode-watcher";
	import { Header } from "$lib/components/Header";
	import "../app.pcss";
	import { HeadlessToast } from "$lib/components/HeadlessToast";
	import { Toaster, toast } from "@kayord/ui";
	import { browser } from "$app/environment";
	import { QueryClient, QueryClientProvider } from "@tanstack/svelte-query";
	import AuthCheck from "$lib/components/Check/AuthCheck.svelte";
	import { status } from "$lib/stores/status";
	import { session, subscribeToPushNotifications } from "$lib/firebase";
	import * as signalR from "@microsoft/signalr";
	import { PUBLIC_API_URL } from "$env/static/public";
	import { hub } from "$lib/stores/hub";
	import { type HubNotification } from "$lib/types";
	import OutletCheck from "$lib/components/Check/OutletCheck.svelte";
	import { page } from "$app/stores";

	$: hideHeader = !$page.route.id?.startsWith("/(salesPeriod)/(clockedIn)/table");

	const initHub = async () => {
		const token = await $session?.getIdToken();
		const connection = new signalR.HubConnectionBuilder()
			.withUrl(`${PUBLIC_API_URL}/hub`, {
				accessTokenFactory: () => token ?? "",
				withCredentials: false,
			})
			.withAutomaticReconnect()
			.configureLogging(signalR.LogLevel.None)
			.build();

		connection
			.start()
			.then(function () {
				hub.set(connection);
			})
			.catch((err) => hub.set(connection));
	};

	$: $session && status.getStatus();
	$: $session && initHub();

	const listenHub = () => {
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
	};
	$: $session && $hub && listenHub();

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser,
			},
		},
	});

	subscribeToPushNotifications();
</script>

<AuthCheck>
	<Toaster />
	<ModeWatcher />
	<QueryClientProvider client={queryClient}>
		{#if hideHeader}
			<Header />
		{/if}
		<OutletCheck>
			<slot />
		</OutletCheck>
	</QueryClientProvider>
</AuthCheck>
