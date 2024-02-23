<script lang="ts">
	import type { TableOrderGetBillResponse } from "$lib/api";
	import { Avatar, Button, Card, Drawer } from "@kayord/ui";
	import { BellElectricIcon } from "lucide-svelte";

	export let data: TableOrderGetBillResponse;
	export let bookingId: number;
</script>

{#each data.orderItems as order}
	<Card.Root class="p-4">
		<div class="flex justify-between items-center">
			<div class="flex items-center gap-2">
				<div>
					<div class="text-lg font-bold">
						{bookingId}
						<span class="text-muted-foreground text-sm">({bookingId})</span>
					</div>
					<div># {bookingId}</div>
				</div>
			</div>
			<div class="float-right">
				<Drawer.Root>
					<Drawer.Trigger>
						<Button><BellElectricIcon class="mr-2 h-4 w-4" />Order Actions</Button>
					</Drawer.Trigger>
					<Drawer.Content>
						<Drawer.Header>
							<Drawer.Title># {bookingId}</Drawer.Title>
							<Drawer.Description>Table Actions</Drawer.Description>
						</Drawer.Header>
						<Drawer.Footer>
							<Drawer.Close>
								<Button class="w-full" on:click={() => (open = false)}>Ready All</Button>
							</Drawer.Close>
							<Drawer.Close>
								<Button class="w-full" variant="destructive">Call Waiter</Button>
							</Drawer.Close>
						</Drawer.Footer>
					</Drawer.Content>
				</Drawer.Root>
			</div>
		</div>
	</Card.Root>
{/each}
