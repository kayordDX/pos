export const stringToFDate = (dateString: string | null | undefined) => {
	if (dateString == null || dateString == undefined) return "";
	const date = new Date(dateString);
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => any>(
	callback: T,
	wait: number,
	immediate?: boolean
): (...args: Parameters<T>) => void {
	let timeout: NodeJS.Timeout | undefined;

	return function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
		const later = () => {
			timeout = undefined;
			if (!immediate) callback.apply(this, args);
		};

		const callNow = immediate && timeout === undefined;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);

		if (callNow) callback.apply(this, args);
	};
}
