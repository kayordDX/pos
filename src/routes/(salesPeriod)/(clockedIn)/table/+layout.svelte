<script lang="ts">
	import { page } from "$app/stores";
	import { HomeIcon, MenuIcon, ReceiptTextIcon, ShoppingBasketIcon } from "lucide-svelte";
	import { createTableBookingGet } from "$lib/api";
	import { Header } from "$lib/components/Header";

	$: menuActive = $page.route.id?.includes("menu") ?? false;
	$: billActive = $page.route.id?.includes("bill") ?? false;
	$: basketActive = $page.route.id?.includes("basket") ?? false;

	let id = Number($page.params.id ?? "0");

	let query = createTableBookingGet(id, {
		query: { enabled: id > 0 },
	});

	const loadBookingDetails = () => {
		query = createTableBookingGet(id, {
			query: { enabled: id > 0 },
		});
	};

	$: id > 0 && loadBookingDetails();
</script>

<Header>
	<div class="flex mt-1 justify-center">
		<div
			class="flex items-center gap-1 bg-secondary/60 text-secondary-foreground py-1 px-4 rounded-sm"
		>
			<span class="line-clamp-1">{$query.data?.table.name}</span>
			<span class="text-muted-foreground text-sm line-clamp-1"
				>{$query.data?.table.section?.name}</span
			>
			<span class="text-sm line-clamp-1">({$query.data?.bookingName})</span>
		</div>
	</div>
</Header>
<slot />
<div class="w-full flex mb-2 items-center justify-center fixed bottom-0">
	<div class="bg-secondary flex items-center py-1 gap-2 rounded-sm px-2">
		<a class="flex items-center text-muted-foreground" href={`/waiter`}
			><HomeIcon class="w-4 h-4" />
		</a>
		<a
			class="flex items-center text-muted-foreground rounded-sm p-1 px-3"
			class:bg-background={menuActive}
			class:!text-foreground={menuActive}
			href={`/table/menu/${$page.params.id}`}
		>
			<MenuIcon class="w-4 h-4 mr-2" /> <span class="text-sm">Menu</span>
		</a>
		<a
			class="flex items-center text-muted-foreground rounded-sm p-1 px-3"
			class:bg-background={basketActive}
			class:!text-foreground={basketActive}
			href={`/table/basket/${$page.params.id}`}
		>
			<ShoppingBasketIcon class="w-4 h-4 mr-2" />
			<span class="text-sm">Basket</span>
		</a>
		<a
			class="flex items-center text-muted-foreground rounded-sm p-1 px-3"
			class:bg-background={billActive}
			class:!text-foreground={billActive}
			href={`/table/bill/${$page.params.id}`}
		>
			<ReceiptTextIcon class="w-4 h-4 mr-2" />
			<span class="text-sm">Bill</span>
		</a>
	</div>
</div>
