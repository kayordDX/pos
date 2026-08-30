import { browser } from "$app/environment";

interface ModeState {
	mode: "default" | "counter";
	outletId: number;
	deviceId: string;
	deviceName: string;
}

const defaultValue: ModeState = {
	mode: "default",
	outletId: 0,
	deviceId: "",
	deviceName: "",
};

class Mode {
	#key = "mode";
	value: ModeState = $state(defaultValue);

	constructor() {
		if (browser) {
			const item = localStorage.getItem(this.#key);
			if (item) this.value = JSON.parse(item);
		}

		$effect.root(() => {
			$effect(() => {
				localStorage.setItem(this.#key, JSON.stringify(this.value));
			});
		});
	}

	remove() {
		localStorage.removeItem(this.#key);
		this.value = defaultValue;
	}
}

export const mode = new Mode();
