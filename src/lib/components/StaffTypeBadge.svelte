<script lang="ts">
	import { Badge } from "@kayord/ui";
	export let roleId: number;

	import { createRoleGetAll } from "$lib/api";
	const query = createRoleGetAll();

	const result = $query.data?.find((x) => x.roleId === roleId);
</script>

{#if result}
	<Badge>{result.name}</Badge>
{/if}
