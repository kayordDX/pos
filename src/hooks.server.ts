import type { Handle } from "@sveltejs/kit";
import type { Outlet, User } from "./lib/types";

export const handle: Handle = async ({ event, resolve }) => {
	const session = event.cookies.get("session");
	const outlet = event.cookies.get("outlet");

	if (session) {
		try {
			const decodedSession = JSON.parse(atob(session.split(".")[1])) as User;

			event.locals.user = {
				id: Number(decodedSession.id),
				name: decodedSession.name,
				token: session,
				type: Number(decodedSession.type),
			};
		} catch {
			return await resolve(event);
		}
	}

	if (outlet) {
		try {
			const outletJson = JSON.parse(outlet) as Outlet;
			event.locals.outlet = outletJson;
		} catch {
			return await resolve(event);
		}
	}

	return await resolve(event);
};
