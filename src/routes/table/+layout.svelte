<script lang="ts">
	import type { LayoutData } from "./$types";
	import { page } from "$app/stores";
	import { HomeIcon, MenuIcon, ReceiptTextIcon, ShoppingBasketIcon } from "lucide-svelte";

	export let data: LayoutData;

	$: menuActive = $page.route.id?.includes("menu") ?? false;
	$: billActive = $page.route.id?.includes("bill") ?? false;
	$: basketActive = $page.route.id?.includes("basket") ?? false;
</script>

<slot />
<div class="w-full flex mb-2 items-center justify-center fixed bottom-0">
	<div class="bg-secondary flex items-center py-1 gap-2 rounded-sm px-2">
		<a class="flex items-center text-muted-foreground" href={`/waiter`}
			><HomeIcon class="w-4 h-4" />
		</a>
		<a
			class="flex items-center text-muted-foreground rounded-sm p-1 px-3"
			class:bg-black={menuActive}
			class:!text-foreground={menuActive}
			href={`/table/menu/${data.bookingId}`}
		>
			<MenuIcon class="w-4 h-4 mr-2" /> <span class="text-sm">Menu</span>
		</a>
		<a
			class="flex items-center text-muted-foreground rounded-sm p-1 px-3"
			class:bg-black={basketActive}
			class:!text-foreground={basketActive}
			href={`/table/basket/${data.bookingId}`}
		>
			<ShoppingBasketIcon class="w-4 h-4 mr-2" />
			<span class="text-sm">Basket</span>
		</a>
		<a
			class="flex items-center text-muted-foreground rounded-sm p-1 px-3"
			class:bg-black={billActive}
			class:!text-foreground={billActive}
			href={`/table/bill/${data.bookingId}`}
		>
			<ReceiptTextIcon class="w-4 h-4 mr-2" />
			<span class="text-sm">Bill</span>
		</a>
	</div>
</div>
