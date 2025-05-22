import { page } from "$app/state";

class Info {
	#isKayord: boolean = $derived(
		page.url.hostname == "kayord.com" || page.url.hostname == "localhost"
	);

	isKayord() {
		return this.#isKayord;
	}
}

export const info = new Info();
