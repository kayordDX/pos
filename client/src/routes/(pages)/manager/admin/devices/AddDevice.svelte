<script lang="ts">
	import { createDeviceCreate } from "$lib/api";
	import { Button, Dialog, Input } from "@kayord/ui";
	import { toast } from "@kayord/ui/sonner";
	import { getError } from "$lib/types";
	import DeviceKeyInstructions from "./DeviceKeyInstructions.svelte";

	interface Props {
		open: boolean;
		refetch: () => void | Promise<void>;
	}

	let { open = $bindable(false), refetch }: Props = $props();

	const mutation = createDeviceCreate();

	let name = $state("");
	let fullKey = $state<string | null>(null);

	const reset = () => {
		name = "";
		fullKey = null;
	};

	const closeDialog = () => {
		open = false;
		reset();
	};

	const createDevice = async () => {
		try {
			const response = await mutation.mutateAsync({
				data: { name },
			});
			fullKey = response.fullKey ?? null;
			await refetch();
			toast.info("Created print device");
		} catch (err) {
			toast.error(getError(err).message);
		}
	};

	$effect(() => {
		if (open) {
			reset();
		}
	});
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="max-h-[98%] overflow-auto  md:min-w-3xl">
		<Dialog.Header>
			<Dialog.Title>Create print device</Dialog.Title>
			<Dialog.Description>Add a device that runs the print service. It gets a key for the outlet.</Dialog.Description>
		</Dialog.Header>
		{#if fullKey}
			<div class="flex flex-col gap-2 p-0">
				<DeviceKeyInstructions {fullKey} />
			</div>
			<Dialog.Footer>
				<Button variant="outline" onclick={closeDialog}>Done</Button>
			</Dialog.Footer>
		{:else}
			<div class="flex flex-col gap-4 p-4">
				<label class="flex flex-col gap-2">
					<span class="text-sm font-medium">Name</span>
					<Input
						bind:value={name}
						type="text"
						maxlength={200}
						placeholder="Front desk Pi"
						onkeydown={(event) => {
							if (event.key === "Enter") {
								event.preventDefault();
								void createDevice();
							}
						}}
					/>
				</label>
			</div>
			<Dialog.Footer class="gap-2">
				<Button disabled={mutation.isPending || !name.trim()} onclick={createDevice}>Create device</Button>
				<Button variant="outline" onclick={closeDialog}>Cancel</Button>
			</Dialog.Footer>
		{/if}
	</Dialog.Content>
</Dialog.Root>
