<script lang="ts">
	import { Badge } from "@kayord/ui";

	import { createRoleGetAll } from "$lib/api";
	import { status } from "$lib/stores/status.svelte";
	interface Props {
		roleId: number;
	}

	let { roleId }: Props = $props();
	const query = createRoleGetAll(status.value.outletId);

	const result = $query.data?.find((x) => x.roleId === roleId);
</script>

{#if result}
	<Badge>{result.name}</Badge>
{/if}
