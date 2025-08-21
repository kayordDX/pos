import { useLocalStorage } from "./useLocalStorage.svelte";

interface Mode {
	mode: "default" | "counter";
	outletId: number;
}

export const mode = useLocalStorage<Mode>("mode", { mode: "default", outletId: 0 });
