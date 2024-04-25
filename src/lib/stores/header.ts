import { writable } from "svelte/store";

const createHeader = (hideHeader: boolean) => {
	const toggleHeader = () => {
		update((x) => !x);
	};

	const { subscribe, set, update } = writable<boolean>(hideHeader);
	return { subscribe, update, set, toggleHeader };
};

export const header = createHeader(true);
