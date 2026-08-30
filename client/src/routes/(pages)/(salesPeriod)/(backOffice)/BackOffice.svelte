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
	import { status } from "$lib/stores/status.svelte";
	import { untrack } from "svelte";
	import { resolve } from "$app/paths";

	interface Props {
		isHistory?: boolean;
		divisionIds?: string;
	}

	let { isHistory = false, divisionIds }: Props = $props();

	const query = createTableOrderOfficeOrderBasedBack(
		() => ({
			divisionIds,
			complete: isHistory,
		}),
		() => ({ query: { refetchInterval: 40000 } })
	);

	const getTime = (date: string) => {
		return new Date(date).toLocaleTimeString();
	};

	const maxColHeight = $derived(backOffice.value.itemHeight ?? 500);

	let [minColWidth, maxColWidth, gap] = [500, 600, 10];
	let screenWidth = $state(0);

	let selectedDivisions = $state<string[]>(untrack(() => divisionIds?.split(",") ?? []));
</script>

<div class="m-1" bind:clientWidth={screenWidth}>
	{#if query.isPending}
		<Loader />
	{/if}
	{#if query.error}
		<Error message={getError(query.error).message} />
	{/if}
	{#if query.data}
		<div class="mb-2 flex items-center justify-between">
			<div class="flex flex-wrap items-center gap-1">
				<Filter
					title="Division"
					options={status.value.divisions.map((x) => {
						return { label: x.name, value: x.id.toString() };
					})}
					{isHistory}
					bind:selected={selectedDivisions}
				/>
				{#if isHistory}
					<div class="flex flex-wrap items-center gap-1">
						<a class="flex items-center gap-1" href={resolve(`/backOffice${divisionIds ? "/" + divisionIds : ""}`)}>
							<Badge>Live View</Badge>
						</a>
					</div>
				{:else}
					<Badge class="hidden sm:block">{query.data.pendingOrders} pending order(s)</Badge>
					<Badge class="hidden sm:block">{query.data.pendingItems} pending items(s)</Badge>
				{/if}
			</div>
			<NotifyIndicator />
			<div class="flex items-center gap-1">
				<div class="flex flex-wrap items-center gap-1">
					{#if !isHistory}
						<a href={resolve(`/backOffice${divisionIds ? "/" + divisionIds : ""}/history`)}>
							<Badge variant="secondary" class="truncate">History</Badge>
						</a>
					{/if}
					<button onclick={() => query.refetch()}>
						<Badge variant="secondary" class="truncate">
							Refreshed: {getTime(query.data.lastRefresh)}
						</Badge>
					</button>
				</div>
				<Settings />
				<ToggleHeader />
			</div>
		</div>
		<Hub refetch={query.refetch} {divisionIds} />

		<Masonry items={query.data?.orderGroups ?? []} {minColWidth} {maxColWidth} {maxColHeight} {gap} idKey="orderGroupId">
			{#snippet itemChild(item)}
				<Group group={item} refetch={query.refetch} {isHistory} {divisionIds} />
			{/snippet}
		</Masonry>
	{/if}
</div>
