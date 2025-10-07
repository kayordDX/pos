import { userGetStatus, type UserGetStatusResponse } from "$lib/api";
import { delay } from "$lib/util";

interface Status extends UserGetStatusResponse {
	isNotReady?: boolean;
}

const createStatus = () => {
	let value = $state<Status>({
		clockedIn: false,
		outletId: 0,
		salesPeriodId: 0,
		divisions: [],
		salesPeriod: undefined,
		roles: [],
		features: [],
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

	const hasFeature = (feature: string) => {
		const features = value.features.map((r) => r.name.toLowerCase());
		return features.includes(feature.toLowerCase());
	};

	const hasRoles = (roles: string[]) => {
		const appRoles = value.roles.map((r) => r.roleType);
		return appRoles.some((r) => roles.includes(r));
	};

	let getStatusRunId = 0;

	const getStatus = async () => {
		// increment run id to cancel any in-flight retry loop from previous calls
		const runId = ++getStatusRunId;

		let delayTime = 500; // start with 0.5s
		const maxDelay = 5 * 60 * 1000; // cap at 5 minutes

		while (runId === getStatusRunId) {
			try {
				isLoading = true;
				const data = await userGetStatus();
				if (data) {
					value = data;
					lastRefresh = new Date();
				}
				isLoading = false;
				return; // success; stop retrying
			} catch (e) {
				console.error("Error fetching status", e);
				isLoading = false;

				// backoff with jitter (80% - 120%)
				const jitter = 0.8 + Math.random() * 0.4;
				const wait = Math.min(Math.round(delayTime * jitter), maxDelay);

				// if a newer call started, stop retrying
				if (runId !== getStatusRunId) return;

				await delay(wait);
				delayTime = Math.min(delayTime * 2, maxDelay);
			}
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
		hasRoles,
		hasFeature,
		get isLoading() {
			return isLoading;
		},
		get lastRefresh() {
			return lastRefresh;
		},
	};
};

export const status = createStatus();
