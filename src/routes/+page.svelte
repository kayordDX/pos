<script lang="ts">
	import { Button, Loader } from "@kayord/ui";
	import { status } from "$lib/stores/status.svelte";
	import { goto } from "$app/navigation";
	import { Header } from "$lib/components/Header";

	let init = $state(false);

	const redirect = async () => {
		if (
			status.value.roles.length == 0 ||
			(status.value.roles.length == 1 && status.value.roles.includes("Guest"))
		) {
			await goto("/guest");
		} else if (status.value.roles.length == 1) {
			if (status.value.roles.includes("Waiter")) {
				await goto("/waiter");
			} else if (status.value.roles.includes("Chef")) {
				await goto("/kitchen");
			} else if (status.value.roles.includes("Manager")) {
				await goto("/manager");
			} else if (status.value.roles.includes("Pizza")) {
				await goto("/pizza");
			}
		}
		init = true;
	};

	$effect(() => {
		redirect();
	});
</script>

{#if !init}
	<Loader />
{:else}
	<Header />
	<div class="m-8 flex gap-4 flex-wrap">
		{#if status.value.roles.includes("Waiter")}
			<div class="flex flex-col">
				<Button href="/waiter">Waiter</Button>
			</div>
		{/if}
		{#if status.value.roles.includes("Bar")}
			<div class="flex flex-col">
				<Button href="/bar">Bar</Button>
			</div>
		{/if}
		{#if status.value.roles.includes("Chef")}
			<div class="flex flex-col">
				<Button href="/kitchen">Kitchen</Button>
			</div>
		{/if}
		{#if status.value.roles.includes("Pizza")}
			<div class="flex flex-col">
				<Button href="/pizza">Pizza</Button>
			</div>
		{/if}
		{#if status.value.roles.includes("Manager")}
			<div class="flex flex-col">
				<Button href="/manager">Manager</Button>
			</div>
		{/if}
	</div>
{/if}
