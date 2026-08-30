<script lang="ts">
	import { createPayPayConfigSetActive, type EntitiesHaloConfig, createPayPayConfigDelete, createPayPayConfigTestConfig } from "$lib/api";
	import { status } from "$lib/stores/status.svelte";
	import { getError } from "$lib/types";
	import { Card, Button } from "@kayord/ui";
	import { toast } from "@kayord/ui/sonner";
	import { CheckIcon, Trash2Icon, XIcon, TestTubeDiagonalIcon } from "@lucide/svelte";

	interface Props {
		config: EntitiesHaloConfig;
		refetch: () => void;
	}
	let { config, refetch }: Props = $props();
	let isActivating = $state(false);
	let isDeleting = $state(false);
	let isTesting = $state(false);

	const activeMutation = createPayPayConfigSetActive();
	const deleteMutation = createPayPayConfigDelete();
	const testMutation = createPayPayConfigTestConfig();

	const setActive = async () => {
		try {
			isActivating = true;
			await activeMutation.mutateAsync({
				data: {
					id: config.id,
					isEnabled: !config.isEnabled,
					outletId: status.value.outletId,
				},
			});
			await refetch();
			toast.info("Activate Halo Config Updated");
		} catch (err) {
			toast.error(getError(err).message);
		} finally {
			isActivating = false;
		}
	};

	const deleteConfig = async () => {
		try {
			isDeleting = true;
			await deleteMutation.mutateAsync({
				id: config.id,
			});
			await refetch();
			toast.info("Deleted Halo Config");
		} catch (err) {
			toast.error(getError(err).message);
		} finally {
			isDeleting = false;
		}
	};

	const testConfig = async () => {
		try {
			isTesting = true;
			const result = await testMutation.mutateAsync({
				data: { id: config.id },
			});
			const message = result ? "Config Tested and XAPIKey Authenticated Successfully" : "Halo Config Test Failed";
			toast.info(message);
		} catch (err) {
			toast.error(getError(err).message);
		} finally {
			isTesting = false;
		}
	};
</script>

<Card.Root class="data-[enabled=true]:border-primary p-4" data-enabled={config.isEnabled}>
	<div class="flex flex-col items-center justify-between gap-2 sm:flex-row">
		<div class={`flex h-14 w-14 items-center justify-center rounded-full ${config.isEnabled ? "bg-primary" : "bg-secondary"}`}>
			{#if config.isEnabled}
				<CheckIcon class="text-primary-foreground" />
			{:else}
				<XIcon class="text-secondary-foreground" />
			{/if}
		</div>
		<div class="flex flex-grow flex-col gap-2">
			<div>
				<span class="text-muted-foreground">Merchant Id:</span>
				{config.merchantId}
			</div>
			<div>
				<span class="text-muted-foreground">Created At:</span>
				{config.created}
			</div>
		</div>

		<div class="flex w-full flex-col gap-2 sm:w-fit">
			{#if !config.isEnabled}
				<Button size="sm" variant="destructive" class="w-full" onclick={deleteConfig} disabled={isDeleting}>
					<Trash2Icon />
					Delete
				</Button>
			{/if}
			<Button size="sm" disabled={isActivating} class="w-full" onclick={setActive}>
				{#if config.isEnabled}
					<XIcon />
				{:else}
					<CheckIcon />
				{/if}
				{config.isEnabled ? "Deactivate" : "Activate"}
			</Button>
			<Button size="sm" variant="outline" class="w-full" onclick={testConfig} disabled={isTesting}>
				<TestTubeDiagonalIcon />
				Test
			</Button>
		</div>
	</div>
</Card.Root>
