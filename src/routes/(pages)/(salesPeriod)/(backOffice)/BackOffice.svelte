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
	import Filter from "./Filter.svelte";

	interface Props {
		isHistory?: boolean;
		divisionIds?: string;
	}

	let { isHistory = false, divisionIds }: Props = $props();

	const query = $derived(
		createTableOrderOfficeOrderBasedBack(
			{
				divisionIds,
				complete: isHistory,
			},
			{ query: { refetchInterval: 40000 } }
		)
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

	let selectedDivisions = $state<string[]>(divisionIds?.split(",") ?? []);
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
			<div class="flex items-center gap-1 flex-wrap">
				<Filter
					title="Division"
					options={[
						{ label: "Kitchen", value: "3" },
						{ label: "Bar", value: "13" },
					]}
					{isHistory}
					bind:selected={selectedDivisions}
				/>
				{#if isHistory}
					<div class="flex items-center gap-1 flex-wrap">
						<a
							class="flex items-center gap-1"
							href={`/backOffice${divisionIds ? "/" + divisionIds : ""}`}
						>
							<Badge>Live View</Badge>
						</a>
					</div>
				{:else}
					<Badge class="sm:block hidden">{$query.data.pendingOrders} pending order(s)</Badge>
					<Badge class="sm:block hidden">{$query.data.pendingItems} pending items(s)</Badge>
				{/if}
			</div>
			<NotifyIndicator />
			<div class="flex gap-1 items-center">
				<div class="flex items-center gap-1 flex-wrap">
					{#if !isHistory}
						<a href={`/backOffice${divisionIds ? "/" + divisionIds : ""}/history`}>
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
		<Hub refetch={$query.refetch} {divisionIds} />

		<Masonry
			items={$query.data?.orderGroups ?? []}
			{minColWidth}
			{maxColWidth}
			{maxColHeight}
			{gap}
			idKey="orderGroupId"
		>
			{#snippet itemChild(item)}
				<Group group={item} refetch={$query.refetch} {isHistory} {divisionIds} />
			{/snippet}
		</Masonry>
	{/if}
</div>
