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
			<Sidebar.Menu>
				{#each menuItems as item (item.href)}
					<Sidebar.MenuItem>
						<Sidebar.MenuButton
							class="data-[active=true]:bg-primary data-[active=true]:text-primary-foreground rounded-none"
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
	<Sidebar.Footer />
</Sidebar.Root>
