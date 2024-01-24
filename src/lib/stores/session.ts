import type { Session } from "@auth/sveltekit";
import { writable } from "svelte/store";

const createSession = (session: Session | undefined | null) => {
	const { subscribe, set, update } = writable<Session | null | undefined>(session);
	return { subscribe, update, set };
};

export const session = createSession(undefined);
