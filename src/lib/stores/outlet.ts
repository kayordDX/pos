import { writable } from "svelte/store";
import type { Outlet } from "$lib/types";

const createOutlet = (outlet: Outlet | undefined) => {
	const { subscribe, set } = writable<Outlet | undefined>(outlet);

	const clear = async () => {
		set(undefined);
	};

	return { subscribe, clear, set };
};

export const outlet = createOutlet(undefined);
