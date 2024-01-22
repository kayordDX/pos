<script lang="ts">
	import { Button } from "@kayord/ui";
	import { signIn } from "@auth/sveltekit/client";
	import { toast } from "@kayord/ui";

	let isLoading = false;

	const signInGoogle = async () => {
		try {
			isLoading = true;
			await signIn("google");
		} catch (err) {
			toast.error("Could not login");
		} finally {
			isLoading = false;
		}
	};
</script>

<Button on:click={signInGoogle} disabled={isLoading}>
	{isLoading ? "Signing in..." : "Sign in"}
</Button>
