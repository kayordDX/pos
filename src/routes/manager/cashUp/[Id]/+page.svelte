<script lang="ts">
	import { page } from "$app/stores";
	import { createCashUpUserDetail } from "$lib/api";
	import { status } from "$lib/stores/status";
	import { getError } from "$lib/types";
	import Error from "$lib/components/Error.svelte";
	import { Avatar, Card, Loader } from "@kayord/ui";
	import { getInitials } from "$lib/util";
	import CashUpItem from "./CashUpItem.svelte";
	import AddItem from "./AddItem.svelte";

	const query = createCashUpUserDetail($page.params.Id ?? "", $status.outletId, {
		salesPeriodId: $status.salesPeriodId,
	});
</script>

<div class="m-2">
	{#if $query.isPending}
		<Loader />
	{/if}
	{#if $query.error}
		<Error message={getError($query.error).message} />
	{/if}

	{#if $query.data}
		<Card.Root class="overflow-hidden w-full">
			<Card.Header class="flex flex-col items-start bg-muted/50 p-4">
				<div class="flex items-center gap-2 justify-between w-full">
					<div class="flex items-center gap-2">
						<Avatar.Root>
							<Avatar.Image src={$query.data.user?.image} alt="profile" />
							<Avatar.Fallback class="bg-primary text-primary-foreground">
								{getInitials($query.data.user?.name ?? "")}
							</Avatar.Fallback>
						</Avatar.Root>
						<div>
							<Card.Title>{$query.data.user.name}</Card.Title>
							<Card.Description>{$query.data.user.email}</Card.Description>
						</div>
					</div>
				</div>
			</Card.Header>
			<Card.Content>
				<div class="flex flex-col gap-2 items-center mt-5">
					{#each $query.data.cashUpUserItems as item}
						<CashUpItem {item} refetch={$query.refetch} />
					{/each}
				</div>
				<AddItem refetch={$query.refetch} cashUpUserId={$query.data.cashUpUserId} />
			</Card.Content>
		</Card.Root>
	{/if}
</div>
