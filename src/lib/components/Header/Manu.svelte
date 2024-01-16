<script lang="ts">
	import { DropdownMenu } from "@kayord/ui";
	import { MoreVerticalIcon } from "lucide-svelte";
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger><MoreVerticalIcon /></DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.Item href="/setup">Setup Device</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
