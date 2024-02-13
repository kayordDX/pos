<script lang="ts">
	import { Badge, Tabs } from "@kayord/ui";
	import type { LayoutData } from "./$types";
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { HomeIcon, MenuIcon, ReceiptTextIcon, ShoppingBasketIcon } from "lucide-svelte";

	export let data: LayoutData;
</script>

<slot />
<div class="w-full flex m-2 items-center justify-center fixed bottom-0">
	<Tabs.Root
		value={$page.route.id?.includes("menu") ? "menu" : "bill"}
		onValueChange={(s) => {
			if (s == "menu") {
				goto(`/table/${data.bookingId}/menu`);
			} else if (s == "bill") {
				goto(`/table/${data.bookingId}`);
			} else if (s == "basket") {
				goto(`/table/${data.bookingId}/basket`);
			} else {
				goto("/waiter");
			}
		}}
	>
		<Tabs.List>
			<Tabs.Trigger value="tables"><HomeIcon class="w-4 h-4 mr-2" /> Tables</Tabs.Trigger>
			<Tabs.Trigger value="menu"><MenuIcon class="w-4 h-4 mr-2" /> Menu</Tabs.Trigger>
			<Tabs.Trigger value="bill"><ReceiptTextIcon class="w-4 h-4 mr-2" /> Bill</Tabs.Trigger>
			<Tabs.Trigger value="basket">
				<ShoppingBasketIcon class="w-4 h-4 mr-2" /> Basket
				<Badge class="ml-2">0</Badge>
			</Tabs.Trigger>
		</Tabs.List>
	</Tabs.Root>
</div>
