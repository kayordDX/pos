<script lang="ts">
	import { Actions } from "@kayord/ui";
	import { ViewIcon } from "@lucide/svelte";
	import { type DTOStockAllocateDTO } from "$lib/api";
	import { goto } from "$app/navigation";
	import { resolve } from "$app/paths";

	interface Props {
		refetch: () => void;
		stockAllocate: DTOStockAllocateDTO;
	}

	let { stockAllocate, refetch }: Props = $props();
</script>

<Actions
	actions={[
		{
			icon: ViewIcon,
			text: "View",
			action: () => goto(resolve(`/manager/admin/stock/allocate/${stockAllocate.id}`)),
		},
	]}
/>
