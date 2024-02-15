<script lang="ts">
	import { Badge, Button, Card, Drawer } from "@kayord/ui";
	import { ConciergeBellIcon } from "lucide-svelte";
	let open = false;
</script>

<Card.Root class="p-2 ">
	<div class="flex justify-between items-center">
		<div>
			1 Waffles
			<div class="text-muted-foreground">Sub Option</div>
			<div class="text-muted-foreground">Sub Option</div>
			<Badge>6 min</Badge>
		</div>
		<Drawer.Root bind:open>
			<Drawer.Trigger>
				<Button><ConciergeBellIcon class="h-4 w-4 mr-2" />Action</Button>
			</Drawer.Trigger>
			<Drawer.Content>
				<Drawer.Header>
					<Drawer.Title>Item Actions</Drawer.Title>
					<Drawer.Description>1 Waffles</Drawer.Description>
				</Drawer.Header>
				<Drawer.Footer>
					<Button>Ready</Button>
					<Drawer.Close>Cancel</Drawer.Close>
				</Drawer.Footer>
			</Drawer.Content>
		</Drawer.Root>
	</div>
</Card.Root>
