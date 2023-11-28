<script lang="ts">
	import { Button, Card, Loader } from "@kayord/ui";
	import type { PageData } from "./$types";
	import { createTableGetAvailable } from "$lib/api";
	import { outlet } from "$lib/stores/outletStore";
	import Error from "$lib/components/Error.svelte";
	import { date } from "zod";

	const query = createTableGetAvailable({ OutletId: $outlet?.outletId ?? 0 });
</script>

<div class="m-8">
	<h1>Available Tables</h1>
	<p class="text-muted-foreground">Select table to book</p>

	{#if $query.isPending}
		<Loader />
	{/if}
	{#if $query.error}
		<Error message={$query.error.reason} />
	{/if}

	{#if $query.isSuccess}
		<div class="flex flex-wrap gap-4 mt-4">
			{#each $query.data as table}
				<button class="text-start">
					<Card class="p-5 w-48">
						<h3>{table.name}</h3>
						<!-- <p>{table.section.name}</p> -->
						<p>{table.capacity}</p>
					</Card>
				</button>
			{/each}
		</div>
	{/if}

	<Button class="mt-4" href="/waiter">Cancel</Button>
</div>
