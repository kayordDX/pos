<script lang="ts">
	import { PUBLIC_API_URL } from "$env/static/public";
	import { session } from "$lib/firebase";
	import { notification } from "$lib/stores/notify.svelte";
	import * as signalR from "@microsoft/signalr";

	let connectionRef = $state<signalR.HubConnection>();

	const createHubConnection = async () => {
		const token = await $session?.getIdToken();
		const connection = new signalR.HubConnectionBuilder()
			.withUrl(`${PUBLIC_API_URL}/hub`, {
				accessTokenFactory: () => token ?? "",
				withCredentials: false,
			})
			.withAutomaticReconnect()
			.configureLogging(signalR.LogLevel.None)
			.build();
		connectionRef = connection;
	};

	$effect(() => {
		createHubConnection();
	});

	$effect(() => {
		if (connectionRef) {
			var audio = new Audio("/sounds/notification.mp3");
			connectionRef
				.start()
				.then(function () {
					connectionRef?.on("PlaySound", () => {
						console.log("PlaySound");
						audio.play();
						notification.notify();
					});
				})
				.catch((err) => console.error(err));
		}

		return () => {
			connectionRef?.stop();
		};
	});
</script>
