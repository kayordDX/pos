<script lang="ts">
	import { Button } from "@kayord/ui";
	import { status } from "$lib/stores/status";
	import { goto } from "$app/navigation";

	if ($status.roles.length == 0 || ($status.roles.length == 1 && $status.roles.includes("Guest"))) {
		goto("/guest");
	} else if ($status.roles.length == 1) {
		if ($status.roles.includes("Waiter")) {
			goto("/waiter");
		} else if ($status.roles.includes("Chef")) {
			goto("/kitchen");
		} else if ($status.roles.includes("Manager")) {
			goto("/manager");
		}
	}
</script>

<div class="m-8 flex gap-4">
	{#if $status.roles.includes("Waiter")}
		<div class="flex flex-col">
			<Button href="/waiter">Waiter</Button>
		</div>
	{/if}
	{#if $status.roles.includes("Chef")}
		<div class="flex flex-col">
			<Button href="/kitchen">Kitchen</Button>
		</div>
	{/if}
	{#if $status.roles.includes("Manager")}
		<div class="flex flex-col">
			<Button href="/manager">Manager</Button>
		</div>
	{/if}
</div>
