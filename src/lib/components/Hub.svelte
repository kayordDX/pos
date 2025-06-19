<script lang="ts">
	import { goto } from "$app/navigation";
	import { session } from "$lib/firebase.svelte";
	import { hub } from "$lib/stores/hub.svelte";
	import { menu } from "$lib/stores/menu.svelte";
	import { status } from "$lib/stores/status.svelte";
	import { HubConnectionState } from "@microsoft/signalr";
	import { Previous } from "runed";

	const previous = new Previous(() => status.value.outletId);

	$effect(() => {
		if (session.user) {
			hub.init();
			return () => {
				hub.disconnect();
			};
		}
	});

	$effect(() => {
		if (hub.connection?.state == undefined) {
			hub.state = HubConnectionState.Disconnected;
			return;
		}

		if (hub.connection.state !== hub.state) {
			hub.state = hub.connection.state;
		}
	});

	const refreshOutlet = async (outletId: number) => {
		if (!status.isLoading) {
			if (status.value.outletId != outletId) {
				menu.value = { menuId: 0 };
				await status.getStatus();
				await goto("/", { replaceState: true, invalidateAll: true });
			}
		}
	};

	const receiveMessage = (message: string) => {
		console.log(message);
	};

	$effect(() => {
		if (hub.state == HubConnectionState.Connected) {
			if (status.value.outletId > 0) {
				hub.connection?.invoke("JoinGroup", `outlet:${status.value.outletId}`);
				if (previous.current != undefined && previous.current > 0) {
					hub.connection?.invoke("LeaveGroup", `outlet:${previous.current}`);
				}
			}
		}
	});

	$effect(() => {
		if (hub.state == HubConnectionState.Connected) {
			hub.on("RefreshOutlet", refreshOutlet);
			hub.on("ReceiveMessage", receiveMessage);
			return () => {
				hub.off("RefreshOutlet", refreshOutlet);
				hub.off("ReceiveMessage", receiveMessage);
			};
		}
	});
</script>
