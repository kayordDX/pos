<script lang="ts">
	import Error from "$lib/components/Error.svelte";
	import { createTableOrderOfficeOrderBasedBack } from "$lib/api";
	import { Badge, Loader } from "@kayord/ui";
	import { getError } from "$lib/types";
	import Group from "./Group.svelte";
	import ToggleHeader from "./ToggleHeader.svelte";
	import Settings from "./Settings.svelte";
	import { Masonry } from "$lib/components/Masonry";
	import { backOffice } from "$lib/stores/backOffice.svelte";
	import NotifyIndicator from "./NotifyIndicator.svelte";
	import Hub from "./Hub.svelte";

	interface Props {
		isHistory?: boolean;
		roleIds?: string;
	}

	let { isHistory = false, roleIds }: Props = $props();

	const query = createTableOrderOfficeOrderBasedBack(
		{
			roleIds,
			complete: isHistory,
		},
		{ query: { refetchInterval: 40000 } }
	);

	const getTime = (date: string) => {
		return new Date(date).toLocaleTimeString();
	};

	const capitalizeFirstLetter = (string: string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

	const maxColHeight = $derived(backOffice.value.itemHeight ?? 500);

	let [minColWidth, maxColWidth, gap] = [500, 600, 10];
	let screenWidth = $state(0);
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
						<a href={`/backOffice${roleIds ? "/" + roleIds : ""}`}><Badge>Live View</Badge></a>
					</div>
				{:else}
					<Badge>{$query.data.pendingOrders} pending order(s)</Badge>
					<Badge>{$query.data.pendingItems} pending items(s)</Badge>
				{/if}
			</div>
			<NotifyIndicator />
			<div class="flex gap-1 items-center">
				<div>
					{#if !isHistory}
						<a href={`/backOffice${roleIds ? "/" + roleIds : ""}/history`}>
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
		<Hub refetch={$query.refetch} {roleIds} />

		<Masonry
			items={$query.data?.orderGroups ?? []}
			{minColWidth}
			{maxColWidth}
			{maxColHeight}
			{gap}
			idKey="orderGroupId"
		>
			{#snippet itemChild(item)}
				<Group group={item} refetch={$query.refetch} {isHistory} {roleIds} />
			{/snippet}
		</Masonry>
	{/if}
</div>
