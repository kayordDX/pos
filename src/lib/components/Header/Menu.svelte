<script lang="ts">
	import { session } from "$lib/stores/session";
	import { Avatar, DropdownMenu } from "@kayord/ui";
	import { LogOutIcon } from "lucide-svelte";
	import { signOut } from "@auth/sveltekit/client";
	import { getInitials } from "$lib/util";

	const logout = async () => {
		await signOut();
	};
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		<Avatar.Root>
			<Avatar.Image src={$session?.user?.image} alt="profile" />
			<Avatar.Fallback class="bg-primary text-primary-foreground">
				{getInitials($session?.user?.name ?? "")}
			</Avatar.Fallback>
		</Avatar.Root>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Label>{$session?.user?.name ?? "My Account"}</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<DropdownMenu.Group>
			<DropdownMenu.Item href="/setup">Setup Device</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Item on:click={logout}>
			<LogOutIcon class="mr-2 h-4 w-4" />
			<span>Log out</span>
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
