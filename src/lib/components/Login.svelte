<script lang="ts">
	import { Button, Card } from "@kayord/ui";
	import { toast } from "@kayord/ui";
	import GoogleSvg from "$lib/SVG/GoogleSVG.svelte";
	import { signInGoogle } from "$lib/firebase.svelte";
	import { info } from "$lib/stores/info.svelte";

	import LoginOtp from "./LoginOtp.svelte";

	let isLoading = $state(false);

	const login = async () => {
		try {
			isLoading = true;
			await signInGoogle();
		} catch (err) {
			toast.error("Could not login");
		} finally {
			isLoading = false;
		}
	};
</script>

<div class="flex flex-col items-center justify-center mt-12">
	<Card.Root class="max-w-md w-full">
		<Card.Header class="flex flex-row">
			<div class="flex flex-col flex-grow">
				<Card.Title>POS</Card.Title>
				<Card.Description>Powered by kayord</Card.Description>
			</div>
			<!-- <LoginOtp /> -->
		</Card.Header>
		<Card.Content>
			<div class="flex flex-col items-center">
				<img
					src={`${info.isKayord() ? "/kayord" : ""}/logo.svg`}
					alt="logo"
					class="h-28 hover:animate-pulse"
				/>
				<div class="text-muted-foreground mt-4">
					Get started by signing in with your google account.
				</div>
			</div>
		</Card.Content>
		<Card.Footer class="flex flex-col items-center gap-2">
			<Button class="w-full" variant="secondary" onclick={login} disabled={isLoading}>
				<GoogleSvg class="w-5 h-5 mr-2 fill-white" />
				{isLoading ? "Signing in..." : "Google"}
			</Button>
		</Card.Footer>
	</Card.Root>
	<Button variant="link" class="text-xs text-muted-foreground" href="/privacy-policy"
		>Privacy Policy</Button
	>
</div>
