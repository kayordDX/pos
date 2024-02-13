<script lang="ts">
	import Header from "$lib/components/Header/Header.svelte";
	import { Card } from "@kayord/ui";
	import { ShoppingBasketIcon } from "lucide-svelte";
</script>

<div class="flex justify-center">
	<Card.Root>
		<Card.Header>
			<Card.Title>No items</Card.Title>
			<Card.Description>Add items from menu to basket</Card.Description>
		</Card.Header>
		<Card.Content class="flex justify-center">
			<ShoppingBasketIcon class="w-20 h-20" />
		</Card.Content>
	</Card.Root>
</div>
