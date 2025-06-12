import { initializeFaro } from "@grafana/faro-web-sdk";
import { dev } from "$app/environment";
import { PUBLIC_FARO_KEY, PUBLIC_FARO_URL } from "$env/static/public";

export const faro = initializeFaro({
	url: PUBLIC_FARO_URL,
	apiKey: PUBLIC_FARO_KEY,
	app: {
		name: "pos",
		environment: dev ? "dev" : "prod",
	},
});
