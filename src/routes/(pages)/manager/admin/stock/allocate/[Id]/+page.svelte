<script lang="ts">
	import { page } from "$app/state";
	import {
		createStockAllocateGet,
		createStockAllocateUpdate,
		type DTOStockAllocateItemDTO,
	} from "$lib/api";
	import { getError } from "$lib/types";
	import {
		Alert,
		Badge,
		Button,
		Card,
		DataTable,
		Loader,
		renderComponent,
		renderSnippet,
		createShadTable,
		toast,
		Table,
	} from "@kayord/ui";
	import { MoveRightIcon, PlusIcon, WorkflowIcon } from "@lucide/svelte";
	import AddAllocationItem from "./AddAllocationItem.svelte";
	import Actions from "./Actions.svelte";
	import { type ColumnDef, type RowSelectionState } from "@tanstack/table-core";

	const query = createStockAllocateGet(Number(page.params.Id));

	let addOrderItemOpen = $state(false);

	const stockAllocateMutation = createStockAllocateUpdate();
	const sendToApprover = async () => {
		await $stockAllocateMutation.mutateAsync({
			data: {
				id: Number(page.params.Id),
				stockAllocateStatusId: 2,
			},
		});
		$query.refetch();
	};

	const canEdit = $derived($query.data?.stockAllocateStatusId === 1);

	const columns: ColumnDef<DTOStockAllocateItemDTO>[] = [
		{
			header: "Stock",
			accessorKey: "stock.name",
			size: 1000,
		},
		{
			header: "Allocate Actual",
			accessorKey: "actual",
			size: 1000,
		},
		{
			header: "Status",
			accessorKey: "stockOrderItemStatus.name",
			size: 1000,
			cell: (item) => renderSnippet(status, item.row.original),
		},
		{
			header: "",
			accessorKey: "id",
			enableSorting: false,
			cell: (item) =>
				renderComponent(Actions, {
					canEdit: canEdit,
					item: item.row.original,
					refetch: $query.refetch,
					divisionId: $query.data?.fromDivisionId ?? 0,
				}),
			size: 10,
		},
	];

	let data = $derived($query.data?.stockAllocateItems ?? []);

	let rowSelection: RowSelectionState = $state({});

	const table = createShadTable({
		columns,
		getRowId: (row) => row.stockId.toString(),
		get data() {
			return data;
		},
		state: {
			get rowSelection() {
				return rowSelection;
			},
		},
		enableRowSelection: false,
		enablePaging: false,
		onRowSelectionChange: (updater) => {
			if (updater instanceof Function) {
				rowSelection = updater(rowSelection);
			} else rowSelection = updater;
		},
	});
</script>

{#snippet status(item: DTOStockAllocateItemDTO)}
	{@const variant =
		item.stockAllocateItemStatusId === 1
			? "default"
			: item.stockAllocateItemStatusId === 2
				? "secondary"
				: "outline"}
	<Badge {variant}>
		{item.stockAllocateItemStatus.name}
	</Badge>
{/snippet}

{#snippet addOrderItem()}
	<Button size="sm" onclick={() => (addOrderItemOpen = true)}>
		<PlusIcon class="h-5 w-5" /> Add Item
	</Button>
{/snippet}

{#snippet errorMessage(message: string)}
	<Alert.Root variant="destructive">
		<Alert.Title>Error</Alert.Title>
		<Alert.Description>{message}</Alert.Description>
	</Alert.Root>
{/snippet}

<div class="m-2">
	<Loader isLoading={$query.isPending} />
	{#if $query.data}
		<Card.Root class="bg-secondary">
			<div
				class="border-2 border-secondary p-2 gap-2 rounded-md flex-col justify-between items-center text-secondary-foreground"
			>
				<div class="flex items-center gap-2 justify-center">
					<div class="bg-background/60 p-1 rounded-md">
						<div class="font-bold">{$query.data.fromDivision.divisionName}</div>
					</div>
					<MoveRightIcon />
					<div class="bg-background/60 p-1 rounded-md">
						<div class="font-bold">{$query.data.toDivision.divisionName}</div>
					</div>
					<div class="bg-background/60 p-1 rounded-md">
						<div class="font-bold">{$query.data.toOutlet.name}</div>
					</div>
				</div>
				<div class="flex items-center gap-2 justify-between">
					<div class="flex flex-col">
						<h1 class="text-xl">{$query.data.comment}</h1>
						<Badge>{$query.data.stockAllocateStatus.name}</Badge>
					</div>
					<div class="flex flex-col gap-1">
						<Badge variant="outline">Requested: {$query.data.fromUser?.name}</Badge>
						<Badge variant="outline">Assigned: {$query.data.assignedUser?.name}</Badge>
					</div>
				</div>
			</div>
		</Card.Root>

		<div class="mt-2 flex items-center justify-between">
			<div>
				{#if canEdit}
					<Button size="sm" variant="destructive" onclick={sendToApprover}>
						<WorkflowIcon class="h-5 w-5" /> Send to Approver
					</Button>
				{/if}
			</div>
			<div>
				{#if canEdit}
					<Button size="sm" onclick={() => (addOrderItemOpen = true)}>
						<PlusIcon class="h-5 w-5" /> Add Item
					</Button>
				{/if}
			</div>
		</div>

		<DataTable
			{table}
			headerClass="pb-2"
			isLoading={$query.isPending}
			noDataMessage="No order items"
		/>
	{:else if !$query.isPending}
		{@render errorMessage("An error occurred while fetching order items")}
	{/if}
	{#if $query.error}
		{@render errorMessage(getError($query.error).message)}
	{/if}
	<AddAllocationItem
		bind:open={addOrderItemOpen}
		refetch={$query.refetch}
		divisionId={$query.data?.fromDivisionId ?? 0}
	/>
</div>
