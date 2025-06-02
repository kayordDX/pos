import { page } from "$app/state";
import { PUBLIC_API_URL } from "$env/static/public";

class Info {
	#isKayord: boolean = $derived(
		page.url.hostname == "pos.kayord.com" || page.url.hostname == "localhost"
	);

	#kayordURL: string = PUBLIC_API_URL;

	isKayord() {
		return this.#isKayord;
	}

	kayordURL() {
		return this.#kayordURL;
	}
}

export const info = new Info();
