<script lang="ts">
	import Menu from "./Menu.svelte";
	import { goto } from "$app/navigation";
	import { session } from "$lib/firebase.svelte";
	import { header } from "$lib/stores/header.svelte";
	import { page } from "$app/state";
	import { slide } from "svelte/transition";
	import type { Snippet } from "svelte";
	import { cn } from "@kayord/ui/utils";
	import { Badge } from "@kayord/ui";
	import { status } from "$lib/stores/status.svelte";
	import { HomeIcon } from "@lucide/svelte";
	import { getInitials } from "$lib/util";

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
				<img src="/logo.svg" alt="kayord-logo" class="h-10" />
				<span class="hidden md:block">ayord.Pos</span>
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
			{#if status.value.outletName}
				<Badge variant="outline" class="hidden sm:block">{status.value.outletName}</Badge>
				<Badge variant="outline" class="sm:hidden">{getInitials(status.value.outletName)}</Badge>
			{/if}
			{#if session.user}
				<Menu />
			{/if}
		</div>
	</div>
{/if}
