<script lang="ts">
	import { Actions } from "@kayord/ui";
	import { ViewIcon } from "@lucide/svelte";
	import { goto } from "$app/navigation";
	import { resolve } from "$app/paths";

	interface Props {
		stockAllocateId: number;
	}

	let { stockAllocateId }: Props = $props();
</script>

<Actions
	actions={[
		{
			icon: ViewIcon,
			text: "View",
			action: () => goto(resolve(`/manager/admin/stock/allocate/${stockAllocateId}`)),
		},
	]}
/>
