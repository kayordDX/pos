<script lang="ts">
	import { createTableOrderOfficeOrderBasedBack } from "$lib/api";
	import { Masonry } from "svelte-bricks";
	import Group from "../Group.svelte";
	import { Badge, Loader } from "@kayord/ui";
	import Error from "$lib/components/Error.svelte";
	import { getError } from "$lib/types";

	const query = createTableOrderOfficeOrderBasedBack({ divisionIds: "1,3", complete: true });

	let [minColWidth, maxColWidth, gap] = [500, 600, 10];

	const getTime = (date: string) => {
		return new Date(date).toLocaleTimeString();
	};
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
				<a href="/kitchen"><Badge>Kitchen</Badge></a>
			</div>
			<div class="flex gap-1 items-center">
				<div>
					<button on:click={() => $query.refetch()}>
						<Badge variant="secondary" class="truncate">
							Refreshed: {getTime($query.data.lastRefresh)}
						</Badge>
					</button>
				</div>
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
			<Group {group} refetch={$query.refetch} isHistory={true} />
		</Masonry>
	{/if}
</div>
