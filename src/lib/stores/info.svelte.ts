import { page } from "$app/state";
import { PUBLIC_API_URL, PUBLIC_API_URL_KAYORD } from "$env/static/public";

class Info {
	#isKayord: boolean = $derived(
		page.url.hostname == "pos.kayord.com" || page.url.hostname == "localhost"
	);

	#kayordURL: string = $derived(this.#isKayord ? PUBLIC_API_URL_KAYORD : PUBLIC_API_URL);

	isKayord() {
		return this.#isKayord;
	}

	kayordURL() {
		return this.#kayordURL;
	}
}

export const info = new Info();
