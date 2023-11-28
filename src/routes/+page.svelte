<script lang="ts">
	import { Button, Card } from "@kayord/ui";
	import { Clock } from "lucide-svelte";
	import { user } from "$lib/stores/userStore";
	import type { PageData } from "./$types";
	import StaffTypeBadge from "$lib/components/StaffTypeBadge.svelte";

	export let data: PageData;
</script>

<div class="m-8">
	<h1>Get started by clocking in</h1>
	<p class="text-muted-foreground">Clock in</p>
	<Button class="mt-4" variant="secondary" href="/clockIn"
		><Clock class="w-4 mr-2" />Clock In</Button
	>
	<Button class="mt-4" variant="secondary" href="/clockOut"
		><Clock class="w-4 mr-2" />Clock Out</Button
	>
</div>

<div class="m-8 mt-20">
	<h1>Clocked in Users</h1>
	<p class="text-muted-foreground">List of current clocked in users</p>

	<div class="flex flex-wrap gap-4 mt-4">
		{#each data.outletUsers as clockUser}
			<button class="text-start" on:click={() => user.login(clockUser.id)}>
				<Card class="p-5 w-48">
					<h3>{clockUser.name}</h3>
					<StaffTypeBadge type={clockUser.staffType} />
				</Card>
			</button>
		{/each}
	</div>
</div>
