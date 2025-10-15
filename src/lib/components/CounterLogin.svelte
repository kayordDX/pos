<script lang="ts">
	import { Alert, Avatar, Button, Card } from "@kayord/ui";
	import { toast } from "@kayord/ui";
	import { info } from "$lib/stores/info.svelte";
	import { createOutletCounterDelete, createUserGetCounterUsers } from "$lib/api";

	import { DoorClosedIcon, UserRoundXIcon } from "@lucide/svelte";
	import { mode } from "$lib/stores/mode.svelte";
	import { getInitials } from "$lib/util";
	import CounterPin from "./CounterPin.svelte";
	import { goto } from "$app/navigation";

	const deleteMutation = createOutletCounterDelete();

	const exitCounterMode = async () => {
		try {
			await deleteMutation.mutateAsync({ deviceId: mode.value.deviceId });
		} finally {
			mode.remove();
			goto("/");
		}
	};

	const query = createUserGetCounterUsers({ outletId: mode.value.outletId });
	const data = $derived(query.data ?? []);

	const pinLogin = (selUserId: string, selName: string) => {
		name = selName;
		userId = selUserId;
		pinOpen = true;
	};

	let pinOpen = $state(false);
	let name: string | undefined = $state();
	let userId: string | undefined = $state();
</script>

<div class="flex flex-col items-center justify-center mt-8">
	<div class="flex items-center gap-4">
		<img
			src={`${info.isKayord() ? "/kayord" : ""}/logo.svg`}
			alt="logo"
			class="h-12 hover:animate-pulse"
		/>
		<div class="flex flex-col">
			<h1 class="text-2xl text-primary">Counter Login</h1>
			<div class="text-xs text-muted-foreground">Select User to Login</div>
		</div>
	</div>
</div>

<div class="flex flex-col mt-4 p-4 gap-2">
	<div class="flex w-full items-center justify-between">
		<div class="text-lg text-muted-foreground">Select Users</div>
		{@render exitCounter()}
	</div>
	{#if data.length > 0}
		{#each data as user (user.userId)}
			<button onclick={() => pinLogin(user.userId, user.name)}>
				<Card.Root class="p-4 flex flex-row items-center gap-2">
					<Avatar.Root>
						<Avatar.Image src={user.image} alt={user.name} />
						<Avatar.Fallback>{getInitials(user.name)}</Avatar.Fallback>
					</Avatar.Root>
					<div class="font-bold">{user.name}</div>
				</Card.Root>
			</button>
		{/each}
	{:else}
		<Alert.Root>
			<UserRoundXIcon />
			<Alert.Title>No Available Users</Alert.Title>
			<Alert.Description>
				<div class="mb-4">Counter login must be enabled for users for this outlet</div>
				{@render exitCounter()}
			</Alert.Description>
		</Alert.Root>
	{/if}
</div>

<div class="flex flex-col items-center justify-center mt-8">
	<div class="flex items-center gap-2">
		<img src="/kayord/logo.svg" alt="logo" class="h-5 hover:animate-pulse" />
		<div class="text-xs text-muted-foreground">Powered by kayord</div>
	</div>
</div>

{#snippet exitCounter()}
	<Button variant="outline" onclick={exitCounterMode}>
		<DoorClosedIcon />
		Exit Counter Mode
	</Button>
{/snippet}

{#if name && userId}
	<CounterPin bind:open={pinOpen} outletId={mode.value.outletId} {name} {userId} />
{/if}
