import { browser } from "$app/environment";
import { writable } from "svelte/store";

interface Outlet {
	name: string | undefined;
	id: number | undefined;
}

let outlet: Outlet = {
	name: undefined,
	id: undefined,
};

if (browser) {
	const localValue = localStorage.getItem("outlet");
	console.log("KJ", localValue);
	outlet = localValue == null ? outlet : JSON.parse(localValue);
}

const { subscribe } = writable(outlet);

if (browser) {
	subscribe((value) => localStorage.setItem("outlet", JSON.stringify(value)));
}

export default {
	subscribe,
};
