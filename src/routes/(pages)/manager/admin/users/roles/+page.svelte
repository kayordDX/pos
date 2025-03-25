<script lang="ts">
	import { createRoleGetAll, type EntitiesRole } from "$lib/api";
	import { status } from "$lib/stores/status.svelte";
	import { Badge, DataTable, renderSnippet, ShadTable } from "@kayord/ui";
	import { type ColumnDef } from "@tanstack/table-core";

	const query = createRoleGetAll(status.value.outletId);

	const columns: ColumnDef<EntitiesRole>[] = [
		{
			header: "Name",
			accessorKey: "name",
		},
		{
			header: "Description",
			accessorKey: "description",
		},
		{
			header: "Role Type",
			accessorKey: "roleType.name",
			cell: (item) => renderSnippet(roleType, item.getValue<string>()),
		},
	];

	let data = $derived($query.data ?? []);

	let tableState = $state(
		new ShadTable({
			columns,
			get data() {
				return data;
			},
			enableRowSelection: false,
		})
	);
</script>

{#snippet roleType(roleType: string)}
	{#if roleType === "manager"}
		<Badge variant="destructive">{roleType}</Badge>
	{/if}
	{#if roleType === "guest"}
		<Badge variant="outline">{roleType}</Badge>
	{/if}
	{#if roleType === "front"}
		<Badge variant="default">{roleType}</Badge>
	{/if}
	{#if roleType === "back"}
		<Badge variant="secondary">{roleType}</Badge>
	{/if}
{/snippet}

<!-- {#snippet header()}
	<div class="flex gap-2">
		<Input
			value={col?.getFilterValue()}
			onchange={(e) => debouncedCb(e.currentTarget.value)}
			oninput={(e) => debouncedCb(e.currentTarget.value)}
			placeholder="Search Email..."
			class="h-8 w-[150px] lg:w-[250px]"
		/>
		<Filter column={nameCol} title="Role" options={roles} />
		<FilterReset {table} />
	</div>
{/snippet} -->

<div class="m-2">
	<h2>Roles</h2>
	<DataTable
		headerClass="pb-2"
		bind:tableState
		isLoading={$query.isPending}
		noDataMessage="No roles for outlet"
	/>
</div>
