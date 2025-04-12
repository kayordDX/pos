<script lang="ts">
	import { page } from "$app/state";
	import {
		createStockAllocateGet,
		createStockAllocateUpdate,
		type DTOStockAllocateItemDTO,
		type UserTasksResponse,
	} from "$lib/api";
	import { Alert, Badge, Button, Card, createShadTable, DataTable } from "@kayord/ui";

	import { createUserTasks } from "$lib/api";
	import { CheckCheckIcon, CircleCheckIcon, CircleXIcon } from "@lucide/svelte";

	const query = createUserTasks({ pageSize: 50 });

	let data = $derived($query.data?.items ?? []);
</script>

<div class="m-2">
	<div class="text-2xl mb-2">Tasks</div>
	{#if $query.data?.items?.length === 0}
		<Alert.Root>
			<CheckCheckIcon class="size-4" />
			<Alert.Title>No tasks available</Alert.Title>
			<Alert.Description>Could not find any tasks.</Alert.Description>
		</Alert.Root>
	{:else}
		<div class="flex flex-col gap-2">
			{#each $query.data?.items ?? [] as task}
				<Card.Root class="flex flex-col gap-2 p-2">
					<div class="flex justify-between items-center">
						<div class="flex flex-col gap-1">
							<div class="font-bold">{task.name}</div>
							<div>{task.description}</div>
							<Badge variant="outline" class="w-fit">{task.type}: {task.status}</Badge>
						</div>
						<div class="flex flex-col gap-2">
							<Button><CircleCheckIcon /> Approve</Button>
							<Button variant="destructive"><CircleXIcon /> Reject</Button>
						</div>
					</div>
				</Card.Root>
			{/each}
		</div>
	{/if}
</div>
