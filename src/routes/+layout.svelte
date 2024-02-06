<script lang="ts">
	import { ModeWatcher } from "@kayord/ui/mode-watcher";
	import { Header } from "$lib/components/Header";
	import "../app.pcss";
	import { page } from "$app/stores";
	import { getFlash } from "sveltekit-flash-message";
	import { HeadlessToast } from "$lib/components/HeadlessToast";
	import { Toaster, toast } from "@kayord/ui";
	import { browser } from "$app/environment";
	import { QueryClient, QueryClientProvider } from "@tanstack/svelte-query";

	import type { PageData } from "./$types";
	export let data: PageData;

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
	<Header session={data.session} />
{/if}
<QueryClientProvider client={queryClient}>
	<slot />
</QueryClientProvider>
