<script lang="ts">
	import { Alert, Button, Card, Select } from "@kayord/ui";
	import { toast } from "@kayord/ui/sonner";
	import { Form } from "@kayord/ui/form";
	import { zod4 } from "sveltekit-superforms/adapters";
	import { defaults, superForm } from "sveltekit-superforms/client";
	import { z } from "zod";
	import { createOutletList, createUserApplyOutlet } from "$lib/api";
	import { getError } from "$lib/types";
	import { status } from "$lib/stores/status.svelte";
	import { networkInformation } from "$lib/stores/network.svelte";
	import { CircleAlertIcon, CircleCheckIcon, CircleXIcon, MessageCircleWarningIcon, UserCheckIcon } from "@lucide/svelte";
	import { requestNotificationPermission } from "$lib/util";
	import { onMount } from "svelte";
	import { hub } from "$lib/stores/hub.svelte";

	const query = createOutletList();

	export const schema = z.object({
		outletId: z.number().min(1, { message: "Please select outlet" }),
	});
	type FormSchema = z.infer<typeof schema>;

	const assignMutation = createUserApplyOutlet();

	const onSubmit = async (data: FormSchema) => {
		try {
			await assignMutation.mutateAsync({
				data: { outletId: data.outletId },
			});
			toast.info("Applied to outlet. Awaiting approval.");
			await status.getStatus();
		} catch (err) {
			toast.error(getError(err).message);
		}
	};

	const form = superForm(defaults({ outletId: status.value.outletId }, zod4(schema)), {
		SPA: true,
		validators: zod4(schema),
		onUpdate({ form }) {
			if (form.valid) {
				onSubmit(form.data);
			}
		},
	});
	const { form: formData, enhance } = form;

	const isChrome = /chrome/i.test(navigator.userAgent);
	const isAndroid = /android/i.test(navigator.userAgent);

	let hasNotifyPermission = $state(false);
	let serviceWorker: ServiceWorkerRegistration | undefined = $state();

	const getNotifyPermission = () => {
		hasNotifyPermission = Notification.permission == "granted";
	};

	const getServiceWorker = async () => {
		serviceWorker = await navigator.serviceWorker.ready;
	};

	onMount(async () => {
		getNotifyPermission();
		await getServiceWorker();
	});

	const testNotification = () => {
		navigator.serviceWorker.ready.then((registration) => {
			registration.showNotification("Test Notification", {
				body: "The very interesting detail that the test entails",
				icon: "/logo.svg",
			});
		});
	};

	const playSound = () => {
		const audio = new Audio("/sounds/notification.mp3");
		audio.play();
	};

	const outletList = $derived(query.data?.find((i) => i.id === $formData.outletId)?.name ?? "Select outlet to link to device");
</script>

{#if status.value.statusId == 0}
	<div class="p-5">
		<Alert.Root variant="destructive">
			<CircleAlertIcon />
			<Alert.Title>No access</Alert.Title>
			<Alert.Description>You have not requested access to any outlet</Alert.Description>
		</Alert.Root>
	</div>
{/if}

{#if status.value.statusId == 1}
	<div class="p-5">
		<Alert.Root>
			<CircleAlertIcon />
			<Alert.Title>Applied for access</Alert.Title>
			<Alert.Description
				>You have applied for access pending approval
				<Button onclick={() => status.getStatus()} class="mt-2"
					><UserCheckIcon />
					Check Access
				</Button>
			</Alert.Description>
		</Alert.Root>
	</div>
{/if}

<div class="m-5">
	<Card.Root>
		<Card.Header>
			<Card.Title>Setup</Card.Title>
			<Card.Description>Follow to the below items to make sure your device is compatible</Card.Description>
		</Card.Header>
		<Card.Content>
			<ul class="flex flex-col gap-2">
				<li>
					<div class="mb-2">
						1. To accept payments make sure <span class="font-bold">Halo.Go</span> is installed
					</div>
					<Button href="https://play.google.com/store/apps/details?id=za.co.synthesis.halo.mpos.go&pcampaignid=web_share">Halo.Go</Button>
				</li>
				<li class="flex items-center gap-2">
					2.
					{#if networkInformation.isOnline()}
						<CircleCheckIcon class="text-green-400" />
					{:else}
						<MessageCircleWarningIcon class="text-amber-400" />
					{/if}
					Network
				</li>

				<li class="flex items-center gap-2">
					3.
					{#if isChrome}
						<CircleCheckIcon class="text-green-400" />
					{:else}
						<CircleXIcon class="text-red-400" />
					{/if}
					Browser
				</li>

				<li class="flex items-center gap-2">
					4.
					{#if isAndroid}
						<CircleCheckIcon class="text-green-400" />
					{:else}
						<CircleXIcon class="text-red-400" />
					{/if}
					Android
				</li>

				<li class="flex items-center gap-2">
					6.
					{#if serviceWorker?.active?.state == "activated"}
						<CircleCheckIcon class="text-green-400" />
					{:else}
						<CircleXIcon class="text-red-400" />
					{/if}
					Service Worker
				</li>

				<li class="flex flex-col items-start gap-2">
					<div class="flex flex-row items-center gap-2">
						7.
						{#if hasNotifyPermission}
							<CircleCheckIcon class="text-green-400" />
						{:else}
							<CircleXIcon class="text-red-400" />
							<Button onclick={requestNotificationPermission}>Request Access</Button>
						{/if}
						Notification Access
					</div>
					<Button onclick={testNotification}>Test Notification</Button>
				</li>

				<li class="flex items-center gap-2">
					8.
					{#if hub.state == "Connected"}
						<CircleCheckIcon class="text-green-400" />
					{:else}
						<CircleXIcon class="text-red-400" />
					{/if}
					SignalR: {hub.state}
				</li>
			</ul>
		</Card.Content>
	</Card.Root>
</div>

<div class="m-5">
	<Card.Root>
		<Card.Header>
			<Card.Title>
				<h3 class="text-lg">Setup Device</h3>
			</Card.Title>
		</Card.Header>
		<Card.Content>
			<form method="POST" use:enhance>
				<Form.Field {form} name="outletId">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Outlet</Form.Label>
							<Select.Root
								type="single"
								allowDeselect={false}
								onValueChange={(v: string) => {
									v && ($formData.outletId = Number(v));
								}}
							>
								<Select.Trigger {...props}>
									{outletList}
								</Select.Trigger>
								<Select.Content class="max-h-100">
									{#each query.data ?? [] as outlet (outlet.id)}
										<Select.Item value={outlet.id.toString()}>{outlet.name}</Select.Item>
									{/each}
								</Select.Content>
							</Select.Root>
							<input hidden bind:value={$formData.outletId} name={props.name} />
						{/snippet}
					</Form.Control>
					<Form.Description>Request access to new outlet</Form.Description>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Button type="submit">Submit</Form.Button>
				<Button variant="link" href="/">Cancel</Button>
			</form>
		</Card.Content>
	</Card.Root>
</div>

<div class="m-5">
	<Card.Root>
		<Card.Header>
			<Card.Title>Sound</Card.Title>
			<Card.Description>Play Sound</Card.Description>
		</Card.Header>
		<Card.Footer>
			<Button onclick={playSound}>Play</Button>
		</Card.Footer>
	</Card.Root>
</div>
