import {
	HubConnection,
	HubConnectionBuilder,
	LogLevel,
	HubConnectionState,
} from "@microsoft/signalr";
import { session } from "$lib/firebase.svelte";
import { PUBLIC_API_URL } from "$env/static/public";
import { status } from "$lib/stores/status.svelte";

const createHub = async () => {
	const token = await session.user?.getIdToken();
	const connection = new HubConnectionBuilder()
		.withUrl(`${PUBLIC_API_URL}/hub`, {
			accessTokenFactory: () => token ?? "",
			withCredentials: false,
		})
		.withAutomaticReconnect()
		.configureLogging(LogLevel.None)
		.build();

	let hubConnectionState = $state(connection?.state ?? HubConnectionState.Disconnected);

	const on = (methodName: string, method: (...args: any[]) => void) => {
		if (!connection) {
			return;
		}
		connection.on(methodName, method);
	};

	const off = (methodName: string, method: (...args: any[]) => void) => {
		if (!connection) {
			return;
		}
		connection.off(methodName, method);
	};

	$effect.root(() => {
		if (!connection) {
			hubConnectionState = HubConnectionState.Disconnected;
			return;
		}

		if (connection.state !== hubConnectionState) {
			hubConnectionState = connection.state;
		}

		const onStateUpdatedCallback = () => {
			hubConnectionState = connection?.state ?? HubConnectionState.Disconnected;
		};

		connection.onclose(onStateUpdatedCallback);
		connection.onreconnected(onStateUpdatedCallback);
		connection.onreconnecting(onStateUpdatedCallback);

		// Join group
		$effect(() => {
			if (hubConnectionState === HubConnectionState.Connected && status.value.outletId > 0) {
				connection.invoke("JoinGroup", `outlet:${status.value.outletId}`);
				return () => {
					connection.invoke("LeaveGroup", `outlet:${status.value.outletId}`);
				};
			}
		});

		$effect(() => {
			if (connection.state === HubConnectionState.Disconnected) {
				connection
					.start()
					.then(onStateUpdatedCallback)
					.catch((err) => {
						console.error(err);
					});
				onStateUpdatedCallback();

				return () => {
					connection.stop();
				};
			}
		});

		return () => {
			connection.stop();
		};
	});

	return {
		get state() {
			return hubConnectionState;
		},
		on,
		off,
	};
};

export const hub = await createHub();
