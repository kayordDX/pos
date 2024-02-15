<script lang="ts">
	import { Button, Card, Drawer } from "@kayord/ui";
	import Item from "./Item.svelte";
	import { BellElectricIcon } from "lucide-svelte";
	let open = false;
</script>

<Card.Root class="p-4">
	<div class="flex justify-between items-center">
		<div class="text-lg font-bold">Indoor, Table1</div>
		<div class="float-right">
			<Drawer.Root bind:open>
				<Drawer.Trigger
					><Button><BellElectricIcon class="mr-2 h-4 w-4" />Order Actions</Button></Drawer.Trigger
				>
				<Drawer.Content>
					<Drawer.Header>
						<Drawer.Title>#123</Drawer.Title>
						<Drawer.Description>Actions</Drawer.Description>
					</Drawer.Header>
					<Drawer.Footer>
						<Button>Ready</Button>
						<Button variant="destructive">Call Waiter</Button>
						<Drawer.Close>Cancel</Drawer.Close>
					</Drawer.Footer>
				</Drawer.Content>
			</Drawer.Root>
		</div>
	</div>
	<div># 123</div>

	<div class="flex flex-col gap-2 mt-2">
		<Item />
		<Item />
		<Item />
	</div>
</Card.Root>
