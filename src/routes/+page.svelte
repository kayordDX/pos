<script lang="ts">
	import { Button, Card, Loader } from "@kayord/ui";
	import { status } from "$lib/stores/status.svelte";
	import { goto } from "$app/navigation";
	import { Header } from "$lib/components/Header";

	let init = $state(false);

	const redirect = async () => {
		if (
			status.value.roles.length == 0 ||
			(status.value.roles.length == 1 && status.hasRole("guest"))
		) {
			await goto("/guest");
		} else if (status.value.roles.length == 1) {
			if (status.hasRole("front")) {
				await goto("/waiter");
			} else if (status.hasRole("manager")) {
				await goto("/manager");
			}
		}
		init = true;
	};

	const backRoles = $derived(status.value.roles.filter((r) => r.roleType == "back"));

	$effect(() => {
		redirect();
	});
</script>

{#if !init}
	<Loader />
{:else}
	<Header />
	<div class="flex flex-col gap-4 m-4">
		{#if status.hasRole("front")}
			<div class="border-1 border-muted p-2 border-dashed rounded-md">
				<Button class="w-full" href="/waiter">Waiter</Button>
			</div>
		{/if}
		{#if status.hasRole("back")}
			<div class="border-1 border-muted p-2 border-dashed rounded-md flex flex-col gap-2">
				{#each status.value.divisions as division}
					<Button href={`/backOffice/${division.id}`} class="w-full" variant="outline">
						{division.name}
					</Button>
				{/each}
			</div>
		{/if}
		{#if status.hasRole("manager")}
			<div class="border-1 border-muted p-2 border-dashed rounded-md">
				<Button href="/manager" class="w-full" variant="destructive">Manager</Button>
			</div>
		{/if}
	</div>
{/if}
