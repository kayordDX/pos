<script lang="ts">
	import Error from "$lib/components/Error.svelte";
	import { createTableOrderOfficeOrderBasedBack } from "$lib/api";
	import { Badge, Card, Loader } from "@kayord/ui";
	import { getError } from "$lib/types";
	import Group from "../Group.svelte";

	const query = createTableOrderOfficeOrderBasedBack({ divisionIds: "1,3" });
	$: console.log($query.data);

	const getTime = (date: string) => {
		return new Date(date).toLocaleTimeString();
	};
</script>

<div class="m-2">
	{#if $query.isPending}
		<Loader />
	{/if}
	{#if $query.error}
		<Error message={getError($query.error).message} />
	{/if}
	{#if $query.data}
		<div class="flex justify-between mb-2">
			<div>
				<Badge>{$query.data.pendingOrders} pending order(s)</Badge>
				<Badge>{$query.data.pendingItems} pending items(s)</Badge>
			</div>
			<button on:click={() => $query.refetch()}>
				<Badge variant="secondary" class="truncate">
					Refreshed: {getTime($query.data.lastRefresh)}
				</Badge>
			</button>
		</div>

		<div class="flex flex-col gap-2">
			{#each $query.data?.orderGroups ?? [] as group}
				<Group {group} refetch={$query.refetch} />
			{/each}
		</div>
	{/if}
</div>
