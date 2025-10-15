<script lang="ts">
	import { toCanvas } from "qrcode";
	import { createWhatsappStatus, createWhatsappQrCode, createWhatsappRestart } from "$lib/api";
	import { Button, Card } from "@kayord/ui";
	import { toast } from "@kayord/ui/sonner";
	import { CheckIcon, XIcon } from "@lucide/svelte";

	const query = createWhatsappStatus();
	const qrQuery = $derived(createWhatsappQrCode({ query: { enabled: false } }));
	const restartWhatsapp = createWhatsappRestart({ query: { enabled: false } });

	const restart = async () => {
		await restartWhatsapp.refetch();
		await query.refetch();
	};

	let canvas: HTMLCanvasElement | undefined = $state(undefined);

	$effect(() => {
		if (qrQuery.data?.qr) {
			if (canvas) canvas.hidden = false;
			toCanvas(canvas, qrQuery.data?.qr, function (error) {
				if (error) console.error(error);
				console.log("success!");
			});
		} else {
			if (canvas) canvas.hidden = true;
		}
	});

	const generateQrCode = async () => {
		await qrQuery.refetch();
		if (qrQuery.data && qrQuery.data.success != true) {
			toast.error("Could not generate QR code");
		}
	};

	// 	{
	//   "success": true,
	//   "state": "CONNECTED",
	//   "message": "session_connected"
	// }
</script>

<div class="m-2">
	<Card.Root>
		<Card.Header>
			<Card.Title>Whatsapp</Card.Title>
			<Card.Description>Whatsapp Status</Card.Description>
		</Card.Header>
		<Card.Content>
			<div class="flex items-center gap-2">
				Status: {#if query.data?.success}
					<CheckIcon class="text-secondary" />
				{:else}
					<XIcon class="text-primary" />
				{/if}
			</div>
			<div>Message: {query.data?.message}</div>
			<div>State: {query.data?.state}</div>
		</Card.Content>
		<Card.Footer class="flex flex-col gap-2">
			<Button class="w-full" onclick={() => query.refetch()}>Refresh</Button>
			<Button
				class="w-full"
				variant="destructive"
				onclick={restart}
				disabled={restartWhatsapp.isLoading}
			>
				Restart
			</Button>
		</Card.Footer>
	</Card.Root>

	<Card.Root class="mt-4">
		<Card.Header>
			<Card.Title>Qr</Card.Title>
			<Card.Description>Whatsapp Status</Card.Description>
		</Card.Header>
		<Card.Content>
			<canvas id="canvas" bind:this={canvas} class="rounded-sm mt-4 size-0"></canvas>
		</Card.Content>
		<Card.Footer class="flex flex-col gap-2">
			<Button disabled={qrQuery.isLoading} onclick={generateQrCode} class="w-full">
				Generate QR Code
			</Button>
		</Card.Footer>
	</Card.Root>
</div>
