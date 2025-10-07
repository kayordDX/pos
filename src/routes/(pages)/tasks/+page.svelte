<script lang="ts">
	import { Alert, Badge, Card } from "@kayord/ui";
	import { createUserTasks } from "$lib/api";
	import { CheckCheckIcon } from "@lucide/svelte";
	import { Header } from "$lib/components/Header";
	import TaskActions from "./TaskActions.svelte";

	const query = createUserTasks({
		pageSize: 20,
	});

	let data = $derived(query.data?.items ?? []);
</script>

<Header />
<div class="m-2">
	<div class="text-2xl mb-2">Tasks</div>
	{#if (query.data?.items?.length ?? 0) === 0}
		<Alert.Root>
			<CheckCheckIcon class="size-4" />
			<Alert.Title>No tasks available</Alert.Title>
			<Alert.Description>Could not find any tasks.</Alert.Description>
		</Alert.Root>
	{:else}
		<div class="flex flex-col gap-2">
			{#each data as task (task.id)}
				<Card.Root class="flex flex-col gap-2 p-2">
					<div class="flex justify-between items-center">
						<div class="flex flex-col">
							<div class="font-bold">{task.name}</div>
							<div>{task.description}</div>
							<div class="text-xs text-muted-foreground mt-2 mb-1">{task.outlet.name}</div>
							<Badge variant="outline" class="w-fit">{task.type}: {task.status}</Badge>
						</div>
						<div class="flex flex-col gap-2">
							<TaskActions {task} refetch={query.refetch} />
						</div>
					</div>
				</Card.Root>
			{/each}
		</div>
	{/if}
</div>
