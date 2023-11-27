<script lang="ts">
	import {
		DropdownMenu,
		DropdownMenuTrigger,
		DropdownMenuContent,
		DropdownMenuGroup,
		DropdownMenuSeparator,
		DropdownMenuItem,
		DropdownMenuLabel,
	} from "@kayord/ui";
	import { MoreVerticalIcon } from "lucide-svelte";
</script>

<DropdownMenu>
	<DropdownMenuTrigger><MoreVerticalIcon /></DropdownMenuTrigger>
	<DropdownMenuContent>
		<DropdownMenuGroup>
			<DropdownMenuItem href="/setup">Setup Device</DropdownMenuItem>
		</DropdownMenuGroup>
	</DropdownMenuContent>
</DropdownMenu>
