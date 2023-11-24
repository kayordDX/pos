import type { LayoutServerLoad } from "./$types";
import { loadFlash } from "sveltekit-flash-message/server";

export const load = loadFlash(async ({ locals }) => {
	return { user: locals.user, outlet: locals.outlet };
}) satisfies LayoutServerLoad;
