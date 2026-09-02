<script lang="ts">
	import { arrayUnique } from "$lib/util";
	import Role from "./Role.svelte";

	interface Props {
		roles: string;
		userId: string;
		refetch: () => void;
	}

	let { roles, refetch, userId }: Props = $props();
	const rolesArray = $derived(arrayUnique(roles.split(",")));
</script>

<div class="flex gap-2">
	{#each rolesArray as role (role)}
		<Role {role} {refetch} {userId} />
	{/each}
</div>
