<script lang="ts">
	import { createRoleGetAll, type EntitiesRole } from "$lib/api";
	import Search from "$lib/components/Search.svelte";
	import { status } from "$lib/stores/status.svelte";
	import { Badge, DataTable, renderSnippet, createShadTable } from "@kayord/ui";
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
			cell: (item) => renderSnippet(roleType, { roleType: item.getValue<string>() }),
		},
	];

	let data = $derived(query.data ?? []);
	let search = $state("");

	const table = createShadTable({
		columns,
		get data() {
			return data;
		},
		enableRowSelection: false,
		state: {
			get globalFilter() {
				return search;
			},
		},
	});
</script>

{#snippet roleType(param: { roleType: string })}
	{#if param.roleType === "manager"}
		<Badge variant="destructive">{param.roleType}</Badge>
	{/if}
	{#if param.roleType === "guest"}
		<Badge variant="outline">{param.roleType}</Badge>
	{/if}
	{#if param.roleType === "front"}
		<Badge variant="default">{param.roleType}</Badge>
	{/if}
	{#if param.roleType === "back"}
		<Badge variant="secondary">{param.roleType}</Badge>
	{/if}
{/snippet}

{#snippet header()}
	<div class="flex gap-2 justify-between items-center">
		<div class="flex gap-2 items-center">
			<Search bind:search name="Roles" />
		</div>
	</div>
{/snippet}

<div class="m-2">
	<h2>Roles</h2>
	<DataTable
		headerClass="pb-2"
		{table}
		{header}
		isLoading={query.isPending}
		noDataMessage="No roles for outlet"
	/>
</div>
