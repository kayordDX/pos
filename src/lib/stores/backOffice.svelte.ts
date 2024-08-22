const createBackOffice = () => {
	let backOffice = $state({ itemHeight: 500, fontSize: 1000 });
	return {
		get value() {
			return backOffice;
		},
		set value(value) {
			backOffice = value;
		},
	};
};
export const backOffice = createBackOffice();
