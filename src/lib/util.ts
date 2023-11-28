export const stringToFDate = (dateString: string | null | undefined) => {
	if (dateString == null || dateString == undefined) return "";
	const date = new Date(dateString);
	return date.toLocaleDateString(undefined, {
		hour: "2-digit",
		minute: "2-digit",
	});
};
