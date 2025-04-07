<script lang="ts">
	import { Button, DropdownMenu } from "@kayord/ui";
	import { EllipsisVerticalIcon, ViewIcon } from "@lucide/svelte";
	import { type DTOStockAllocateDTO } from "$lib/api";
	import { goto } from "$app/navigation";

	interface Props {
		refetch: () => void;
		stockAllocate: DTOStockAllocateDTO;
	}

	let { stockAllocate, refetch }: Props = $props();
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		<Button size="icon" variant="secondary">
			<EllipsisVerticalIcon class="size-5" />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Item onclick={() => goto(`/manager/admin/stock/allocate/${stockAllocate.id}`)}>
			<ViewIcon /> View
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
