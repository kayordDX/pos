import { writable } from "svelte/store";

const createHub = (hubConnection: signalR.HubConnection | undefined) => {
	const { subscribe, set, update } = writable<signalR.HubConnection | undefined>(hubConnection);
	return { subscribe, update, set };
};

export const hub = createHub(undefined);
