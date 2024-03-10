import { client, type UserGetStatusResponse } from "$lib/api";
import { writable } from "svelte/store";

type Status = UserGetStatusResponse;

const createStatus = (status: Status) => {
	const getStatus = async () => {
		const { data } = await client.GET("/user/getStatus", { fetch });
		if (data) {
			set(data);
		}
	};

	const { subscribe, set, update } = writable<Status>(status);
	return { subscribe, update, set, getStatus };
};

export const status = createStatus({
	clockedIn: false,
	outletId: 0,
	salesPeriodId: 0,
	salesPeriod: undefined,
	roles: [],
});
