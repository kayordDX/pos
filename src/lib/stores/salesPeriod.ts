import { writable } from "svelte/store";
import type { SalesPeriod } from "$lib/api";

const createSalesPeriod = (salesPeriod: SalesPeriod | undefined) => {
	const { subscribe, set } = writable<SalesPeriod | undefined>(salesPeriod);

	return { subscribe, set };
};

export const salesPeriod = createSalesPeriod(undefined);
