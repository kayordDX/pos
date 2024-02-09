import { persisted } from "svelte-persisted-store";

interface Selection {
	menuId: number;
}

export const selection = persisted<Selection>("selection", { menuId: 0 });
