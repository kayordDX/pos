<script lang="ts">
	import { Badge, Button, Card } from "@kayord/ui";
	import { PUBLIC_API_URL } from "$env/static/public";
	import type { PageData } from "./$types";
	import { getFlash } from "sveltekit-flash-message";
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";
	import StaffTypeBadge from "$lib/components/StaffTypeBadge.svelte";
	import { createClockClockOut } from "$lib/api";
	import { outlet } from "$lib/stores/outlet";
	const flash = getFlash(page);

	export let data: PageData;

	const mutation = createClockClockOut();

	const clockIn = async (userId: number) => {
		try {
			await $mutation.mutateAsync({
				data: { outletId: $outlet?.outletId ?? 0, staffId: userId },
			});
			$flash = { type: "success", message: "Successfully Clocked out User" };
			goto("/");
		} catch (err) {
			$flash = { type: "error", message: "Error clocking out user" };
		}
	};
</script>

<div class="m-8">
	<h1>Clock Out</h1>
	<p class="text-muted-foreground">Select User to clock out</p>
	<div class="mt-2 flex flex-col gap-4">
		{#each data.outletUsers as clockUser}
			<button class="text-start" on:click={() => clockIn(clockUser.id)}>
				<Card.Root class="p-5 hover:cursor-pointer flex justify-between items-center">
					<div>
						<h3>{clockUser.name}</h3>
						<StaffTypeBadge type={clockUser.staffType} />
					</div>
				</Card.Root>
			</button>
		{/each}
	</div>
	<Button variant="secondary" class="mt-4" href="/">Cancel</Button>
</div>
