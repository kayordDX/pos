import type { PageServerLoad, Actions } from "./$types";
import { superValidate } from "sveltekit-superforms/server";
import { zod } from "sveltekit-superforms/adapters";
import { outletSchema } from "./schema";
import { fail } from "@sveltejs/kit";
import { redirect, setFlash } from "sveltekit-flash-message/server";
import { client } from "$lib/api";
import { getError } from "$lib/types";

export const load: PageServerLoad = async ({ fetch, parent }) => {
	const data = await parent();
	const outlet = { outletId: data.status?.outletId ?? 0 };
	const result = await client.GET("/outlet", { fetch });
	const form = await superValidate(outlet, zod(outletSchema));

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
		const form = await superValidate(event, zod(outletSchema));
		if (!form.valid) {
			return fail(400, {
				form,
			});
		}

		let success = false;

		try {
			const { response } = await client.POST("/user/assignOutlet", {
				body: { outletId: form.data.outletId },
				fetch: event.fetch,
			});
			if (response.ok) {
				success = true;
				setFlash({ type: "success", message: "Successfully updated outlet" }, event);
			} else {
				setFlash({ type: "error", message: "Could not set outlet" }, event);
			}
		} catch (err) {
			console.log(err);
			setFlash({ type: "error", message: getError(err).message }, event);
		}

		if (success) {
			redirect(302, "/");
		}
	},
};
