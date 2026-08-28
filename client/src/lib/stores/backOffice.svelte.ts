import { useLocalStorage } from "./useLocalStorage.svelte";

export const backOffice = useLocalStorage("back-office", { itemHeight: 500, fontSize: 1000 });
