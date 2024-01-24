<script lang="ts">
	import { Button, Card } from "@kayord/ui";
	import { signIn } from "@auth/sveltekit/client";
	import { toast } from "@kayord/ui";
	import { LogInIcon } from "lucide-svelte";
	import GoogleSvg from "$lib/SVG/GoogleSVG.svelte";

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

<div class="mt-8 flex items-center justify-center">
	<Card.Root class="max-w-md w-full">
		<Card.Header class="flex flex-row">
			<div class="flex flex-col flex-grow">
				<Card.Title>POS</Card.Title>
				<Card.Description>Powered by kayord</Card.Description>
			</div>
			<img src="/logo.svg" alt="kayord-logo" class="h-8 float-right" />
		</Card.Header>
		<Card.Content>Get started by signing in with your google account.</Card.Content>
		<Card.Footer>
			<Button class="w-full" variant="secondary" on:click={signInGoogle} disabled={isLoading}>
				<GoogleSvg class="w-5 h-5 mr-2 fill-white" />
				{isLoading ? "Signing in..." : "Google"}
			</Button>
		</Card.Footer>
	</Card.Root>
</div>
