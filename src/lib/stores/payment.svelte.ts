interface Payment {
	url: string | undefined;
}

const createHeader = (pay: Payment) => {
	let url: string | undefined;
	const clear = () => {
		url = undefined;
	};

	const setUrl = (newUrl: string) => {
		url = newUrl;
	};

	return {
		get url() {
			return url;
		},
		setUrl,
		clear,
	};
};

export const payment = createHeader({ url: undefined });
