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
		hasNotification: false,
		statusId: 0,
	});

	let isLoading = $state(false);
	let lastRefresh = $state(new Date(1970));

	const hasRole = (role: string) => {
		const appRoles = value.roles.map((r) => r.roleType);
		return appRoles.includes(role);
	};

	const hasRoles = (roles: string[]) => {
		const appRoles = value.roles.map((r) => r.roleType);
		return appRoles.some((r) => roles.includes(r));
	};

	const getStatus = async () => {
		isLoading = true;
		const { data } = await client.GET("/user/getStatus", { fetch });
		if (data) {
			value = data;
		}
		lastRefresh = new Date();
		isLoading = false;
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
		hasRoles,
		get isLoading() {
			return isLoading;
		},
		get lastRefresh() {
			return lastRefresh;
		},
	};
};

export const status = createStatus();
