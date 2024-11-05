import {
	HubConnectionBuilder,
	HubConnectionState,
	LogLevel,
	type HubConnection,
} from "@microsoft/signalr";
import { session } from "$lib/firebase.svelte";
import { PUBLIC_API_URL } from "$env/static/public";

class GlobalHub {
	connection = $state<HubConnection>();
	hubConnectionState = $state(this.connection?.state ?? HubConnectionState.Disconnected);

	onStateUpdatedCallback() {
		this.hubConnectionState = this.connection?.state ?? HubConnectionState.Disconnected;
	}

	constructor() {
		this.connection = new HubConnectionBuilder()
			.withUrl(`${PUBLIC_API_URL}/hub`, {
				accessTokenFactory: () => session.idToken ?? "",
				withCredentials: false,
			})
			.withAutomaticReconnect()
			.configureLogging(LogLevel.None)
			.build();

		this.connection
			.start()
			.then(this.onStateUpdatedCallback)
			.catch((err) => {
				console.error(err);
			});
		this.onStateUpdatedCallback();

		this.connection.onclose(this.onStateUpdatedCallback);
		this.connection.onreconnected(this.onStateUpdatedCallback);
		this.connection.onreconnecting(this.onStateUpdatedCallback);
	}

	public on(methodName: string, method: (...args: any[]) => void) {
		this.connection?.on(methodName, method);
	}

	public off(methodName: string, method: (...args: any[]) => void) {
		this.connection?.off(methodName, method);
	}

	public disconnect() {
		this.connection?.stop();
	}

	public invoke(methodName: string, method: (...args: any[]) => void) {
		this.connection?.invoke(methodName, method);
	}
}

export const hub = new GlobalHub();
