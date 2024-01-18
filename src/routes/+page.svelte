<script lang="ts">
	import { signIn, signOut } from "@auth/sveltekit/client";
	import { page } from "$app/stores";
	import { Button } from "@kayord/ui";

	const logout = async () => {
		await signOut();
	};
</script>

{#if $page.data.session?.user}
	<p>{$page.data.session.user.id}</p>
	<p>{$page.data.session.user.token}</p>
	<p>Signed in as {$page.data.session.user.email}</p>
	<p>Signed in as {$page.data.session.user.image}</p>
	{#if $page.data.session.user.image}
		<img
			class="rounded-md"
			src={$page.data.session.user.image}
			alt={$page.data.session.user.name}
		/>
		<span style="background-image: url('{$page.data.session.user.image}')" class="avatar" />
	{/if}
	<Button on:click={logout}>Sign out</Button>
	<img src="https://cdn.pixabay.com/photo/2017/08/11/19/36/vw-2632486_1280.png" />
{:else}
	<p>Not signed in.</p>
	<Button on:click={() => signIn("google")}>Sign in</Button>
{/if}
