import { HubConnection, HubConnectionBuilder, LogLevel, HubConnectionState } from "@microsoft/signalr";
import { session } from "$lib/firebase.svelte";
import { info } from "./info.svelte";

class Hub {
	connection: HubConnection | undefined = $state(undefined);
	state: HubConnectionState = $state(HubConnectionState.Disconnected);

	// plain counter to cancel pending connect retries on disconnect/re-init
	#generation = 0;

	public async init(options?: { anonymous?: boolean }) {
		if (this.connection && this.connection.state !== HubConnectionState.Disconnected) {
			return;
		}

		const generation = ++this.#generation;
		const connection = new HubConnectionBuilder()
			.withUrl(`${info.kayordURL()}/hub`, {
				// fetch a fresh token on every (re)connect — Firebase tokens expire after 1 hour.
				// anonymous connections (device-link flow) must not send a token at all
				accessTokenFactory: options?.anonymous ? undefined : async () => (await session.user?.getIdToken()) ?? "",
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

		// withAutomaticReconnect only covers drops AFTER a successful start —
		// retry a failed initial start manually
		const maxAttempts = 3;
		for (let attempt = 1; attempt <= maxAttempts; attempt++) {
			if (generation !== this.#generation) {
				return;
			}
			try {
				await connection.start();
				if (generation !== this.#generation) {
					return;
				}
				this.state = HubConnectionState.Connected;
				return;
			} catch (err) {
				if (attempt === maxAttempts) {
					this.state = HubConnectionState.Disconnected;
					console.error(err);
					return;
				}
				await new Promise((resolve) => setTimeout(resolve, 2000));
			}
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

	public async disconnect() {
		this.#generation++;
		this.state = HubConnectionState.Disconnected;
		// await stop so a follow-up init() doesn't see the old connection as still open
		await this.connection?.stop();
	}
}
export const hub = new Hub();
