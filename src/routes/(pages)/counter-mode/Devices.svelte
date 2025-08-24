<script lang="ts">
	import { Alert, AlertDialog, Button, Card, toast } from "@kayord/ui";
	import { createOutletCounterGetAll } from "$lib/api";
	import { stringToFDate } from "$lib/util";
	import { CircleAlertIcon, XIcon } from "@lucide/svelte";
	import { createOutletCounterDelete } from "$lib/api";
	import { getError } from "$lib/types";

	const query = createOutletCounterGetAll();
	const data = $derived($query.data ?? []);
	const deleteMutation = createOutletCounterDelete();

	let deviceId: string | undefined = $state();
	let open: boolean = $state(false);

	const removeCounterDevice = async () => {
		try {
			if (deviceId === undefined) {
				toast.info("No device id");
				return;
			}
			await $deleteMutation.mutateAsync({ deviceId });
			toast.info("Removed counter device");
			$query.refetch();
		} catch (err) {
			toast.error(getError(err).message);
		} finally {
			deviceId = undefined;
			open = false;
		}
	};
</script>

<Card.Root class="p-5 m-5">
	<Card.Header>
		<Card.Title>Outlet Counter Devices</Card.Title>
		<Card.Description>Current active counter mode devices</Card.Description>
	</Card.Header>
	<Card.Content class="flex flex-col gap-2">
		{#if data.length == 0}
			<Alert.Root>
				<CircleAlertIcon />
				<Alert.Title>No Counter Devices</Alert.Title>
				<Alert.Description>This outlet does not have any active counter devices.</Alert.Description>
			</Alert.Root>
		{/if}
		{#each data as counter (counter.id)}
			<Card.Root class="flex flex-row items-center gap-2 justify-between p-4">
				<div>
					<div class="font-bold">{counter.deviceName}</div>
					<div class="text-xs text-muted-foreground">
						Created: {stringToFDate(counter.created)}
					</div>
				</div>
				<Button
					size="icon"
					variant="destructive"
					onclick={() => {
						deviceId = counter.id;
						open = true;
					}}
				>
					<XIcon />
				</Button>
			</Card.Root>
		{/each}
	</Card.Content>
	<Card.Footer class="mt-4 text-xs text-muted-foreground"
		>Please note removing devices from counter devices list will stop all counter mode logins from
		the device
	</Card.Footer>
</Card.Root>

<AlertDialog.Root bind:open>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
			<AlertDialog.Description>
				Users will not be able to login to device using counter mode for this device.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action
				class="bg-destructive text-destructive-foreground"
				onclick={removeCounterDevice}
			>
				Delete
			</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
