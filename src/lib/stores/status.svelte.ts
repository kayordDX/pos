import { client, type UserGetStatusResponse } from "$lib/api";

interface Status extends UserGetStatusResponse {
	isNotReady?: boolean;
}

const createStatus = () => {
	let value = $state<Status>({
		clockedIn: false,
		outletId: 0,
		salesPeriodId: 0,
		salesPeriod: undefined,
		roles: [],
		isNotReady: true,
	});

	const getStatus = async () => {
		$inspect("getting status");
		const { data } = await client.GET("/user/getStatus", { fetch });
		if (data) {
			value = data;
		}
	};
	return {
		get value() {
			return value;
		},
		set value(newValue) {
			value = newValue;
		},
		getStatus,
	};
};

export const status = createStatus();
