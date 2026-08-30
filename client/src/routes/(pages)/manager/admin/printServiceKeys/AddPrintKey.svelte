<script lang="ts">
	import { createPrintServiceKeyCreate } from "$lib/api";
	import { Button, Card, Dialog, Input } from "@kayord/ui";
	import { toast } from "@kayord/ui/sonner";
	import { getError } from "$lib/types";
	import { status } from "$lib/stores/status.svelte";
	import { CopyIcon } from "@lucide/svelte";

	interface Props {
		open: boolean;
		refetch: () => void | Promise<void>;
	}

	let { open = $bindable(false), refetch }: Props = $props();

	const mutation = createPrintServiceKeyCreate();

	let outletId = $state(0);
	let deviceId = $state(1);
	let name = $state("");
	let fullKey = $state<string | null>(null);

	const reset = () => {
		outletId = status.value.outletId;
		deviceId = 1;
		name = "";
		fullKey = null;
	};

	const closeDialog = () => {
		open = false;
		reset();
	};

	const createKey = async () => {
		try {
			const response = await mutation.mutateAsync({
				data: {
					outletId,
					deviceId,
					name,
				},
			});
			fullKey = response.fullKey ?? null;
			await refetch();
			toast.info("Created print service key");
		} catch (err) {
			toast.error(getError(err).message);
		}
	};

	const copyKey = async () => {
		if (!fullKey) {
			return;
		}

		await navigator.clipboard.writeText(fullKey);
		toast.info("Copied key");
	};

	$effect(() => {
		if (open) {
			reset();
		}
	});
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="max-h-[98%] overflow-auto">
		<Dialog.Header>
			<Dialog.Title>Create print service key</Dialog.Title>
			<Dialog.Description>Generate a device key for the outlet print service.</Dialog.Description>
		</Dialog.Header>
		{#if fullKey}
			<div class="flex flex-col gap-2 p-0">
				<Card.Root class="border-primary">
					<Card.Header>
						<Card.Title>Save this key now</Card.Title>
						<Card.Description>You will not see this full key again after closing this dialog.</Card.Description>
					</Card.Header>
					<Card.Content>
						<div class="bg-muted rounded-md p-3 font-mono text-sm break-all">{fullKey}</div>
					</Card.Content>
				</Card.Root>
			</div>
			<Dialog.Footer class="gap-2">
				<Button onclick={copyKey}><CopyIcon /> Copy key</Button>
				<Button variant="outline" onclick={closeDialog}>Close</Button>
			</Dialog.Footer>
		{:else}
			<div class="flex flex-col gap-4 p-4">
				<label class="flex flex-col gap-2">
					<span class="text-sm font-medium">Name</span>
					<input
						bind:value={name}
						type="text"
						maxlength="200"
						placeholder="Front desk Pi"
						class="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
					/>
				</label>
				<label class="flex flex-col gap-2">
					<span class="text-sm font-medium">Outlet</span>
					<Input bind:value={outletId} type="number" />
				</label>
				<label class="flex flex-col gap-2">
					<span class="text-sm font-medium">Device ID</span>
					<Input bind:value={deviceId} type="number" min="1" />
				</label>
			</div>
			<Dialog.Footer class="gap-2">
				<Button disabled={mutation.isPending || !name.trim()} onclick={createKey}>Create key</Button>
				<Button variant="outline" onclick={closeDialog}>Cancel</Button>
			</Dialog.Footer>
		{/if}
	</Dialog.Content>
</Dialog.Root>
