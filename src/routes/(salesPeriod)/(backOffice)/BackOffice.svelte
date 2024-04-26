<script lang="ts">
	import Error from "$lib/components/Error.svelte";
	import { createTableOrderOfficeOrderBasedBack } from "$lib/api";
	import { Badge, Loader } from "@kayord/ui";
	import { getError } from "$lib/types";
	import Group from "./Group.svelte";
	import { Masonry } from "svelte-bricks";
	import ToggleHeader from "./ToggleHeader.svelte";
	import Settings from "./Settings.svelte";

	export let isHistory = false;
	export let type: "kitchen" | "backOffice" | "bar" = "kitchen";
	export let divisionIds: string | undefined = undefined;

	const query = createTableOrderOfficeOrderBasedBack(
		{
			divisionIds: divisionIds,
			complete: isHistory,
		},
		{ query: { refetchInterval: 20000 } }
	);

	const getTime = (date: string) => {
		return new Date(date).toLocaleTimeString();
	};

	const capitalizeFirstLetter = (string: string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

	let [minColWidth, maxColWidth, gap] = [500, 600, 10];
</script>

<div class="m-1">
	{#if $query.isPending}
		<Loader />
	{/if}
	{#if $query.error}
		<Error message={getError($query.error).message} />
	{/if}
	{#if $query.data}
		<div class="flex justify-between mb-2 items-center">
			<div>
				{#if isHistory}
					<div>
						<a href={`/${type}`}><Badge>{capitalizeFirstLetter(type)}</Badge></a>
					</div>
				{:else}
					<Badge>{$query.data.pendingOrders} pending order(s)</Badge>
					<Badge>{$query.data.pendingItems} pending items(s)</Badge>
				{/if}
			</div>
			<div class="flex gap-1 items-center">
				<div>
					{#if !isHistory}
						<a href={`/${type}/history`}>
							<Badge variant="secondary" class="truncate">History</Badge>
						</a>
					{/if}
					<button on:click={() => $query.refetch()}>
						<Badge variant="secondary" class="truncate">
							Refreshed: {getTime($query.data.lastRefresh)}
						</Badge>
					</button>
				</div>
				<Settings />
				<ToggleHeader />
			</div>
		</div>

		<Masonry
			items={$query.data?.orderGroups ?? []}
			{minColWidth}
			{maxColWidth}
			{gap}
			let:item={group}
			idKey="orderGroupId"
			animate
		>
			<Group {group} refetch={$query.refetch} {isHistory} />
		</Masonry>
	{/if}
</div>
