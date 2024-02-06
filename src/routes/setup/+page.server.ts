import type { PageServerLoad, Actions } from "./$types";
import { superValidate } from "sveltekit-superforms/server";
import { outletSchema } from "./schema";
import { fail, redirect } from "@sveltejs/kit";
import { client } from "$lib/api";
import { toast } from "@kayord/ui";
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
			});
		} catch (err) {
			toast.error(getError(err).message);
		}
		toast.info("Successfully updated outlet");
		redirect(302, "/");
	},
};
