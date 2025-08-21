<script lang="ts">
	import { Avatar, Badge, Button, DropdownMenu } from "@kayord/ui";
	import {
		LogOutIcon,
		MoonIcon,
		SunIcon,
		WrenchIcon,
		NetworkIcon,
		InboxIcon,
		ArrowRightLeft,
		ShieldUserIcon,
		TvMinimalIcon,
	} from "@lucide/svelte";
	import { getInitials } from "$lib/util";
	import { toggleMode, mode } from "@kayord/ui/mode-watcher";
	import { logout, session } from "$lib/firebase.svelte";
	import { networkInformation } from "$lib/stores/network.svelte";
	import { goto } from "$app/navigation";
	import { status } from "$lib/stores/status.svelte";
</script>

<Button
	class={`bg-background/40 text-primary hover:text-primary-foreground ${status.value.hasNotification ? "animate-pulse bg-destructive text-primary-foreground" : ""}`}
	href="/tasks"
>
	<InboxIcon />
</Button>

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
				class={`size-3 rounded-md absolute top-0 right-0 ${networkInformation.isOnline() ? "bg-success" : networkInformation.isOnline() ? "bg-destructive animate-pulse" : "bg-muted-foreground"}`}
			></div>
		</div>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Label>{session.user?.displayName ?? "My Account"}</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<DropdownMenu.Group>
			<DropdownMenu.Item onclick={() => goto("/switch")}>
				<ArrowRightLeft class="mr-2 h-4 w-4" />Switch Outlet
			</DropdownMenu.Item>
			<DropdownMenu.Item onclick={() => goto("/setup")}>
				<WrenchIcon class="mr-2 h-4 w-4" />Setup Device
			</DropdownMenu.Item>
			{#if status.hasFeature("counter mode")}
				<DropdownMenu.Item onclick={() => goto("/counter-mode")}>
					<TvMinimalIcon class="mr-2 h-4 w-4" />Counter Mode
				</DropdownMenu.Item>
			{/if}
			<DropdownMenu.Item onclick={() => goto("/link-account")}>
				<ShieldUserIcon class="mr-2 h-4 w-4" />Link Account
			</DropdownMenu.Item>
			<DropdownMenu.Item onclick={() => goto("/network")}>
				<NetworkIcon class="mr-2 h-4 w-4" />Network Information
			</DropdownMenu.Item>
			<!-- <DropdownMenu.Item onclick={toggleMode}>
				{#if mode.current == "light"}
					<SunIcon class="mr-2 h-4 w-4" />
				{:else}
					<MoonIcon class="mr-2 h-4 w-4" />
				{/if}
				Toggle Theme
			</DropdownMenu.Item> -->
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Item onclick={logout}>
			<LogOutIcon class="mr-2 h-4 w-4" />
			<span>Log out</span>
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
