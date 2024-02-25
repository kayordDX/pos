<script lang="ts">
	import { Badge, Tabs } from "@kayord/ui";
	import type { LayoutData } from "./[id]/$types";
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { HomeIcon, MenuIcon, ReceiptTextIcon, ShoppingBasketIcon } from "lucide-svelte";
	import { browser } from "$app/environment";
	// import { basket } from "$lib/stores/basket";

	export let data: LayoutData;
	$: basketCount = 0;

	$: getValue = () => {
		if ($page.route.id?.includes("menu")) return "menu";
		if ($page.route.id?.includes("bill")) return "bill";
		if ($page.route.id?.includes("basket")) return "basket";
		return "";
	};
</script>

<slot />
<div class="w-full flex mb-2 items-center justify-center fixed bottom-0">
	<Tabs.Root
		value={getValue()}
		onValueChange={(s) => {
			if (browser) {
				if (s == "menu") {
					goto(`/table/menu/${data.bookingId}`);
				} else if (s == "bill") {
					console.log("it matched the bill");
					goto(`/table/bill/${data.bookingId}`);
				} else if (s == "basket") {
					goto(`/table/basket/${data.bookingId}`);
				} else if (s == "tables") {
					goto("/waiter");
				}
			}
		}}
	>
		<Tabs.List>
			<Tabs.Trigger value="tables"><HomeIcon class="w-4 h-4" /></Tabs.Trigger>
			<Tabs.Trigger value="menu"><MenuIcon class="w-4 h-4 mr-2" /> Menu</Tabs.Trigger>
			<Tabs.Trigger value="basket">
				<ShoppingBasketIcon class="w-4 h-4 mr-2" /> Basket
				{#if basketCount > 0}
					<Badge class="ml-2">{basketCount}</Badge>
				{/if}
			</Tabs.Trigger>
			<Tabs.Trigger value="bill"><ReceiptTextIcon class="w-4 h-4 mr-2" /> Bill</Tabs.Trigger>
		</Tabs.List>
	</Tabs.Root>
</div>
