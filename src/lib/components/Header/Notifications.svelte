<script lang="ts">
	import { Avatar, DropdownMenu } from "@kayord/ui";
	import { MailIcon } from "lucide-svelte";
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		<Avatar.Root>
			<Avatar.Fallback><MailIcon /></Avatar.Fallback>
		</Avatar.Root>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-full max-w-md">
		<DropdownMenu.Label class="flex items-center gap-2"
			><MailIcon class="h-4 w-4" /> Notifications</DropdownMenu.Label
		>
		<DropdownMenu.Separator />
		<DropdownMenu.Group>
			<DropdownMenu.Item>
				<div class="flex flex-col">
					<div>test</div>
					<div>Another</div>
				</div>
			</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Item href="/notifications">Show All</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
