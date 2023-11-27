<script lang="ts">
	import { ModeWatcher, mode } from "@kayord/ui";
	import { Header } from "$lib/components/Header";
	import "../app.postcss";
	import { user } from "$lib/stores/userStore";
	import { page } from "$app/stores";
	import { getFlash } from "sveltekit-flash-message";
	import { HeadlessToast } from "$lib/components/HeadlessToast";
	import { Toaster, toast } from "svelte-sonner";

	import type { PageData } from "./$types";

	export let data: PageData;

	if (data.user) {
		$user = data.user;
	} else {
		$user = undefined;
	}

	const flash = getFlash(page);
	flash.subscribe(($flash) => {
		if (!$flash) return;
		toast.custom(HeadlessToast, { componentProps: { message: $flash.message, type: $flash.type } });
		flash.set(undefined);
	});
</script>

<Toaster />
<ModeWatcher />
<Header />
<slot />
