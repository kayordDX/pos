import { HubConnection, HubConnectionBuilder, LogLevel, HubConnectionState } from "@microsoft/signalr";
import { session } from "$lib/firebase.svelte";
import { info } from "./info.svelte";

class Hub {
	connection: HubConnection | undefined = $state(undefined);
	state: HubConnectionState = $state(HubConnectionState.Disconnected);

	public async init() {
		if (this.connection && this.connection.state !== HubConnectionState.Disconnected) {
			return;
		}

		const connection = new HubConnectionBuilder()
			.withUrl(`${info.kayordURL()}/hub`, {
				// fetch a fresh token on every (re)connect — Firebase tokens expire after 1 hour
				accessTokenFactory: async () => (await session.user?.getIdToken()) ?? "",
				withCredentials: false,
			})
			.withAutomaticReconnect()
			.configureLogging(LogLevel.None)
			.build();

		const onStateUpdatedCallback = () => {
			// ignore late events from a stale connection after init() was called again
			if (this.connection !== connection) {
				return;
			}
			this.state = connection.state;
		};

		connection.onclose(onStateUpdatedCallback);
		connection.onreconnected(onStateUpdatedCallback);
		connection.onreconnecting(onStateUpdatedCallback);

		this.connection = connection;
		this.state = HubConnectionState.Connecting;

		try {
			await connection.start();
			this.state = HubConnectionState.Connected;
		} catch (err) {
			this.state = HubConnectionState.Disconnected;
			console.error(err);
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public on(methodName: string, method: (...args: any[]) => void) {
		if (!this.connection) {
			return;
		}
		this.connection.on(methodName, method);
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public off(methodName: string, method: (...args: any[]) => void) {
		if (!this.connection) {
			return;
		}
		this.connection.off(methodName, method);
	}

	public disconnect() {
		this.connection?.stop();
		this.state = HubConnectionState.Disconnected;
	}
}
export const hub = new Hub();
