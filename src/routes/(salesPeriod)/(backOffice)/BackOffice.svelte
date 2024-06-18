<script lang="ts">
	import Error from "$lib/components/Error.svelte";
	import { createTableOrderOfficeOrderBasedBack } from "$lib/api";
	import { Badge, Loader } from "@kayord/ui";
	import { getError } from "$lib/types";
	import Group from "./Group.svelte";
	import ToggleHeader from "./ToggleHeader.svelte";
	import Settings from "./Settings.svelte";
	import { Masonry } from "$lib/components/Masonry";
	import { backOffice } from "$lib/stores/backOffice";

	interface Props {
		isHistory?: boolean;
		type?: "kitchen" | "backOffice" | "bar";
		divisionIds?: string;
	}

	let { isHistory = false, type = "kitchen", divisionIds }: Props = $props();

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

	const maxColHeight = $derived($backOffice ?? 500);

	let [minColWidth, maxColWidth, gap] = [500, 600, 10];
	let screenWidth = $state(0);
	const calcCols = $derived(
		Math.min(screenWidth, Math.floor((screenWidth + gap) / (minColWidth + gap)) || 1)
	);

	$effect(() => {
		console.log(calcCols);
	});
</script>

<div class="m-1" bind:clientWidth={screenWidth}>
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
					<button onclick={() => $query.refetch()}>
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
			{maxColHeight}
			{gap}
			idKey="orderGroupId"
		>
			{#snippet itemChild(item)}
				<Group group={item} refetch={$query.refetch} {isHistory} />
			{/snippet}
		</Masonry>
	{/if}
</div>
