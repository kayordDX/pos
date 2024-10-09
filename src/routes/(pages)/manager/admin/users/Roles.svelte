<script lang="ts">
	import Role from "./Role.svelte";
	import AddRole from "./AddRole.svelte";

	interface Props {
		roles: string;
		userId: string;
		refetch: () => void;
	}

	let { roles, refetch, userId }: Props = $props();
	const rolesArray = $derived(roles.split(","));
</script>

<div class="flex gap-2">
	{#each rolesArray as role}
		<Role {role} {refetch} {userId} />
	{/each}
	<AddRole {refetch} {userId} />
</div>
