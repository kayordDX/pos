<script lang="ts">
	import { Button, Card, Form, Select, toast } from "@kayord/ui";
	import { zod } from "sveltekit-superforms/adapters";
	import { defaults, superForm } from "sveltekit-superforms/client";
	import { z } from "zod";
	import { client, createOutletList } from "$lib/api";
	import { getError } from "$lib/types";
	import { goto } from "$app/navigation";
	import { status } from "$lib/stores/status";
	import { networkInformationStore } from "$lib/stores/network";
	import {
		CheckCircleIcon,
		CircleXIcon,
		CrossIcon,
		MessageCircleWarningIcon,
		StopCircleIcon,
	} from "lucide-svelte";
	import { hub } from "$lib/stores/hub";
	import { requestNotificationPermission } from "$lib/util";

	const query = createOutletList();

	export const schema = z.object({
		outletId: z.number().min(1, { message: "Please select outlet" }),
	});
	type FormSchema = z.infer<typeof schema>;

	const onSubmit = async (data: FormSchema) => {
		try {
			const { response } = await client.POST("/user/assignOutlet", {
				body: { outletId: data.outletId },
			});
			if (response.ok) {
				toast.info("Successfully updated outlet");
				await status.getStatus();
				await goto("/", { replaceState: true, invalidateAll: true });
			} else {
				toast.error("Could not set outlet");
			}
		} catch (err) {
			console.log(err);
			toast.error(getError(err).message);
		}
	};

	const form = superForm(defaults({ outletId: $status.outletId }, zod(schema)), {
		SPA: true,
		validators: zod(schema),
		onUpdate({ form }) {
			if (form.valid) {
				onSubmit(form.data);
			}
		},
	});
	const { form: formData, enhance } = form;

	const isChrome = /chrome/i.test(navigator.userAgent);
	const isAndroid = /android/i.test(navigator.userAgent);
</script>

<Card.Root class="p-5 m-5">
	<Card.Header>
		<Card.Title>Setup</Card.Title>
		<Card.Description>
			Follow to the below items to make sure your device is compatible
		</Card.Description>
	</Card.Header>
	<Card.Content>
		<ul class="flex flex-col gap-2">
			<li>
				<div class="mb-2">
					1. To accept payments make sure <span class="font-bold">Halo.Go</span> is installed
				</div>
				<Button
					href="https://play.google.com/store/apps/details?id=za.co.synthesis.halo.mpos.go&pcampaignid=web_share"
				>
					Halo.Go
				</Button>
			</li>
			<li class="flex gap-2 items-center">
				2.
				{#if $networkInformationStore.state == "subscribed"}
					<CheckCircleIcon class="text-green-400" />
				{:else}
					<MessageCircleWarningIcon class="text-amber-400" />
				{/if}
				Network
			</li>
			<li class="flex gap-2 items-center">
				3.
				{#if isChrome}
					<CheckCircleIcon class="text-green-400" />
				{:else}
					<CircleXIcon class="text-red-400" />
				{/if}
				Browser
			</li>
			<li class="flex gap-2 items-center">
				4.
				{#if isAndroid}
					<CheckCircleIcon class="text-green-400" />
				{:else}
					<CircleXIcon class="text-red-400" />
				{/if}
				Android
			</li>
			<li class="flex gap-2 items-center">
				5.
				{#if $hub?.state == "Connected"}
					<CheckCircleIcon class="text-green-400" />
				{:else}
					<CircleXIcon class="text-red-400" />
				{/if}
				SignalR
			</li>
			<li class="flex gap-2 items-center">
				6.
				{#await navigator.serviceWorker.ready}
					Loading...
				{:then worker}
					{#if worker.active?.state == "activated"}
						<CheckCircleIcon class="text-green-400" />
					{:else}
						<CircleXIcon class="text-red-400" />
					{/if}
				{/await}

				Service Worker
			</li>
			<li class="flex gap-2 items-center">
				7.
				{#if Notification.permission == "granted"}
					<CheckCircleIcon class="text-green-400" />
				{:else}
					<CircleXIcon class="text-red-400" />
					<Button on:click={requestNotificationPermission}>Request Access</Button>
				{/if}
				Notification Access
			</li>
		</ul>
	</Card.Content>
</Card.Root>

<Card.Root class="p-5 m-5">
	<Card.Header>
		<Card.Title>Setup Device</Card.Title>
	</Card.Header>
	<Card.Content>
		<form method="POST" use:enhance>
			<Form.Field {form} name="outletId">
				<Form.Control let:attrs>
					<Form.Label>Outlet</Form.Label>
					<Select.Root
						selected={{
							value: $formData.outletId,
							label: $query.data?.find((i) => i.id === $formData.outletId)?.name,
						}}
						onSelectedChange={(v) => {
							v && ($formData.outletId = v.value);
						}}
					>
						<Select.Trigger {...attrs}>
							<Select.Value placeholder="Select outlet to link to device" />
						</Select.Trigger>
						<Select.Content>
							{#each $query.data ?? [] as outlet}
								<Select.Item value={outlet.id}>{outlet.name}</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
					<input hidden bind:value={$formData.outletId} name={attrs.name} />
				</Form.Control>
				<Form.Description>The current outlet this device is linked to.</Form.Description>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Button type="submit">Submit</Form.Button>
			<Button variant="link" href="/">Cancel</Button>
		</form>
	</Card.Content>
</Card.Root>
