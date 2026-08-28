<script lang="ts">
	import { page } from "$app/state";
	import { HouseIcon, MenuIcon, ReceiptTextIcon, ShoppingBasketIcon } from "@lucide/svelte";
	import { createTableBookingGet } from "$lib/api";
	import { Header } from "$lib/components/Header";
	import type { Snippet } from "svelte";
	import { resolve } from "$app/paths";
	let { children }: { children?: Snippet } = $props();

	const menuActive = $derived(page.route.id?.includes("menu") ?? false);
	const billActive = $derived(page.route.id?.includes("bill") ?? false);
	const basketActive = $derived(page.route.id?.includes("basket") ?? false);

	let id = $derived(Number(page.params.id ?? "0"));

	const query = createTableBookingGet(
		() => id,
		() => ({
			query: { enabled: id > 0 },
		})
	);
</script>

<Header>
	<div class="mt-1 flex justify-center">
		<div class="bg-secondary/60 text-secondary-foreground flex items-center gap-1 rounded-sm px-4 py-1">
			<span class="line-clamp-1">{query.data?.table.name}</span>
			<span class="text-muted-foreground line-clamp-1 text-sm">{query.data?.table.section?.name}</span>
			<span class="line-clamp-1 text-sm">({query.data?.bookingName})</span>
		</div>
	</div>
</Header>
{#if children}
	{@render children()}
{/if}
<div class="fixed bottom-0 mb-2 flex w-full items-center justify-center">
	<div class="bg-secondary flex items-center gap-2 rounded-md px-2 py-1">
		<a class="text-muted-foreground flex items-center" href={resolve("/waiter")}><HouseIcon class="h-4 w-4" /> </a>
		<a
			class="text-muted-foreground flex items-center rounded-sm p-1 px-3"
			class:bg-background={menuActive}
			class:!text-foreground={menuActive}
			href={resolve(`/table/menu/${page.params.id}`)}
		>
			<MenuIcon class="mr-2 h-4 w-4" /> <span class="text-sm">Menu</span>
		</a>
		<a
			class="text-muted-foreground flex items-center rounded-sm p-1 px-3"
			class:bg-background={basketActive}
			class:!text-foreground={basketActive}
			href={resolve(`/table/basket/${page.params.id}`)}
		>
			<ShoppingBasketIcon class="mr-2 h-4 w-4" />
			<span class="text-sm">Basket</span>
		</a>
		<a
			class="text-muted-foreground flex items-center rounded-sm p-1 px-3"
			class:bg-background={billActive}
			class:!text-foreground={billActive}
			href={resolve(`/table/bill/${page.params.id}`)}
		>
			<ReceiptTextIcon class="mr-2 h-4 w-4" />
			<span class="text-sm">Bill</span>
		</a>
	</div>
</div>
