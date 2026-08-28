<script lang="ts">
	import Menu from "./Menu.svelte";
	import { goto } from "$app/navigation";
	import { logout, session } from "$lib/firebase.svelte";
	import { header } from "$lib/stores/header.svelte";
	import { page } from "$app/state";
	import { slide } from "svelte/transition";
	import type { Snippet } from "svelte";
	import { cn } from "@kayord/ui/utils";
	import { Badge, Button } from "@kayord/ui";
	import { status } from "$lib/stores/status.svelte";
	import { CircleSmallIcon, HomeIcon, LogOutIcon } from "@lucide/svelte";
	import { getInitials } from "$lib/util";
	import { info } from "$lib/stores/info.svelte";
	import { mode } from "$lib/stores/mode.svelte";

	interface Props {
		children?: Snippet;
		class?: string;
		hideHeader?: boolean;
		leftHeader?: Snippet;
	}

	let { children, class: className, hideHeader = false, leftHeader }: Props = $props();

	const hideHeaderPages = $derived(page.route.id?.includes("backOffice") ?? false);
</script>

{#if header.value || !hideHeaderPages}
	<div
		class={cn(
			"bg-secondary p-2 flex justify-between h-14 items-center border-b-2 border-secondary",
			className
		)}
		transition:slide
	>
		{#if !hideHeader}
			<button class="flex items-center" onclick={() => goto("/")}>
				<img src={`${info.isKayord() ? "/kayord" : ""}/logo.svg`} alt="logo" class="h-10" />
				<span class="hidden md:block font-bold text-lg">
					{info.isKayord() ? "kayord" : "aviate"}
				</span>
			</button>
		{/if}
		{#if leftHeader}
			{@render leftHeader()}
		{/if}
		<span>
			{#if children}
				{@render children()}
			{/if}
		</span>
		<div class="flex gap-2 items-center">
			{#if mode.value.mode == "counter" && mode.value.deviceId.length > 0}
				<div class="flex flex-col gap-1 items-start max-w-[120px]">
					<Badge variant="outline" class="hidden sm:flex flex-row items-center">
						<CircleSmallIcon class="text-destructive" />
						Counter Mode
					</Badge>
					<Badge variant="outline" class="sm:hidden">CM</Badge>
					<Badge variant="outline" class="hidden sm:flex flex-row flex-1 w-full truncate">
						{session.user?.displayName}
					</Badge>
					<Badge variant="outline" class="sm:hidden">
						{getInitials(session.user?.displayName ?? "")}
					</Badge>
				</div>

				<Button variant="destructive" onclick={logout}>
					<LogOutIcon />
					<div class="hidden sm:flex">Logout</div>
				</Button>
			{:else}
				{#if status.value.outletName}
					<button onclick={() => goto("/switch")}>
						<Badge variant="outline" class="hidden sm:block">
							{status.value.outletName}
						</Badge>
						<Badge variant="outline" class="sm:hidden">
							{getInitials(status.value.outletName)}
						</Badge>
					</button>
				{/if}
				{#if session.user}
					<Menu />
				{/if}
			{/if}
		</div>
	</div>
{/if}
