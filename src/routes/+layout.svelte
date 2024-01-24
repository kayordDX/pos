<script lang="ts">
	import { onMount } from "svelte";
	import { ModeWatcher } from "@kayord/ui/mode-watcher";
	import { Header } from "$lib/components/Header";
	import "../app.postcss";
	import { user } from "$lib/stores/userStore";
	import { outlet } from "$lib/stores/outletStore";
	import { page } from "$app/stores";
	import { getFlash } from "sveltekit-flash-message";
	import { HeadlessToast } from "$lib/components/HeadlessToast";
	import { Toaster, toast } from "@kayord/ui";
	import { browser } from "$app/environment";
	import { QueryClient, QueryClientProvider } from "@tanstack/svelte-query";

	import type { PageData } from "./$types";
	import { salesPeriod } from "$lib/stores/salesPeriodStore";
	import { session } from "$lib/stores/session";

	export let data: PageData;

	onMount(() => {
		console.log("mount");
		$user = { id: 1, name: "test", token: "test", type: 2 };
		$outlet = data.outlet ? data.outlet : undefined;
		$salesPeriod = data.salesPeriod ? data.salesPeriod : undefined;
		$session = data.session;
	});

	const flash = getFlash(page);
	flash.subscribe(($flash) => {
		if (!$flash) return;
		if ($flash.type === "success") {
			toast.success($flash.message);
		} else if ($flash.type === "error") {
			toast.error($flash.message);
		} else {
			toast.custom(HeadlessToast, {
				componentProps: { message: $flash.message, type: $flash.type },
			});
		}
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
{#if !($page.route?.id ?? "").startsWith("/login")}
	<Header />
{/if}
<QueryClientProvider client={queryClient}>
	<slot />
</QueryClientProvider>
