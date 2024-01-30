<script lang="ts">
	import { Avatar, ThemeSwitch } from "@kayord/ui";
	import Menu from "./Menu.svelte";
	import { user } from "$lib/stores/userStore";
	import { Button } from "@kayord/ui";
	import { session } from "$lib/stores/session";
	import { goto } from "$app/navigation";
</script>

<div class="bg-secondary p-2 flex justify-between h-14 items-center border-b-2 border-secondary">
	<button class="flex items-center" on:click={() => goto("/")}>
		<img src="/logo.svg" alt="kayord-logo" class="h-10" />ayord.Pos
	</button>
	<span></span>
	<div class="flex gap-2">
		<ThemeSwitch class="text-secondary-foreground" />

		{#if $session}
			<Menu />
		{/if}
	</div>
</div>
