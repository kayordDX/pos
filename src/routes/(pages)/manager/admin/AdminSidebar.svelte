<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { Sidebar } from "@kayord/ui";
	const sidebar = Sidebar.useSidebar();

	import {
		PrinterIcon,
		MessageCircleIcon,
		UserRoundSearchIcon,
		UsersIcon,
		NfcIcon,
		NotebookTextIcon,
	} from "lucide-svelte";

	const menuItems = [
		{
			title: "Printers",
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
		{
			title: "Halo",
			href: "/manager/admin/halo",
			icon: NfcIcon,
		},
		{
			title: "Menus Items",
			href: "/manager/admin/menuItems",
			icon: NotebookTextIcon,
		},
	];

	let activeItem = $derived.by(() => {
		for (const item of menuItems) {
			if ($page.route.id?.endsWith(item.href)) {
				return item;
			}
		}
		return menuItems[0];
	});
</script>

<Sidebar.Root>
	<Sidebar.Header class="bg-secondary h-14 flex items-center justify-center">
		<Sidebar.Menu>
			<Sidebar.MenuItem class="flex items-center justify-center">
				<button class="flex items-center rounded-full" onclick={() => goto("/")}>
					<img src="/logo.svg" alt="kayord-logo" class="h-8" />
					ayord.Pos
				</button>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>
	<Sidebar.Content class="bg-background">
		<Sidebar.Group />
		<Sidebar.GroupContent>
			<Sidebar.Menu class="px-2">
				{#each menuItems as item (item.href)}
					<Sidebar.MenuItem>
						<Sidebar.MenuButton
							class="data-[active=true]:bg-primary data-[active=true]:text-primary-foreground rounded-sm"
							tooltipContentProps={{
								hidden: false,
							}}
							onclick={() => {
								goto(item.href);
								if (sidebar.isMobile) {
									sidebar.setOpenMobile(false);
								}
							}}
							isActive={activeItem?.title === item.title}
						>
							{#snippet tooltipContent()}
								{item.title}
							{/snippet}
							{#if item.icon}
								<item.icon class="!size-6" />
							{/if}
							<span>{item.title}</span>
						</Sidebar.MenuButton>
					</Sidebar.MenuItem>
				{/each}
			</Sidebar.Menu>
		</Sidebar.GroupContent>
		<Sidebar.Group />
	</Sidebar.Content>
	<Sidebar.Footer class="bg-secondary" />
</Sidebar.Root>
