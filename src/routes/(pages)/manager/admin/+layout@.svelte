<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/state";
	import { Header } from "$lib/components/Header";
	import { Button, Sidebar } from "@kayord/ui";
	import { cn } from "@kayord/ui/utils";
	import {
		PrinterIcon,
		MessageCircleIcon,
		UserRoundSearchIcon,
		UsersIcon,
		ArrowLeftIcon,
		MenuIcon,
	} from "@lucide/svelte";
	import type { Snippet } from "svelte";
	import AdminSidebar from "./AdminSidebar.svelte";
	import { info } from "$lib/stores/info.svelte";

	let showSidebar = $state(true);

	let { children }: { children?: Snippet } = $props();

	const activeClass =
		"bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground";

	const menuItems = {
		top: [
			{
				title: "Admin",
				href: "/manager/admin",
				icon: PrinterIcon,
			},
			{
				title: "Users",
				href: "/manager/admin/users",
				icon: UsersIcon,
			},
			{
				title: "Unassigned Users",
				href: "/manager/admin/users/unassigned",
				icon: UserRoundSearchIcon,
			},
			{
				title: "Whatsapp",
				href: "/manager/admin/whatsapp",
				icon: MessageCircleIcon,
			},
		],
	};

	const isOld = $state(false);
</script>

{#snippet leftMenu()}
	<Button variant="ghost" size="icon" onclick={() => (showSidebar = true)}>
		<MenuIcon class="h-6 w-6" />
	</Button>
{/snippet}

{#if isOld}
	<div>
		<Header class="z-20 border-none" hideHeader leftHeader={leftMenu} />
		{#if showSidebar}
			<div class="bg-secondary fixed bottom-0 top-0 left-0 z-0 w-14 flex flex-col justify-between">
				<div class="flex flex-col gap-4 p-2">
					<button
						class="flex items-center bg-background p-2 rounded-full"
						onclick={() => goto("/")}
					>
						<img src={`${info.isKayord() ? "/kayord" : ""}/logo.svg`} alt="logo" class="h-6" />
					</button>
					{#each menuItems.top as item}
						<Button
							href={item.href}
							variant="ghost"
							size="icon"
							class={page.url.pathname === item.href
								? cn(activeClass)
								: "hover:bg-primary hover:text-primary-foreground"}
						>
							<item.icon class="h-6 w-6" />
						</Button>
					{/each}
				</div>
				<div class="flex flex-col gap-4 p-2">
					<Button variant="ghost" size="icon" onclick={() => (showSidebar = false)}>
						<ArrowLeftIcon class="h-6 w-6" />
					</Button>
				</div>
			</div>
		{/if}
		<div class={cn("absolute right-0", showSidebar ? "left-14" : "left-0")}>
			{#if children}
				{@render children()}
			{/if}
		</div>
	</div>
{:else}
	{#snippet sidebarTrigger()}
		<Sidebar.Trigger />
	{/snippet}

	<Sidebar.Provider>
		<AdminSidebar />
		<main class="w-full">
			<Header class="z-20 border-none" hideHeader leftHeader={sidebarTrigger} />
			{@render children?.()}
		</main>
	</Sidebar.Provider>
{/if}
