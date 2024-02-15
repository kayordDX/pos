import type { PageServerLoad, Actions } from "./$types";
import { superValidate } from "sveltekit-superforms/server";
import { outletSchema } from "./schema";
import { fail } from "@sveltejs/kit";
import { redirect, setFlash } from "sveltekit-flash-message/server";
import { client } from "$lib/api";
import { getError } from "$lib/types";

export const load: PageServerLoad = async ({ fetch, parent }) => {
	const data = await parent();
	const outlet = { outletId: data.status?.outletId ?? 0 };
	const result = await client(data.session?.token).GET("/outlet", { fetch });
	const form = await superValidate(outlet, outletSchema);

	return {
		form,
		outlets: {
			data: result.data,
			error: result.error,
		},
		outlet: data.status?.outletId,
	};
};

export const actions: Actions = {
	default: async (event) => {
		const session = await event.locals.auth();
		const form = await superValidate(event, outletSchema);

		if (!form.valid) {
			return fail(400, {
				form,
			});
		}

		try {
			await client(session?.token).POST("/user/assignOutlet", {
				body: { outletId: form.data.outletId },
				headers: {
					"content-type": "application/json",
				},
			});
		} catch (err) {
			setFlash({ type: "error", message: getError(err).message }, event);
		}
		setFlash({ type: "success", message: "Successfully updated outlet" }, event);
		redirect(302, "/");
	},
};
