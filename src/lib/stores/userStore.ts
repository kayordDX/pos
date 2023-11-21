import { writable } from "svelte/store";
import type { User } from "$lib/types";

const createUser = (user: User | undefined) => {
	const { subscribe, set } = writable<User | undefined>(user);

	const logout = async () => {
		await fetch("/api/session/logout", { method: "POST" });
		set(undefined);
	};

	const login = async (staffId: number) => {
		try {
			const result = await fetch("/api/session/login", {
				method: "POST",
				body: JSON.stringify({ staffId: staffId }),
			});
			const user = (await result.json()) as { user: User };
			set(user.user);
		} catch {
			set(undefined);
		}
	};

	return { subscribe, logout, login, set };
};

export const user = createUser(undefined);
