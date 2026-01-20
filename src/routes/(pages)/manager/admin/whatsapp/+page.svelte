<script lang="ts">
	import {
		createWhatsappStatus,
		createWhatsappQrCode,
		createWhatsappLogout,
		createWhatsappConnect,
	} from "$lib/api";
	import { Button, Card, Loader } from "@kayord/ui";
	import { toast } from "@kayord/ui/sonner";
	import {
		CheckIcon,
		LogOutIcon,
		NetworkIcon,
		QrCodeIcon,
		RefreshCwIcon,
		XIcon,
	} from "@lucide/svelte";

	const query = createWhatsappStatus();
	const qrQuery = $derived(createWhatsappQrCode(() => ({ query: { enabled: false } })));

	const logoutMutation = createWhatsappLogout();
	const connectMutation = createWhatsappConnect();

	const logout = async () => {
		try {
			await logoutMutation.mutateAsync();
			toast.success("Whatsapp logged out successfully");
			await query.refetch();
		} catch (err) {
			toast.error("Could not logout whatsapp");
		}
	};

	const connect = async () => {
		try {
			await connectMutation.mutateAsync();
			toast.success("Whatsapp connected successfully");
			await query.refetch();
		} catch (err) {
			toast.error("Could not connect whatsapp");
		}
	};

	const generateQrCode = async () => {
		await qrQuery.refetch();
		if (qrQuery.data && qrQuery.data.success != true) {
			toast.error("Could not generate QR code");
		}
	};
</script>

<div class="m-2">
	<Card.Root>
		<Card.Header>
			<Card.Title>Whatsapp</Card.Title>
			<Card.Description>Whatsapp Status</Card.Description>
		</Card.Header>
		<Card.Content>
			<div class="flex items-center gap-2">
				Connected: {#if query.data?.data?.connected}
					<CheckIcon class="text-success" />
				{:else}
					<XIcon class="text-destructive" />
				{/if}
			</div>
			<div class="flex items-center gap-2">
				Logged In: {#if query.data?.data?.loggedIn}
					<CheckIcon class="text-success" />
				{:else}
					<XIcon class="text-destructive" />
				{/if}
			</div>
			<div class="text-sm text-muted-foreground">Success: {query.data?.success}</div>
			<div class="text-sm text-muted-foreground">Code: {query.data?.code}</div>
		</Card.Content>
		<Card.Footer class="flex flex-col gap-2">
			<Button class="w-full" variant="outline" onclick={() => query.refetch()}>
				<RefreshCwIcon />
				Refresh
			</Button>
			<Button
				class="w-full"
				variant="default"
				onclick={connect}
				disabled={connectMutation.isPending}
			>
				<NetworkIcon />
				Connect
			</Button>
			<Button
				class="w-full"
				variant="destructive"
				onclick={logout}
				disabled={logoutMutation.isPending}
			>
				<LogOutIcon />
				Logout
			</Button>
		</Card.Footer>
	</Card.Root>

	<Card.Root class="mt-4">
		<Card.Header>
			<Card.Title>Qr</Card.Title>
			<Card.Description>Whatsapp Status</Card.Description>
		</Card.Header>
		<Card.Content>
			{#if qrQuery.isLoading}
				<Loader />
			{:else if qrQuery.data?.data?.qrCode}
				<img src={qrQuery.data?.data?.qrCode} alt="Whatsapp QR Code" />
			{/if}
		</Card.Content>
		<Card.Footer class="flex flex-col gap-2">
			<Button disabled={qrQuery.isLoading} onclick={generateQrCode} class="w-full">
				<QrCodeIcon />
				Get QR Code
			</Button>
		</Card.Footer>
	</Card.Root>
</div>
