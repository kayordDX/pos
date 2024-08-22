function createCounter() {
	let count = $state(0);

	const test = $derived(count * 2);

	return {
		get count() {
			return count;
		},
		set count(value) {
			count = value;
		},
	};
}

export const counter = createCounter();
