<script lang="ts">
	import { Button, Card, Dialog, Loader, ProgressLoading, Separator, Tooltip } from "@kayord/ui";
	import { toast } from "@kayord/ui/sonner";
	import { KeyRoundIcon, ScreenShareIcon } from "@lucide/svelte";
	import { hub } from "$lib/stores/hub.svelte";
	import { HubConnectionState } from "@microsoft/signalr";
	import { signInCustomToken, session } from "$lib/firebase.svelte";
	import { goto } from "$app/navigation";
	import { resolve } from "$app/paths";
	import { untrack } from "svelte";

	let init = $state(false);
	let open = $state(false);
	let otp: string | undefined = $state(undefined);
	let isLoading = $state(false);

	// Disconnect the device-link connection when the component unmounts.
	// The hub is a shared singleton — if the user is logged in, Hub.svelte owns
	// the connection, so bring it straight back up.
	$effect(() => {
		if (init) {
			return () => {
				untrack(() => {
					hub.disconnect();
					if (session.user) {
						hub.init();
					}
				});
			};
		}
	});

	const deviceAuth = async (deviceAuthEvent: { otp: string; token?: string }) => {
		otp = deviceAuthEvent.otp.slice(0, 3) + "-" + deviceAuthEvent.otp.slice(3);

		// Do Authentication
		if (deviceAuthEvent.token) {
			isLoading = true;
			otp = undefined;

			try {
				await signInCustomToken(deviceAuthEvent.token);
				goto(resolve("/"));
			} catch (err) {
				toast.error("Could not login");
				console.error(err);
			} finally {
				isLoading = false;
			}
		}
	};

	$effect(() => {
		if (hub.state == HubConnectionState.Connected) {
			hub.connection?.invoke("GetToken");
			hub.on("DeviceAuth", deviceAuth);
			isLoading = false;
			return () => {
				hub.off("DeviceAuth", deviceAuth);
			};
		}
	});

	const requestToken = async () => {
		if (!init) {
			isLoading = true;
			await hub.init();
		}
		init = true;
		open = true;
	};
</script>

<Tooltip.Provider>
	<Tooltip.Root>
		<Tooltip.Trigger>
			<Button size="icon" variant="outline" onclick={requestToken}>
				<KeyRoundIcon />
			</Button>
		</Tooltip.Trigger>
		<Tooltip.Content>
			<p>Link Account</p>
		</Tooltip.Content>
	</Tooltip.Root>
</Tooltip.Provider>

<Dialog.Root bind:open>
	<Dialog.Content>
		<div class="flex flex-col items-center gap-2">
			<div class="bg-primary rounded-full p-4">
				<ScreenShareIcon class="text-primary-foreground" />
			</div>

			<h1 class="text-2xl">Connect Your Device</h1>
			<p class="text-muted-foreground text-xs">Enter this code on logged in device to continue</p>
			{#if isLoading}
				<Loader />
			{:else}
				<Card.Root class="mt-4 flex flex-col items-center px-6">
					<div class="mt-2 text-center text-5xl">
						{otp}
					</div>
				</Card.Root>
				<div class="my-5 flex flex-col gap-2">
					<div class="flex flex-row items-center gap-2">
						<div class="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full">1</div>
						<div class="flex flex-col justify-center gap-1">
							<div>Open app on logged in device</div>
							<div class="text-muted-foreground text-xs">Go to account and select link account</div>
						</div>
					</div>
					<div class="flex flex-row items-center gap-2">
						<div class="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full">2</div>
						<div class="flex flex-col justify-center gap-1">
							<div>Enter Code</div>
							<div class="text-muted-foreground text-xs">Type the 6-digit code</div>
						</div>
					</div>
				</div>

				<Separator class="mb-2" />
				<div class="text-muted-foreground text-xs">Waiting for device connection...</div>
				<ProgressLoading class="bg-background h-1" innerClass="bg-secondary" />
			{/if}
		</div>
	</Dialog.Content>
</Dialog.Root>
