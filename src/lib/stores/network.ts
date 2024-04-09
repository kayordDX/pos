import { browser } from "$app/environment";
import { readable, type Subscriber } from "svelte/store";

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

function getInitialNetorkInformationStore(): NetworkInformationStore {
	return {
		state: "init",
	};
}

function subscribeToNetworkInformation(setter: Subscriber<NetworkInformationStore>) {
	// Noop on SSR.
	if (!browser) {
		return;
	}

	try {
		const connection =
			// @ts-expect-error Unsupported vendor-prefixed connection accessors.
			navigator?.connection || navigator?.mozConnection || navigator?.webkitConnection;

		const updateState = () => {
			setter({
				state: connection ? "subscribed" : "not-supported",
				type: connection?.type,
				effectiveType: navigator?.onLine ? connection?.effectiveType : undefined,
				connectivity: navigator?.onLine ? "online" : "offline",
				rtt: connection?.rtt,
				downlink: connection?.downlink,
				downlinkMax: connection?.downlinkMax,
				saveData: connection?.saveData,
			});
		};

		// Inital state set. No change might happen at all.
		updateState();

		if (connection) {
			connection.addEventListener("change", updateState);
		}
		window.addEventListener("online", updateState);
		window.addEventListener("offline", updateState);
		return () => {
			if (connection) {
				connection.removeEventListener("change", updateState);
			}
			window.removeEventListener("online", updateState);
			window.removeEventListener("offline", updateState);
		};
	} catch (error) {
		setter({ state: "error" });
	}
}

export const networkInformationStore = readable(
	getInitialNetorkInformationStore(),
	subscribeToNetworkInformation
);
