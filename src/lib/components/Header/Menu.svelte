<script lang="ts">
	import { Avatar, Badge, Button, DropdownMenu } from "@kayord/ui";
	import {
		LogOutIcon,
		MoonIcon,
		SunIcon,
		WrenchIcon,
		NetworkIcon,
		InboxIcon,
	} from "@lucide/svelte";
	import { getInitials } from "$lib/util";
	import { toggleMode, mode } from "@kayord/ui/mode-watcher";
	import { logout, session } from "$lib/firebase.svelte";
	import { networkInformationStore } from "$lib/stores/network";
	import { goto } from "$app/navigation";

	let hasNotification = $state(false);
</script>

<!-- <Button
	class={`bg-background text-primary hover:text-primary-foreground ${hasNotification ? "animate-pulse" : ""}`}
>
	<InboxIcon />
</Button> -->

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		<div class="relative">
			<Avatar.Root>
				<Avatar.Image src={session.user?.photoURL} alt="profile" />
				<Avatar.Fallback class="bg-primary text-primary-foreground">
					{getInitials(session.user?.displayName ?? "")}
				</Avatar.Fallback>
			</Avatar.Root>
			<div
				class={`size-3 rounded-md absolute top-0 right-0 ${$networkInformationStore.connectivity == "online" ? "bg-green-400" : $networkInformationStore.connectivity == "offline" ? "bg-red-400 animate-pulse" : "bg-muted-foreground"}`}
			></div>
		</div>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Label>{session.user?.displayName ?? "My Account"}</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<DropdownMenu.Group>
			<DropdownMenu.Item onclick={() => goto("/setup")}>
				<WrenchIcon class="mr-2 h-4 w-4" />Setup Device
			</DropdownMenu.Item>
			<DropdownMenu.Item onclick={() => goto("/network")}>
				<NetworkIcon class="mr-2 h-4 w-4" />Network Information
			</DropdownMenu.Item>
			<DropdownMenu.Item onclick={toggleMode}>
				{#if $mode == "light"}
					<SunIcon class="mr-2 h-4 w-4" />
				{:else}
					<MoonIcon class="mr-2 h-4 w-4" />
				{/if}
				Toggle Theme
			</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Item onclick={logout}>
			<LogOutIcon class="mr-2 h-4 w-4" />
			<span>Log out</span>
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
