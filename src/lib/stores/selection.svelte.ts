import { useLocalStorage } from "./useLocalStorage.svelte";

interface Selection {
	menuId: number;
}

export const selection = useLocalStorage<Selection>("selection", { menuId: 0 });
