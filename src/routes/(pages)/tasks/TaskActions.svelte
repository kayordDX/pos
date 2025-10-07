<script lang="ts">
	import { createStockAllocateItemAction, type UserTasksResponse } from "$lib/api";
	import { getError } from "$lib/types";
	import { Button, Dialog, toast } from "@kayord/ui";
	import { CircleCheckIcon, CircleEllipsisIcon, CircleXIcon } from "@lucide/svelte";
	import { status } from "$lib/stores/status.svelte";
	import AllocateStockSelect from "./AllocateStockSelect.svelte";

	interface Props {
		refetch: () => void;
		task: UserTasksResponse;
	}
	let { refetch, task }: Props = $props();

	const actionMutation = createStockAllocateItemAction();

	let isBusy = $state(false);
	let open = $state(false);

	let toStockId: number | undefined = $state(undefined);

	const action = async (id: number, statusId: number) => {
		try {
			isBusy = true;
			await actionMutation.mutateAsync({
				data: { id, stockAllocateItemStatusId: statusId, stockId: toStockId },
			});
			refetch();
			toast.info("Actioned task");
			status.getStatus();
			open = false;
		} catch (err) {
			toast.error(getError(err).message);
		} finally {
			isBusy = false;
		}
	};
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger class="flex flex-col">
		<Button variant="outline"><CircleEllipsisIcon /> Actions</Button>
	</Dialog.Trigger>
	<Dialog.Content class="max-h-[98%] overflow-auto">
		<Dialog.Header>
			<Dialog.Title>{task.name}</Dialog.Title>
			<Dialog.Description>{task.description}</Dialog.Description>
			<Dialog.Description>{task.outlet.name}</Dialog.Description>
		</Dialog.Header>
		<div class="m-4 flex flex-col gap-4">
			{#if task.outletId != task.outlet.id}
				<AllocateStockSelect divisionId={task.toDivisionId} bind:value={toStockId} />
			{/if}

			<Button onclick={() => action(task.id, 4)} disabled={isBusy}>
				<CircleCheckIcon /> Approve
			</Button>
			<Button onclick={() => action(task.id, 5)} variant="destructive" disabled={isBusy}>
				<CircleXIcon /> Reject
			</Button>
		</div>
	</Dialog.Content>
</Dialog.Root>
