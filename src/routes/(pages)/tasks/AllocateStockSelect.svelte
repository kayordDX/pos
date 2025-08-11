<script lang="ts">
	import { createStockGetAllDivision } from "$lib/api";
	import { Combobox, Label } from "@kayord/ui";
	import QueryBuilder from "fluent-querykit";

	interface Props {
		value: number | undefined;
		divisionId: number;
	}
	let { value = $bindable(), divisionId }: Props = $props();

	let filters = $state("");

	const stockQuery = $derived(
		createStockGetAllDivision({
			page: 1,
			pageSize: 10,
			filters,
			sorts: "",
			divisionId: divisionId,
		})
	);

	const stockList = $derived($stockQuery.data?.items ?? []);

	let stockSearch = $state("");

	$effect(() => {
		const qb = new QueryBuilder(false, false);
		if (stockSearch) {
			qb.containsCaseInsensitive("name", stockSearch);
		}
		filters = qb.build();
	});

	const stockListSelect = $derived(
		stockList.map((s) => ({ value: s.stockId, label: `${s.name} - (${s.unitName})` }))
	);
</script>

<Label>Stock Id</Label>
<Combobox
	bind:value
	items={stockListSelect}
	bind:search={stockSearch}
	shouldFilter={false}
	name="Stock Id"
/>
