import type { PageServerLoad, Actions } from "./$types";
import { superValidate } from "sveltekit-superforms/server";
import { setFlash } from "sveltekit-flash-message/server";
import { outletSchema } from "./schema";
import { fail, redirect } from "@sveltejs/kit";
// import { outlet } from "$lib/stores/localStoreExample";

export const load: PageServerLoad = async ({ parent }) => {
	const data = await parent();
	const outlet = data.outlet;
	const form = await superValidate(outlet, outletSchema);
	return {
		form,
		outlet: data.outlet,
	};
};
export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, outletSchema);

		if (!form.valid) {
			return fail(400, {
				form,
			});
		}

		try {
			event.cookies.set("outlet", JSON.stringify(form.data), {
				path: "/",
				httpOnly: true,
				sameSite: "strict",
				secure: true,
				maxAge: 60 * 60 * 24 * 365, // 1 year
			});
		} catch (err) {
			setFlash({ type: "error", message: (err as Error).message }, event);
		}
		setFlash({ type: "success", message: "Successfully updated outlet" }, event);
		// throw redirect(303, "/");
		throw redirect(302, "/");
		// return {
		// 	form,
		// };
	},
};
