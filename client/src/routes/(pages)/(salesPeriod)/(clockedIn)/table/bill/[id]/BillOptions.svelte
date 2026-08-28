<script lang="ts">
	import { Button } from "@kayord/ui";
	import { Drawer } from "@kayord/ui/drawer";
	import { ReceiptTextIcon, MailIcon, MessageCircleMoreIcon, PrinterIcon } from "@lucide/svelte";
	import DownloadBill from "./actions/DownloadBill.svelte";
	let dialogOpen = $state(false);
	interface Props {
		bookingId: number;
	}
	let { bookingId }: Props = $props();
</script>

<Button class="w-full" onclick={() => (dialogOpen = true)}>
	<ReceiptTextIcon class="mr-2 size-4" />
	Bill
</Button>

<Drawer.Root bind:open={dialogOpen}>
	<Drawer.Trigger />
	<Drawer.Content class="fixed right-0 bottom-0 left-0 flex max-h-[96%] w-full flex-col">
		<Drawer.Header>
			<Drawer.Title>Bill Options #{bookingId}</Drawer.Title>
			<Drawer.Description>Choose bill action to perform</Drawer.Description>
		</Drawer.Header>
		<div class="mx-auto flex w-full flex-col gap-2 overflow-auto rounded-t-[10px] p-4">
			<DownloadBill {bookingId} />
			<Button class="w-full" href={`/table/bill/${bookingId}/actions/email`}>
				<MailIcon class="mr-2 size-4" />
				Email
			</Button>
			<Button class="w-full" href={`/table/bill/${bookingId}/actions/print`}>
				<PrinterIcon class="mr-2 size-4" />
				Print
			</Button>
			<Button class="w-full" href={`/table/bill/${bookingId}/actions/whatsapp`}>
				<MessageCircleMoreIcon class="mr-2 size-4" />
				Whatsapp
			</Button>
		</div>
	</Drawer.Content>
</Drawer.Root>
