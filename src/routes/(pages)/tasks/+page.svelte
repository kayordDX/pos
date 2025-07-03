<script lang="ts">
	import { createStockAllocateItemAction } from "$lib/api";
	import { Alert, Badge, Button, Card, toast } from "@kayord/ui";

	import { createUserTasks } from "$lib/api";
	import { CheckCheckIcon, CircleCheckIcon, CircleXIcon } from "@lucide/svelte";
	import { getError } from "$lib/types";
	import { status } from "$lib/stores/status.svelte";
	import { Header } from "$lib/components/Header";

	const query = createUserTasks({
		pageSize: 20,
	});

	const actionMutation = createStockAllocateItemAction();

	let disableActions: Array<number> = $state([]);

	const action = async (id: number, statusId: number) => {
		try {
			disableActions.push(id);
			await $actionMutation.mutateAsync({ data: { id, stockAllocateItemStatusId: statusId } });
			$query.refetch();
			toast.info("Actioned task");
			status.getStatus();
		} catch (err) {
			toast.error(getError(err).message);
		} finally {
			disableActions = disableActions.filter((item) => item !== id);
		}
	};

	let data = $derived($query.data?.items ?? []);
</script>

<Header />
<div class="m-2">
	<div class="text-2xl mb-2">Tasks</div>
	{#if ($query.data?.items?.length ?? 0) === 0}
		<Alert.Root>
			<CheckCheckIcon class="size-4" />
			<Alert.Title>No tasks available</Alert.Title>
			<Alert.Description>Could not find any tasks.</Alert.Description>
		</Alert.Root>
	{:else}
		<div class="flex flex-col gap-2">
			{#each data as task}
				<Card.Root class="flex flex-col gap-2 p-2">
					<div class="flex justify-between items-center">
						<div class="flex flex-col">
							<div class="font-bold">{task.name}</div>
							<div>{task.description}</div>
							<div class="text-xs text-muted-foreground mt-2 mb-1">{task.outlet.name}</div>
							<Badge variant="outline" class="w-fit">{task.type}: {task.status}</Badge>
						</div>
						<div class="flex flex-col gap-2">
							<Button
								onclick={() => action(task.id, 4)}
								disabled={disableActions.includes(task.id)}
							>
								<CircleCheckIcon /> Approve
							</Button>
							<Button
								onclick={() => action(task.id, 5)}
								variant="destructive"
								disabled={disableActions.includes(task.id)}
							>
								<CircleXIcon /> Reject
							</Button>
						</div>
					</div>
				</Card.Root>
			{/each}
		</div>
	{/if}
</div>
