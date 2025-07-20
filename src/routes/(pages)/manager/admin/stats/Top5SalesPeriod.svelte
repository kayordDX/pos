<script lang="ts">
	import { Select } from "@kayord/ui";
	import { createStatsTopSalesPeriod } from "$lib/api";

	const salesPeriodQuery = createStatsTopSalesPeriod({ top: 5 });
	const salesPeriods = $derived($salesPeriodQuery.data ?? []);

	interface Props {
		salesPeriod: number;
	}

	let { salesPeriod = $bindable() }: Props = $props();

	const triggerContent = $derived(
		salesPeriods.find((f) => f.id === salesPeriod)?.name ?? "Select Sales Period"
	);

	$effect(() => {
		if (salesPeriods.length > 0 && salesPeriod == 0) {
			salesPeriod = salesPeriods[0]?.id ?? 0;
		}
	});
</script>

<Select.Root
	type="single"
	name="salesPeriod"
	bind:value={() => salesPeriod.toString(), (v) => (salesPeriod = Number(v))}
>
	<Select.Trigger class="w-[180px]">
		{triggerContent}
	</Select.Trigger>
	<Select.Content>
		<Select.Group>
			<Select.Label>Sales Period</Select.Label>
			{#each salesPeriods as salesPeriod (salesPeriod.id)}
				<Select.Item
					value={salesPeriod.id.toString()}
					label={salesPeriod.name ?? salesPeriod.startDate ?? salesPeriod.id.toString()}
				>
					{salesPeriod.name ?? salesPeriod.startDate ?? salesPeriod.id}
				</Select.Item>
			{/each}
		</Select.Group>
	</Select.Content>
</Select.Root>
