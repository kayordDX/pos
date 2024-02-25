<script lang="ts">
	import { Avatar, DropdownMenu } from "@kayord/ui";
	import { LogOutIcon, MoonIcon, SunIcon, WrenchIcon } from "lucide-svelte";
	import { signOut } from "@auth/sveltekit/client";
	import { getInitials } from "$lib/util";
	import type { Session } from "@auth/sveltekit";
	import { toggleMode, mode } from "@kayord/ui/mode-watcher";

	export let session: Session | null | undefined;

	const logout = async () => {
		await signOut();
	};
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		<Avatar.Root>
			<Avatar.Image src={session?.user?.image} alt="profile" />
			<Avatar.Fallback class="bg-primary text-primary-foreground">
				{getInitials(session?.user?.name ?? "")}
			</Avatar.Fallback>
		</Avatar.Root>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Label>{session?.user?.name ?? "My Account"}</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<DropdownMenu.Group>
			<DropdownMenu.Item href="/setup"
				><WrenchIcon class="mr-2 h-4 w-4" />Setup Device</DropdownMenu.Item
			>
			<DropdownMenu.Item on:click={toggleMode}>
				{#if $mode == "light"}
					<SunIcon class="mr-2 h-4 w-4" />
				{:else}
					<MoonIcon class="mr-2 h-4 w-4" />
				{/if}
				Toggle Theme
			</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Item on:click={logout}>
			<LogOutIcon class="mr-2 h-4 w-4" />
			<span>Log out</span>
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
