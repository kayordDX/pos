<script lang="ts">
	import { signIn, signOut } from "@auth/sveltekit/client";
	import { page } from "$app/stores";
	import { Button } from "@kayord/ui";
	import type { PageData } from "./$types";
	export let data: PageData;

	const logout = async () => {
		await signOut();
	};
</script>

{#if $page.data.session?.user}
	{#if $page.data.session.user.image}
		<img
			class="rounded-md"
			src={$page.data.session.user.image}
			alt={$page.data.session.user.name}
		/>
		<span style="background-image: url('{$page.data.session.user.image}')" class="avatar" />
	{/if}
	<Button on:click={logout}>Sign out</Button>
{:else}
	<p>Not signed in.</p>
	<Button on:click={() => signIn("google")}>Sign in</Button>
{/if}

{JSON.stringify(data)}
