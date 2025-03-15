import { browser } from "$app/environment";

type NetworkInformationStore = {
	state: "init" | "not-supported" | "subscribed" | "error";
	type?: "bluetooth" | "cellular" | "ethernet" | "none" | "wifi" | "wimax" | "other" | "unknown";
	connectivity?: "online" | "offline";
	effectiveType?: "slow-2g" | "2g" | "3g" | "4g";
	rtt?: number;
	downlink?: number;
	downlinkMax?: number;
	saveData?: boolean;
};

class Network {
	value: NetworkInformationStore = $state({ state: "init" });

	#connection =
		// @ts-expect-error Unsupported vendor-prefixed connection accessors.
		navigator?.connection || navigator?.mozConnection || navigator?.webkitConnection;

	public constructor() {
		$effect.root(() => {
			$effect(() => {
				if (this.#connection) {
					this.#connection.addEventListener("change", this.updateState);
				}
				window.addEventListener("online", this.updateState);
				window.addEventListener("offline", this.updateState);
				return () => {
					if (this.#connection) {
						this.#connection.removeEventListener("change", this.updateState);
					}
					window.removeEventListener("online", this.updateState);
					window.removeEventListener("offline", this.updateState);
				};
			});
			this.updateState();
		});
	}

	public updateState() {
		if (!browser) {
			return;
		}
		this.value = {
			state: this.#connection ? "subscribed" : "not-supported",
			type: this.#connection?.type,
			effectiveType: navigator?.onLine ? this.#connection?.effectiveType : undefined,
			connectivity: navigator?.onLine ? "online" : "offline",
			rtt: this.#connection?.rtt,
			downlink: this.#connection?.downlink,
			downlinkMax: this.#connection?.downlinkMax,
			saveData: this.#connection?.saveData,
		};
	}
}

export const networkInformation = new Network();
