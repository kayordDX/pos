const createHeader = (hideHeader: boolean) => {
	let header = $state(hideHeader);
	const toggleHeader = () => {
		header = !header;
	};

	return {
		get value() {
			return header;
		},
		set value(value) {
			header = value;
		},
		toggleHeader,
	};
};

export const header = createHeader(true);
