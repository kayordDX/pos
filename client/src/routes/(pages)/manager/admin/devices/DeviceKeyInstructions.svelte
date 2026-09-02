<script lang="ts">
	import { Button, Card } from "@kayord/ui";
	import { CopyIcon } from "@lucide/svelte";
	import { toast } from "@kayord/ui/sonner";

	interface Props {
		fullKey: string;
	}
	let { fullKey }: Props = $props();

	const copyKey = async () => {
		await navigator.clipboard.writeText(fullKey);
		toast.info("Copied key");
	};

	const copyConfig = async () => {
		await navigator.clipboard.writeText(`POS_BASE_URL=<your public API base URL>\nPOS_API_KEY=${fullKey}`);
		toast.info("Copied print service config");
	};
</script>

<Card.Root class="border-primary">
	<Card.Header>
		<Card.Title>Save this key now</Card.Title>
		<Card.Description>You will not see this full key again after closing this dialog.</Card.Description>
	</Card.Header>
	<Card.Content class="flex flex-col gap-4">
		<div class="bg-muted rounded-md p-3 font-mono text-sm break-all">{fullKey}</div>
		<div class="flex flex-col gap-2">
			<div class="text-sm font-medium">Run the print service with</div>
			<div class="bg-muted rounded-md p-3 font-mono text-xs">
				<div>POS_BASE_URL=&lt;your public API base URL&gt;</div>
				<div>POS_API_KEY={fullKey}</div>
			</div>
			<p class="text-muted-foreground text-xs">
				The device connects <span class="font-medium">outbound</span> to <span class="font-mono">/printer-hub</span> using this key — no open inbound ports or Redis
				access needed.
			</p>
		</div>
	</Card.Content>
	<Card.Footer class="gap-2">
		<Button onclick={copyKey}><CopyIcon /> Copy key</Button>
		<Button variant="outline" onclick={copyConfig}><CopyIcon /> Copy config</Button>
	</Card.Footer>
</Card.Root>
