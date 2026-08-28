<script lang="ts">
	import { Alert, Avatar, Button, Card } from "@kayord/ui";
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

	const query = createUserGetCounterUsers(() => ({ outletId: mode.value.outletId }));
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

<div class="mt-8 flex flex-col items-center justify-center">
	<div class="flex items-center gap-4">
		<img src="/logo.svg" alt="logo" class="h-12 hover:animate-pulse" />
		<div class="flex flex-col">
			<h1 class="text-primary text-2xl">Counter Login</h1>
			<div class="text-muted-foreground text-xs">Select User to Login</div>
		</div>
	</div>
</div>

<div class="mt-4 flex flex-col gap-2 p-4">
	<div class="flex w-full items-center justify-between">
		<div class="text-muted-foreground text-lg">Select Users</div>
		{@render exitCounter()}
	</div>
	{#if data.length > 0}
		{#each data as user (user.userId)}
			<button onclick={() => pinLogin(user.userId, user.name)}>
				<Card.Root class="flex flex-row items-center gap-2 p-4">
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

<div class="mt-8 flex flex-col items-center justify-center">
	<div class="flex items-center gap-2">
		<img src="/kayord/logo.svg" alt="logo" class="h-5 hover:animate-pulse" />
		<div class="text-muted-foreground text-xs">Powered by kayord</div>
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
