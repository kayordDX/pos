<script lang="ts">
	import { onMount } from "svelte";
	import { ModeWatcher, mode } from "@kayord/ui";
	import { Header } from "$lib/components/Header";
	import "../app.postcss";
	import { user } from "$lib/stores/userStore";
	import { outlet } from "$lib/stores/outletStore";
	import { page } from "$app/stores";
	import { getFlash } from "sveltekit-flash-message";
	import { HeadlessToast } from "$lib/components/HeadlessToast";
	import { Toaster, toast } from "svelte-sonner";
	import { browser } from "$app/environment";
	import { QueryClient, QueryClientProvider } from "@tanstack/svelte-query";

	import type { PageData } from "./$types";
	import { salesPeriod } from "$lib/stores/salesPeriodStore";

	export let data: PageData;

	onMount(() => {
		console.log("mount");
		$user = data.user ? data.user : undefined;
		$outlet = data.outlet ? data.outlet : undefined;
		$salesPeriod = data.salesPeriod ? data.salesPeriod : undefined;
	});

	const flash = getFlash(page);
	flash.subscribe(($flash) => {
		if (!$flash) return;
		toast.custom(HeadlessToast, { componentProps: { message: $flash.message, type: $flash.type } });
		flash.set(undefined);
	});

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser,
			},
		},
	});
</script>

<Toaster />
<ModeWatcher />
<Header />
<QueryClientProvider client={queryClient}>
	<slot />
</QueryClientProvider>
