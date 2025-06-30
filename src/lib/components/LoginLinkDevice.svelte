<script lang="ts">
	import {
		Button,
		Card,
		Dialog,
		Loader,
		ProgressLoading,
		Separator,
		toast,
		Tooltip,
	} from "@kayord/ui";
	import { KeyRoundIcon, ScreenShareIcon } from "@lucide/svelte";
	import { hub } from "$lib/stores/hub.svelte";
	import { HubConnectionState } from "@microsoft/signalr";
	import { signInCustomToken } from "$lib/firebase.svelte";
	import { goto } from "$app/navigation";

	let init = $state(false);
	let open = $state(false);
	let otp: string | undefined = $state(undefined);
	let isLoading = $state(false);

	// Hub State Update
	$effect(() => {
		if (init) {
			if (hub.connection?.state == undefined) {
				hub.state = HubConnectionState.Disconnected;
				return;
			}

			if (hub.connection.state !== hub.state) {
				hub.state = hub.connection.state;
			}

			return () => {
				hub.disconnect();
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
				goto("/");
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
		<div class="flex flex-col gap-2 items-center">
			<div class="p-4 bg-primary rounded-full">
				<ScreenShareIcon class="text-primary-foreground" />
			</div>

			<h1 class="text-2xl">Connect Your Device</h1>
			<p class="text-xs text-muted-foreground">Enter this code on logged in device to continue</p>
			{#if isLoading}
				<Loader />
			{:else}
				<Card.Root class="flex flex-col items-center px-6 mt-4">
					<div class="text-5xl mt-2 text-center">
						{otp}
					</div>
				</Card.Root>
				<div class="my-5 flex flex-col gap-2">
					<div class="flex flex-row gap-2 items-center">
						<div
							class="bg-primary rounded-full text-primary-foreground w-8 h-8 items-center justify-center flex"
						>
							1
						</div>
						<div class="flex flex-col gap-1 justify-center">
							<div>Open app on logged in device</div>
							<div class="text-xs text-muted-foreground">Go to account and select link account</div>
						</div>
					</div>
					<div class="flex flex-row gap-2 items-center">
						<div
							class="bg-primary rounded-full text-primary-foreground w-8 h-8 items-center justify-center flex"
						>
							2
						</div>
						<div class="flex flex-col gap-1 justify-center">
							<div>Enter Code</div>
							<div class="text-xs text-muted-foreground">Type the 6-digit code</div>
						</div>
					</div>
				</div>

				<Separator class="mb-2" />
				<div class="text-xs text-muted-foreground">Waiting for device connection...</div>
				<ProgressLoading class="h-1 bg-background" innerClass="bg-secondary" />
			{/if}
		</div>
	</Dialog.Content>
</Dialog.Root>
