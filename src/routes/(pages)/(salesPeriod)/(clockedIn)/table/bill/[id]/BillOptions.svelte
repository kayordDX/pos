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
	<ReceiptTextIcon class="size-4 mr-2" />
	Bill
</Button>

<Drawer.Root bind:open={dialogOpen}>
	<Drawer.Trigger />
	<Drawer.Content class="flex flex-col fixed bottom-0 left-0 right-0 max-h-[96%] w-full">
		<Drawer.Header>
			<Drawer.Title>Bill Options #{bookingId}</Drawer.Title>
			<Drawer.Description>Choose bill action to perform</Drawer.Description>
		</Drawer.Header>
		<div class="mx-auto flex w-full flex-col overflow-auto rounded-t-[10px] p-4 gap-2">
			<DownloadBill {bookingId} />
			<Button class="w-full" href={`/table/bill/${bookingId}/actions/email`}>
				<MailIcon class="size-4 mr-2" />
				Email
			</Button>
			<Button class="w-full" href={`/table/bill/${bookingId}/actions/print`}>
				<PrinterIcon class="size-4 mr-2" />
				Print
			</Button>
			<Button class="w-full" href={`/table/bill/${bookingId}/actions/whatsapp`}>
				<MessageCircleMoreIcon class="size-4 mr-2" />
				Whatsapp
			</Button>
		</div>
	</Drawer.Content>
</Drawer.Root>
