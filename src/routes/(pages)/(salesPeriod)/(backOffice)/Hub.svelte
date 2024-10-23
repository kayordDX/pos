<script lang="ts">
	import { PUBLIC_API_URL } from "$env/static/public";
	import { session } from "$lib/firebase";
	import { notification } from "$lib/stores/notify.svelte";
	import { status } from "$lib/stores/status.svelte";
	import * as signalR from "@microsoft/signalr";

	interface SoundEvent {
		outletId: number;
		divisions: Array<number>;
	}

	interface Props {
		refetch: () => void;
		divisionIds?: string;
	}
	let { refetch, divisionIds }: Props = $props();

	let connectionRef = $state<signalR.HubConnection>();

	const divisions = $derived(divisionIds ? divisionIds.split(",").map(Number) : []);

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
					connectionRef
						?.invoke("JoinGroup", `outlet:${status.value?.outletId}`)
						.catch((err) => console.error(err));
					connectionRef?.on("PlaySound", (e: SoundEvent) => {
						console.log("PlaySound", e);
						const shouldNotify = divisions.some((r) => e.divisions.includes(r));
						if (shouldNotify) {
							refetch();
							notification.notify();
							audio.play();
						}
					});
				})
				.catch((err) => console.error(err));
		}

		return () => {
			connectionRef?.stop();
		};
	});
</script>
