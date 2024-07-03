<script lang="ts">
	import { type CashUpUserGetResponse } from "$lib/api";
	import { getInitials } from "$lib/util";
	import { Avatar, Button, Card } from "@kayord/ui";
	import { ReceiptTextIcon, WalletCardsIcon } from "lucide-svelte";

	let { cash }: { cash: CashUpUserGetResponse } = $props();
</script>

<Card.Root class="overflow-hidden w-full">
	<Card.Header class="flex flex-col items-start bg-muted/50 p-4">
		<div class="flex items-center gap-2 justify-between w-full">
			<div class="flex items-center gap-2">
				<Avatar.Root>
					<Avatar.Image src={cash.user?.image} alt="profile" />
					<Avatar.Fallback class="bg-primary text-primary-foreground">
						{getInitials(cash.user?.name ?? "")}
					</Avatar.Fallback>
				</Avatar.Root>
				<div>
					<Card.Title>{cash.user.name}</Card.Title>
					<Card.Description>{cash.user.email}</Card.Description>
				</div>
			</div>
			<div class="flex gap-2 items-center">
				<Button variant="outline" href={`/manager/history/user/${cash.userId}`}>
					<ReceiptTextIcon class="size-5 mr-2" /> Bills
				</Button>
				<Button href={`/manager/cashUp/${cash.userId}`}>
					<WalletCardsIcon class="size-5 mr-2" /> Cash Up
				</Button>
			</div>
		</div>
	</Card.Header>
	<Card.Content>
		<div class="grid gap-3 mt-3">
			<ul class="grid gap-3">
				<li class="flex items-center justify-between">
					<span class="text-muted-foreground">Sales</span>
					<span>R{cash.sales.toFixed(2)}</span>
				</li>
				<li class="flex items-center justify-between">
					<span class="text-muted-foreground">Total Payments</span>
					<span>R{cash.totalPayments.toFixed(2)}</span>
				</li>
				<li class="flex items-center justify-between">
					<span class="text-muted-foreground">Tips</span>
					<span>R{cash.tips.toFixed(2)}</span>
				</li>
			</ul>
		</div>
	</Card.Content>
</Card.Root>
