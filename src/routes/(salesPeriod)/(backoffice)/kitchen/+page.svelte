<script lang="ts">
	import Error from "$lib/components/Error.svelte";
	import { createTableOrderOfficeOrderBasedBack } from "$lib/api";
	import { Badge, Loader } from "@kayord/ui";
	import { getError } from "$lib/types";
	import Group from "../Group.svelte";
	import { Masonry } from "svelte-bricks";
	import { header } from "$lib/stores/header";
	import { Maximize2Icon, Minimize2Icon } from "lucide-svelte";

	const query = createTableOrderOfficeOrderBasedBack({ divisionIds: "1,3" });
	$: console.log($query.data);

	const getTime = (date: string) => {
		return new Date(date).toLocaleTimeString();
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
				<Badge>{$query.data.pendingOrders} pending order(s)</Badge>
				<Badge>{$query.data.pendingItems} pending items(s)</Badge>
			</div>
			<div class="flex gap-1 items-center">
				<div>
					<button on:click={() => $query.refetch()}>
						<Badge variant="secondary" class="truncate">
							Refreshed: {getTime($query.data.lastRefresh)}
						</Badge>
					</button>
				</div>

				<button class="flex" on:click={header.toggleHeader}>
					<Badge variant="secondary" class="truncate">
						{#if $header}
							<Maximize2Icon class="size-4" />
						{:else}
							<Minimize2Icon class="size-4" />
						{/if}
					</Badge>
				</button>
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
			<Group {group} refetch={$query.refetch} />
		</Masonry>
	{/if}
</div>
