<script>
	import { goto } from "$app/navigation";
	import { Sidebar } from "@kayord/ui";
	import { PrinterIcon, MessageCircleIcon, UserRoundSearchIcon, UsersIcon } from "lucide-svelte";
	const menuItems = [
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
	];

	let activeItem = $state(menuItems[0]);
</script>

<Sidebar.Root>
	<Sidebar.Header>
		<Sidebar.Menu>
			<Sidebar.MenuItem class="flex items-center justify-center">
				<button class="flex items-center bg-background rounded-full" onclick={() => goto("/")}>
					<img src="/logo.svg" alt="kayord-logo" class="h-8" />
				</button>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>
	<Sidebar.Content>
		<Sidebar.Group />
		<Sidebar.GroupContent>
			<Sidebar.Menu class="gap-3">
				{#each menuItems as item (item.href)}
					<Sidebar.MenuItem class="p-1">
						<Sidebar.MenuButton
							class={`flex flex-row items-center justify-center rounded-full size-10 ${activeItem?.title === item.title ? "bg-primary text-primary-foreground" : ""}`}
							tooltipContentProps={{
								hidden: false,
							}}
							onclick={() => {
								activeItem = item;
								goto(item.href);
							}}
							isActive={activeItem?.title === item.title}
						>
							{#snippet tooltipContent()}
								{item.title}
							{/snippet}
							<item.icon class="!size-6" />
						</Sidebar.MenuButton>
					</Sidebar.MenuItem>
				{/each}
			</Sidebar.Menu>
		</Sidebar.GroupContent>
		<Sidebar.Group />
	</Sidebar.Content>
	<Sidebar.Footer />
</Sidebar.Root>
