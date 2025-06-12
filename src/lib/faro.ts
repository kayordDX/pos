import { initializeFaro } from "@grafana/faro-web-sdk";
import { dev } from "$app/environment";

export const faro = initializeFaro({
	url: "https://alloy.kayord.com/collect",
	apiKey: "kayord",
	app: {
		name: "pos",
		environment: dev ? "dev" : "prod",
	},
});
