import { writable } from "svelte/store";

interface Payment {
	url: string | undefined;
}

const createHeader = (pay: Payment) => {
	const clear = () => {
		set({ url: undefined });
	};

	const setUrl = (url: string) => {
		set({ url });
	};

	const { subscribe, set, update } = writable<Payment>(pay);
	return { subscribe, update, set, setUrl, clear };
};

export const payment = createHeader({ url: undefined });
