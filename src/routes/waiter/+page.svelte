<script lang="ts">
	import { Card, Button } from "@kayord/ui";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<div class="m-8">
	<h1>Table Booking</h1>
	<Button>Book a Table</Button>

	<h1 class="mt-8">My Tables</h1>
	<p class="text-muted-foreground">List of my current tables</p>

	<div class="flex flex-wrap gap-4 mt-4">
		<Card class="p-5 w-48">
			<h3>Test</h3>
		</Card>
		<!-- {#each data.outletUsers as clockUser}
			<button class="text-start" on:click={() => user.login(clockUser.id)}>
				<Card class="p-5 w-48">
					<h3>{clockUser.name}</h3>
					<StaffTypeBadge type={clockUser.staffType} />
				</Card>
			</button>
		{/each} -->
	</div>

	<h1 class="mt-8">Other Tables</h1>
	<p class="text-muted-foreground">Tables managed by other users</p>
	<div class="flex flex-wrap gap-4 mt-4">
		<Card class="p-5 w-48">
			<h3>Test</h3>
		</Card>
	</div>
</div>
