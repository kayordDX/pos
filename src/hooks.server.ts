import type { Handle } from "@sveltejs/kit";
import type { User } from "./lib/types";

export const handle: Handle = async ({ event, resolve }) => {
	const session = event.cookies.get("session");

	if (!session) {
		return await resolve(event);
	}

	try {
		const decodedSession = JSON.parse(atob(session.split(".")[1])) as User;

		event.locals.user = {
			id: Number(decodedSession.id),
			name: decodedSession.name,
			email: decodedSession.email,
			type: decodedSession.type,
		};
	} catch {
		return await resolve(event);
	}

	return await resolve(event);
};
