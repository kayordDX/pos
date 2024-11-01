import { useLocalStorage } from "./useLocalStorage.svelte";

interface Menu {
	menuId: number;
}

export const menu = useLocalStorage<Menu>("menu", { menuId: 0 });
