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
