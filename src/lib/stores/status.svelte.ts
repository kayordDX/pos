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

	const hasRole = (role: string) => {
		const appRoles = value.roles.map((r) => r.appRoleName);
		return appRoles.includes(role);
	};

	const getStatus = async () => {
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
		hasRole,
	};
};

export const status = createStatus();
