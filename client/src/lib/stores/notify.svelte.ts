const createNotify = () => {
	let show = $state(false);

	const notify = () => {
		show = true;
		setTimeout(() => {
			show = false;
		}, 2000);
	};

	return {
		get show() {
			return show;
		},
		notify,
	};
};

export const notification = createNotify();
