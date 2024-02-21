<script lang="ts">
	import Menu from "./Menu.svelte";
	import { goto } from "$app/navigation";
	import type { Session } from "@auth/sveltekit";
	import Notifications from "./Notifications.svelte";

	export let session: Session | null | undefined;
</script>

<div class="bg-secondary p-2 flex justify-between h-14 items-center border-b-2 border-secondary">
	<button class="flex items-center" on:click={() => goto("/")}>
		<img src="/logo.svg" alt="kayord-logo" class="h-10" />ayord.Pos
	</button>
	<span></span>
	<div class="flex gap-2">
		<Notifications />
		{#if session}
			<Menu {session} />
		{/if}
	</div>
</div>
