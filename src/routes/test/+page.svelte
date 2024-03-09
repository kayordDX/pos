<script lang="ts">
	import { Button } from "@kayord/ui";
	import { logout, signInGoogle } from "$lib/firebase";
	import { session } from "$lib/firebase";

	let token: string | undefined = undefined;
	const getToken = async () => {
		token = await $session?.getIdToken();
	};
</script>

<Button on:click={signInGoogle}>Login</Button>
<Button on:click={logout}>Sign out</Button>
{JSON.stringify($session)}

<Button on:click={getToken}>Token</Button>
{token}
