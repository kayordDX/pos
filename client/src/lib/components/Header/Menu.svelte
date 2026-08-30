<script lang="ts">
	import { Avatar, Button, DropdownMenu } from "@kayord/ui";
	import { LogOutIcon, WrenchIcon, NetworkIcon, InboxIcon, ArrowRightLeft, ShieldUserIcon, TvMinimalIcon } from "@lucide/svelte";
	import { getInitials } from "$lib/util";
	import { logout, session } from "$lib/firebase.svelte";
	import { networkInformation } from "$lib/stores/network.svelte";
	import { goto } from "$app/navigation";
	import { status } from "$lib/stores/status.svelte";
	import { resolve } from "$app/paths";
</script>

<Button
	class={`bg-background/40 text-primary hover:text-primary-foreground ${status.value.hasNotification ? "bg-destructive text-primary-foreground animate-pulse" : ""}`}
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
				class={`absolute top-0 right-0 size-3 rounded-md ${networkInformation.isOnline() ? "bg-success" : networkInformation.isOnline() ? "bg-destructive animate-pulse" : "bg-muted-foreground"}`}
			></div>
		</div>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-48">
		<DropdownMenu.Label>{session.user?.displayName ?? "My Account"}</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<DropdownMenu.Group>
			<DropdownMenu.Item onclick={() => goto(resolve("/switch"))}>
				<ArrowRightLeft class="mr-2 h-4 w-4" />Switch Outlet
			</DropdownMenu.Item>
			<DropdownMenu.Item onclick={() => goto(resolve("/setup"))}>
				<WrenchIcon class="mr-2 h-4 w-4" />Setup Device
			</DropdownMenu.Item>
			{#if status.hasFeature("counter mode")}
				<DropdownMenu.Item onclick={() => goto(resolve("/counter-mode"))}>
					<TvMinimalIcon class="mr-2 h-4 w-4" />Counter Mode
				</DropdownMenu.Item>
			{/if}
			<DropdownMenu.Item onclick={() => goto(resolve("/link-account"))}>
				<ShieldUserIcon class="mr-2 h-4 w-4" />Link Account
			</DropdownMenu.Item>
			<DropdownMenu.Item onclick={() => goto(resolve("/network"))}>
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
