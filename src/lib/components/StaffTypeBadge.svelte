<script lang="ts">
	import { Badge } from "@kayord/ui";
	import { StaffType } from "$lib/types";
	export let type: StaffType;
</script>

{#if StaffType.Chef == type}
	<Badge class="bg-green-300 text-black">Chef</Badge>
{:else if StaffType.Manager == type}
	<Badge class="bg-purple-300 text-black">Manager</Badge>
{:else if StaffType.Waiter == type}
	<Badge class="secondary">Waiter</Badge>
{/if}
