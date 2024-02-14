import { client } from "$lib/api";
import type { LayoutServerLoad } from "./$types";

export const load = (async ({ locals, depends, fetch }) => {
	depends("main");
	const session = await locals.auth();
	const { data } = await client(session?.token).GET("/user/getStatus", { fetch });

	return { status: data, session };
}) satisfies LayoutServerLoad;
