<script lang="ts">
	import { Button, Dialog, Loader, toast } from "@kayord/ui";
	import { KeyRoundIcon } from "@lucide/svelte";
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
		otp = deviceAuthEvent.otp.slice(0, 4) + "-" + deviceAuthEvent.otp.slice(4);

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

<Button size="icon" variant="outline" onclick={requestToken}>
	<KeyRoundIcon />
</Button>

<Dialog.Root bind:open>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Confirm Device Code</Dialog.Title>
			<Dialog.Description>
				{#if isLoading}
					<Loader />
				{:else}
					Confirm this code from a logged in devicea
					<div class="text-5xl mt-2">
						{otp}
					</div>
				{/if}
			</Dialog.Description>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
