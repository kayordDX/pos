<script lang="ts">
	import { downloadPdf, downloadFile } from "$lib/api/downloader.svelte";
	import { getError } from "$lib/types";
	import { Button, Loader, toast } from "@kayord/ui";
	import { DownloadIcon } from "@lucide/svelte";

	interface Props {
		bookingId: number;
	}
	let { bookingId }: Props = $props();

	let isLoading = $state(false);

	const downloadBill = async () => {
		try {
			isLoading = true;
			const response = await downloadPdf(bookingId);
			if (response.ok) {
				await downloadFile(response, `bill-${bookingId}.pdf`);
			} else {
				toast.error("Failed to download bill");
			}
		} catch (error) {
			toast.error(getError(error).message);
		} finally {
			isLoading = false;
		}
	};
</script>

<Button class="w-full" onclick={downloadBill} disabled={isLoading}>
	{#if isLoading}
		<Loader class="size-4 mr-2" />
	{:else}
		<DownloadIcon class="size-4 mr-2" />
	{/if}
	Download
</Button>
