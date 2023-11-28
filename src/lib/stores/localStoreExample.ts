import { writable } from "svelte/store";
import type { Outlet } from "$lib/types";
import { browser } from "$app/environment";

const createExample = (outlet: Outlet | undefined) => {
	const localState = browser ? localStorage.getItem("outlet") : undefined;
	const appState = localState ? JSON.parse(localState) : outlet;

	const { subscribe, set } = writable<Outlet | undefined>(appState);

	subscribe((value) => {
		if (!browser) return;
		if (value) {
			localStorage.setItem("outlet", JSON.stringify(value));
		} else {
			localStorage.removeItem("outlet");
		}
	});

	const setup = async (outlet: Outlet) => {
		set(outlet);
	};

	const clear = async () => {
		set(undefined);
	};

	return { subscribe, setup, clear, set };
};

export const example = createExample(undefined);
