<script lang="ts">
	import { ThemeSwitch } from "@kayord/ui";
	import Menu from "./Manu.svelte";
	import { user } from "$lib/stores/userStore";
	import { Button } from "@kayord/ui";
</script>

<div class="bg-secondary p-2 flex justify-between h-14 items-center border-b-2 border-secondary">
	<div class="flex items-center"><img src="/logo.svg" alt="logo" class="h-10" />ayord.Pos</div>
	<span></span>
	<div class="flex gap-2">
		<ThemeSwitch class="text-secondary-foreground" />
		{#if $user}
			<Button on:click={user.logout}>Logout</Button>
		{:else}
			<Menu />
		{/if}
	</div>
</div>
