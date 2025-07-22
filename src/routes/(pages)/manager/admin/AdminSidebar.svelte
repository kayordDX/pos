<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/state";
	import { info } from "$lib/stores/info.svelte";
	import { status } from "$lib/stores/status.svelte";
	import { Collapsible, Sidebar } from "@kayord/ui";
	const sidebar = Sidebar.useSidebar();

	import {
		PrinterIcon,
		MessageCircleIcon,
		UserRoundSearchIcon,
		UsersIcon,
		NfcIcon,
		SquareMenuIcon,
		Plus,
		Minus,
		BookCopyIcon,
		CirclePlusIcon,
		ToggleRightIcon,
		NotebookTextIcon,
		BookDownIcon,
		BookOpenTextIcon,
		WarehouseIcon,
		StoreIcon,
		ShieldUserIcon,
		ComponentIcon,
		PackageOpenIcon,
		LayoutTemplateIcon,
		BuildingIcon,
		DiffIcon,
		ChartBarStackedIcon,
		BlindsIcon,
		ChartLineIcon,
		BanknoteArrowUp,
		CreditCardIcon,
	} from "@lucide/svelte";

	const menuItems = [
		{
			title: "Printers",
			href: "/manager/admin",
			icon: PrinterIcon,
		},
		{
			title: "Users",
			href: "",
			icon: BookOpenTextIcon,
			items: [
				{
					title: "Current Users",
					href: "/manager/admin/users",
					icon: UsersIcon,
				},
				{
					title: "Unassigned Users",
					href: "/manager/admin/users/unassigned",
					icon: UserRoundSearchIcon,
				},
				{
					title: "Roles",
					href: "/manager/admin/users/roles",
					icon: ShieldUserIcon,
				},
			],
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
			title: "Outlet",
			href: "",
			icon: BuildingIcon,
			items: [
				{
					title: "Sections",
					href: "/manager/admin/sections",
					icon: LayoutTemplateIcon,
				},
				{
					title: "Adjustment Types",
					href: "/manager/admin/adjustmentTypes",
					icon: DiffIcon,
				},
				{
					title: "Divisions",
					href: "/manager/admin/divisions",
					icon: ComponentIcon,
				},
				{
					title: "Roles",
					href: "/manager/admin/roles",
					icon: BlindsIcon,
				},
			],
		},
		{
			title: "Menu",
			href: "",
			icon: BookCopyIcon,
			items: [
				{
					title: "Menu Items",
					href: "/manager/admin/menuItems",
					icon: NotebookTextIcon,
				},
				{
					title: "Menus",
					href: "/manager/admin/menus",
					icon: SquareMenuIcon,
				},
				{
					title: "Extras",
					href: "/manager/admin/extras",
					icon: CirclePlusIcon,
				},
				{
					title: "Options",
					href: "/manager/admin/options",
					icon: ToggleRightIcon,
				},
				{
					title: "Bill Categories",
					href: "/manager/admin/billcategory",
					icon: ChartBarStackedIcon,
				},
			],
		},
		{
			title: "Stock",
			href: "",
			icon: BookOpenTextIcon,
			feature: "stock",
			items: [
				{
					title: "Stock Items",
					href: "/manager/admin/stock",
					icon: WarehouseIcon,
				},
				{
					title: "Orders",
					href: "/manager/admin/stock/orders",
					icon: BookDownIcon,
				},
				{
					title: "Suppliers",
					href: "/manager/admin/suppliers",
					icon: StoreIcon,
				},
				{
					title: "Allocate",
					href: "/manager/admin/stock/allocate",
					icon: PackageOpenIcon,
				},
				{
					title: "Stock Categories",
					href: "/manager/admin/stockCategory",
					icon: ChartBarStackedIcon,
				},
			],
		},
		{
			title: "Stats",
			href: "",
			icon: ChartLineIcon,
			items: [
				{
					title: "Cashup",
					href: "/manager/admin/stats/cashUp",
					icon: BanknoteArrowUp,
				},
				{
					title: "Payment Types",
					href: "/manager/admin/stats/paymentTypes",
					icon: CreditCardIcon,
				},
			],
		},
	];

	let activeItem = $derived.by(() => {
		const routeId = page.route.id?.replaceAll("/[Id]", "");
		for (const item of menuItems) {
			for (const subItem of item.items ?? []) {
				if (routeId?.endsWith(subItem.href)) {
					return subItem;
				}
			}
			if (item.href.length > 0 && routeId?.endsWith(item.href)) {
				return item;
			}
		}
		return;
	});
</script>

<Sidebar.Root>
	<Sidebar.Header class="bg-secondary h-14 flex items-center justify-center">
		<Sidebar.Menu>
			<Sidebar.MenuItem class="flex items-center justify-start">
				<button class="flex items-center rounded-full" onclick={() => goto("/")}>
					<img
						src={`${info.isKayord() ? "/kayord" : ""}/logo.svg`}
						alt="kayord-logo"
						class="h-10"
					/>
					<span class="hidden md:block font-bold text-lg">
						{info.isKayord() ? "kayord" : "aviate"}
					</span>
				</button>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>
	<Sidebar.Content class="bg-background">
		<Sidebar.Group />
		<Sidebar.GroupContent>
			<Sidebar.Menu class="px-2">
				{#each menuItems as item (item.title)}
					{#if !item.feature || status.hasFeature(item.feature)}
						{#if (item.items?.length ?? 0) > 0}
							<Collapsible.Root class="group/collapsible">
								<Sidebar.MenuItem>
									<Collapsible.Trigger class="w-full flex items-center justify-between">
										<Sidebar.MenuButton>
											{#if item.icon}
												<item.icon class="!size-5" />
											{/if}
											{item.title}
											<Plus class="ml-auto group-data-[state=open]/collapsible:hidden" />
											<Minus class="ml-auto group-data-[state=closed]/collapsible:hidden" />
										</Sidebar.MenuButton>
									</Collapsible.Trigger>
									{#if item.items?.length}
										<Collapsible.Content>
											<Sidebar.MenuSub>
												{#each item.items as subItem (subItem.title)}
													<Sidebar.MenuSubItem>
														<Sidebar.MenuSubButton
															class="data-[active=true]:bg-primary data-[active=true]:text-primary-foreground rounded-sm cursor-pointer"
															onclick={() => {
																goto(subItem.href);
																if (sidebar.isMobile) {
																	sidebar.setOpenMobile(false);
																}
															}}
															isActive={activeItem?.title === subItem.title}
														>
															{#if subItem.icon}
																<subItem.icon
																	class={`!size-5 ${activeItem?.title === subItem.title ? "stroke-primary-foreground" : ""}`}
																/>
															{/if}
															<span>{subItem.title}</span>
														</Sidebar.MenuSubButton>
													</Sidebar.MenuSubItem>
												{/each}
											</Sidebar.MenuSub>
										</Collapsible.Content>
									{/if}
								</Sidebar.MenuItem>
							</Collapsible.Root>
						{:else}
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
									{#if item.icon}
										<item.icon class="!size-5" />
									{/if}
									<span>{item.title}</span>
								</Sidebar.MenuButton>
							</Sidebar.MenuItem>
						{/if}
					{/if}
				{/each}
			</Sidebar.Menu>
		</Sidebar.GroupContent>
		<Sidebar.Group />
	</Sidebar.Content>
	<Sidebar.Footer class="bg-secondary text-sm text-muted-foreground">
		Powered by Kayord
	</Sidebar.Footer>
</Sidebar.Root>
