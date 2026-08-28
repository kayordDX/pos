<script lang="ts">
	import { Button, Loader } from "@kayord/ui";
	import { status } from "$lib/stores/status.svelte";
	import { goto } from "$app/navigation";
	import { resolve } from "$app/paths";
	import { Header } from "$lib/components/Header";

	let init = $state(false);

	const redirect = async () => {
		if (status.value.roles.length == 0 || (status.value.roles.length == 1 && status.hasRole("guest"))) {
			await goto(resolve("/guest"));
		} else if (status.value.roles.length == 1) {
			if (status.hasRole("front")) {
				await goto(resolve("/waiter"));
			} else if (status.hasRole("manager")) {
				await goto(resolve("/manager"));
			}
		}
		init = true;
	};

	// const backRoles = $derived(status.value.roles.filter((r) => r.roleType == "back"));

	$effect(() => {
		redirect();
	});
</script>

{#if !init}
	<Loader />
{:else}
	<Header />
	<div class="m-4 flex flex-col gap-4">
		{#if status.hasRole("front")}
			<div class="border-muted rounded-md border-1 border-dashed p-2">
				<Button class="w-full" href="/waiter">Waiter</Button>
			</div>
		{/if}
		{#if status.hasRole("back")}
			<div class="border-muted flex flex-col gap-2 rounded-md border-1 border-dashed p-2">
				{#each status.value.divisions as division (division.id)}
					<Button href={`/backOffice/${division.id}`} class="w-full" variant="outline">
						{division.name}
					</Button>
				{/each}
			</div>
		{/if}
		{#if status.hasRole("manager")}
			<div class="border-muted rounded-md border-1 border-dashed p-2">
				<Button href="/manager" class="w-full" variant="destructive">Manager</Button>
			</div>
		{/if}
	</div>
{/if}
