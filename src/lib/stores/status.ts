import { client } from "$lib/api";
import { writable } from "svelte/store";

interface Status {
	clockedIn: boolean;
	outletId: number;
	salesPeriodId: number;
}

const createStatus = (status: Status) => {
	const getStatus = async () => {
		const { data } = await client.GET("/user/getStatus", { fetch });
		if (data) {
			set({
				clockedIn: data.clockedIn,
				outletId: data.outletId,
				salesPeriodId: data.salesPeriodId,
			});
		}
	};

	const { subscribe, set, update } = writable<Status>(status);
	return { subscribe, update, set, getStatus };
};

export const status = createStatus({ clockedIn: false, outletId: 0, salesPeriodId: 0 });
