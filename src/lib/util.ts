export const stringToFDate = (dateString: string | null | undefined) => {
	if (dateString == null || dateString == undefined) return "";
	const date = new Date(dateString);
	if (date.getFullYear() == 1) return "";
	return date.toLocaleDateString(undefined, {
		hour: "2-digit",
		minute: "2-digit",
	});
};

export const getInitials = (string: string) => {
	const names = string.split(" ");
	let initials = names[0]?.substring(0, 1).toUpperCase();

	if (names.length > 1) {
		initials += names[names.length - 1]?.substring(0, 1)?.toUpperCase() ?? "";
	}
	return initials;
};

export const debounce = (fn: Function, ms = 300) => {
	let timeoutId: ReturnType<typeof setTimeout>;
	return function (this: any, ...args: any[]) {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => fn.apply(this, args), ms);
	};
};

export const requestNotificationPermission = async () => {
	const permission = await Notification.requestPermission();
	if (permission === "granted") {
		const registration = await navigator.serviceWorker.ready;
		registration.showNotification("Your are now subscribed to notifications", {
			body: "Buzz! Buzz!",
			icon: "/logo.svg",
		});
	}
};

export const arrayUnique = <T>(array: Array<T>) => {
	var a = array.concat();
	for (let i = 0; i < a.length; ++i) {
		for (let j = i + 1; j < a.length; ++j) {
			if (a[i] === a[j]) a.splice(j--, 1);
		}
	}
	return a;
};
