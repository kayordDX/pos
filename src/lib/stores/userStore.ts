import { writable } from "svelte/store";
import { StaffType, type User } from "$lib/types";
import { goto } from "$app/navigation";

const createUser = (user: User | undefined) => {
	const { subscribe, set } = writable<User | undefined>(user);

	const logout = async () => {
		await fetch("/api/session/logout", { method: "POST" });
		set(undefined);
		goto("/");
	};

	const redirectToPage = (user: User) => {
		if (Number(user.type) == StaffType.Manager) {
			goto("/manager");
		} else if (Number(user.type) == StaffType.Chef) {
			goto("/chef");
		} else {
			goto("/waiter");
		}
	};

	const login = async (staffId: number) => {
		try {
			const result = await fetch("/api/session/login", {
				method: "POST",
				body: JSON.stringify({ staffId: staffId }),
			});
			const user = (await result.json()) as { user: User };
			set(user.user);
			redirectToPage(user.user);
		} catch {
			set(undefined);
		}
	};

	return { subscribe, logout, login, set };
};

export const user = createUser(undefined);
