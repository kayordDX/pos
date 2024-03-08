import type { LayoutLoad } from "./$types";
import { browser } from "$app/environment";
import { session } from "$lib/stores/session";
import * as signalR from "@microsoft/signalr";
import { env } from "$env/dynamic/public";
import { hub } from "$lib/stores/hub";

export const load = (async ({ data }) => {
	if (browser) {
		session.set(data.session);
		console.log("what the fook is going on?");

		const connection = new signalR.HubConnectionBuilder()
			.withUrl(`${env.PUBLIC_API_URL}/hub`, {
				accessTokenFactory: () => data.session?.token ?? "",
			})
			.withAutomaticReconnect()
			.build();

		connection.start().catch((err) => console.error(err));
		hub.set(connection);
	}

	return {
		...data,
	};
}) satisfies LayoutLoad;
