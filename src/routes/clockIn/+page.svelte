<script lang="ts">
	import { Badge, Button, Card, CardFooter } from "@kayord/ui";
	import { PUBLIC_API_URL } from "$env/static/public";
	import type { PageData } from "./$types";
	import { getFlash } from "sveltekit-flash-message";
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";
	import StaffTypeBadge from "$lib/components/StaffTypeBadge.svelte";
	const flash = getFlash(page);

	export let data: PageData;

	const clockIn = async (userId: number) => {
		const headersList = {
			"Content-Type": "application/json",
		};
		const body = {
			SalesPeriodId: 1,
			StaffId: userId,
		};
		const bodyContent = JSON.stringify(body);
		// TODO: Fix hardcoded url
		const result = await fetch(`${PUBLIC_API_URL}/ClockIn`, {
			method: "POST",
			body: bodyContent,
			headers: headersList,
		});
		if (result.ok) {
			$flash = { type: "success", message: "Successfully Clocked in User" };
			goto("/");
		} else {
			$flash = { type: "error", message: "Error clocking in user" };
		}
		return result.ok;
	};
</script>

<div class="m-8">
	<h1>Clock In</h1>
	<p class="text-muted-foreground">Select User to clock in</p>
	<div class="mt-2 flex flex-col gap-4">
		{#each data.outletUsers as clockUser}
			<button class="text-start" on:click={() => clockIn(clockUser.id)}>
				<Card class="p-5 hover:cursor-pointer flex justify-between items-center">
					<div>
						<h3>{clockUser.name}</h3>
						<StaffTypeBadge type={clockUser.staffType} />
					</div>
				</Card>
			</button>
		{/each}
	</div>
	<Button variant="secondary" class="mt-4" href="/">Cancel</Button>
</div>
