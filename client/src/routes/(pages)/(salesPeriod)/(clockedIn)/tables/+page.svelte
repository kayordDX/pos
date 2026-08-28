<script lang="ts">
	import Error from "$lib/components/Error.svelte";

	import { createTableGetBooked } from "$lib/api";

	import { Card, Loader, Badge, Avatar } from "@kayord/ui";
	import { getError } from "$lib/types";
	import { status } from "$lib/stores/status.svelte";
	import { getInitials } from "$lib/util";
	import TransferTable from "./TransferTable.svelte";

	const query = createTableGetBooked(() => ({
		myBooking: false,
		outletId: status.value?.outletId ?? 0,
	}));
</script>

<div class="m-8">
	{#if query.isPending}
		<Loader />
	{/if}
	{#if query.error}
		<Error message={getError(query.error).message} />
	{/if}
	{#if query.isSuccess}
		{#if query.data.length > 0}
			<h1>Other Tables</h1>
			<p class="text-muted-foreground">Tables assigned to other waiters</p>
			<div class="mt-4 flex w-full flex-wrap gap-4">
				{#each query.data as otherTable (otherTable.id)}
					<a href={`/table/menu/${otherTable.id}`} class="w-full">
						<Card.Root class="w-full gap-1 p-5">
							<div class="line-clamp-1 flex items-center justify-between gap-2">
								<h3>{otherTable.table.name}</h3>
								<Badge>{otherTable.table.section.name}</Badge>
							</div>

							<div class="mt-2 flex w-full items-center gap-2">
								<Avatar.Root>
									<Avatar.Image src={otherTable.user.image} alt="profile" />
									<Avatar.Fallback class="bg-primary text-primary-foreground">
										{getInitials(otherTable.user.name ?? "")}
									</Avatar.Fallback>
								</Avatar.Root>
								<div class="w-full">
									<div>{otherTable.user.name}</div>
									<p class="text-xs">{otherTable.bookingName}</p>
								</div>
								<TransferTable {otherTable} refetch={query.refetch} />
							</div>
						</Card.Root>
					</a>
				{/each}
			</div>
		{:else}
			<div class="flex items-center justify-center">
				<Card.Root class="w-full max-w-md">
					<Card.Header class="pb-6">
						<Card.Title>Booked Tables</Card.Title>
						<Card.Description>There are no tables booked by other users</Card.Description>
					</Card.Header>
				</Card.Root>
			</div>
		{/if}
	{/if}
</div>
