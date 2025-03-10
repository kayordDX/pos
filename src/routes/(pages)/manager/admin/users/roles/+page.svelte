<script lang="ts">
	import {
		createRoleGetAll,
		createUserUsers,
		type EntitiesRole,
		type UserUserResponse,
	} from "$lib/api";
	import {
		DataTable,
		renderComponent,
		createSvelteTable,
		Input,
		createShadTable,
	} from "@kayord/ui";
	import {
		type ColumnDef,
		getCoreRowModel,
		type Updater,
		type PaginationState,
		type ColumnFiltersState,
		getPaginationRowModel,
		getFilteredRowModel,
	} from "@tanstack/table-core";

	const query = createRoleGetAll();

	const columns: ColumnDef<EntitiesRole>[] = [
		{
			header: "Name",
			accessorKey: "name",
		},
		{
			header: "Email",
			accessorKey: "email",
		},
	];

	let data = $derived($query.data ?? []);

	const table = createShadTable({
		columns,
		get data() {
			return data;
		},
		enableRowSelection: false,
	});
</script>

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
		{table}
		{columns}
		isLoading={$query.isPending}
		noDataMessage="No roles for outlet"
	/>
</div>
