<script lang="ts">
	import {
		createBusinessGetOutlets,
		createDivisionGetAll,
		createMenuItemGetAll,
		createPrinterList,
		createStockGetAll,
		createUserUnassignedUsers,
		createUserUsers,
	} from "$lib/api";
	import { status } from "$lib/stores/status.svelte";
	import { stringToFDate } from "$lib/util";
	import { resolve } from "$app/paths";
	import { Alert, Button, Card } from "@kayord/ui";
	import { cn } from "@kayord/ui/utils";
	import type { Component } from "svelte";
	import {
		CalendarDaysIcon,
		ComponentIcon,
		LayoutDashboardIcon,
		NotebookTextIcon,
		PrinterIcon,
		UserRoundSearchIcon,
		UsersIcon,
		WarehouseIcon,
		WifiOffIcon,
	} from "@lucide/svelte";

	const printersQuery = createPrinterList(() => status.value.outletId);
	const usersQuery = createUserUsers(() => ({ page: 1, pageSize: 1 }));
	const unassignedQuery = createUserUnassignedUsers(() => ({ page: 1, pageSize: 1 }));
	const menuItemsQuery = createMenuItemGetAll(() => ({}));
	const divisionsQuery = createDivisionGetAll(() => ({ outletId: status.value.outletId }));
	const outletsQuery = createBusinessGetOutlets(() => status.value.outletId);
	const stockQuery = createStockGetAll(
		() => ({ page: 1, pageSize: 1, outletId: status.value.outletId }),
		() => ({ query: { enabled: () => status.hasFeature("stock") } })
	);

	const outlet = $derived(outletsQuery.data?.find((o) => o.id === status.value.outletId));
	const salesPeriod = $derived(status.value.salesPeriod);
	const showStock = $derived(status.hasFeature("stock"));

	const printers = $derived(printersQuery.data ?? []);
	const onlinePrinters = $derived(printers.filter((p) => p.isConnected).length);
	const offlinePrinters = $derived(printers.filter((p) => !p.isConnected));
	const printerSummary = $derived(printersQuery.isPending ? "…" : `${onlinePrinters}/${printers.length}`);
	const userCount = $derived(usersQuery.data?.totalCount ?? 0);
	const unassignedCount = $derived(unassignedQuery.data?.totalCount ?? 0);
	const menuItemCount = $derived(menuItemsQuery.data?.totalCount ?? 0);
	const divisionCount = $derived(divisionsQuery.data?.length ?? 0);
	const stockCount = $derived(stockQuery.data?.totalCount ?? 0);

	const attention = $derived.by(() => {
		const items: { id: string; icon: Component; title: string; description: string; href: string; action: string }[] = [];

		if (!salesPeriod) {
			items.push({
				id: "salesPeriod",
				icon: CalendarDaysIcon,
				title: "No active sales period",
				description: "Bills, cash ups and stats need an open sales period.",
				href: "/manager/salesPeriod",
				action: "Open",
			});
		}

		if (offlinePrinters.length > 0) {
			items.push({
				id: "printers",
				icon: WifiOffIcon,
				title: `${offlinePrinters.length} printer${offlinePrinters.length > 1 ? "s" : ""} offline`,
				description: offlinePrinters.map((p) => p.printerName).join(", "),
				href: "/manager/admin/printers",
				action: "Manage",
			});
		}

		if (unassignedCount > 0) {
			items.push({
				id: "unassigned",
				icon: UserRoundSearchIcon,
				title: `${unassignedCount} unassigned user${unassignedCount > 1 ? "s" : ""}`,
				description: "Users without an outlet role cannot use the POS.",
				href: "/manager/admin/users/unassigned",
				action: "Assign",
			});
		}

		return items;
	});
</script>

{#snippet tile(href: string, label: string, value: string, hint: string, Icon: Component, warning = false)}
	<a href={resolve(href as "/")} class="group h-full">
		<Card.Root class={cn("group-hover:bg-accent h-full transition-colors", warning && "border-destructive/50")}>
			<Card.Content class="flex items-center justify-between gap-2">
				<div class="flex min-w-0 flex-col gap-0.5">
					<span class="text-muted-foreground truncate text-sm">{label}</span>
					<span class={cn("text-2xl font-bold", warning && "text-destructive")}>{value}</span>
					<span class="text-muted-foreground truncate text-xs">{hint}</span>
				</div>
				<Icon class="text-muted-foreground size-5 shrink-0" />
			</Card.Content>
		</Card.Root>
	</a>
{/snippet}

<h2 class="m-2">Overview</h2>

<div class="m-2 flex flex-col gap-2">
	<Card.Root>
		<Card.Header>
			<LayoutDashboardIcon class="text-muted-foreground size-5" />
			<div class="flex flex-col gap-0.5">
				<Card.Title>{outlet?.displayName ?? "Outlet"}</Card.Title>
				<Card.Description>
					{#if salesPeriod}
						Sales period {salesPeriod.name} opened {stringToFDate(salesPeriod.startDate)}
					{:else}
						No active sales period
					{/if}
				</Card.Description>
			</div>
		</Card.Header>
	</Card.Root>

	<div class="grid grid-cols-2 gap-2 sm:grid-cols-3">
		{@render tile("/manager/admin/users", "Users", userCount.toString(), "Assigned to outlet", UsersIcon)}
		{@render tile("/manager/admin/users/unassigned", "Unassigned Users", unassignedCount.toString(), "Need a role", UserRoundSearchIcon, unassignedCount > 0)}
		{@render tile("/manager/admin/menuItems", "Menu Items", menuItemCount.toString(), "Across all menus", NotebookTextIcon)}
		{@render tile("/manager/admin/divisions", "Divisions", divisionCount.toString(), "Service areas", ComponentIcon)}
		{@render tile("/manager/admin/printers", "Printers", printerSummary, "Online / total", PrinterIcon, offlinePrinters.length > 0)}
		{#if showStock}
			{@render tile("/manager/admin/stock", "Stock Items", stockCount.toString(), "Stocked items", WarehouseIcon)}
		{/if}
	</div>

	{#if attention.length > 0}
		<Card.Root>
			<Card.Header>
				<Card.Title>Needs attention</Card.Title>
				<Card.Description>Something may require your action</Card.Description>
			</Card.Header>
			<Card.Content class="flex flex-col gap-2">
				{#each attention as item (item.id)}
					<Alert.Root variant="destructive">
						<item.icon class="size-4" />
						<Alert.Title>{item.title}</Alert.Title>
						<Alert.Description>{item.description}</Alert.Description>
						<Alert.Action>
							<Button href={item.href} variant="outline" size="sm">
								{item.action}
							</Button>
						</Alert.Action>
					</Alert.Root>
				{/each}
			</Card.Content>
		</Card.Root>
	{/if}
</div>
