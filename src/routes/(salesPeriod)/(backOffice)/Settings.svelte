<script lang="ts">
	import { backOffice } from "$lib/stores/backOffice";
	import { Badge, Popover, Slider } from "@kayord/ui";
	import { Settings2Icon } from "lucide-svelte";
</script>

<Popover.Root>
	<Popover.Trigger>
		<Badge variant="secondary" class="truncate flex">
			<Settings2Icon class="size-4" />
		</Badge>
	</Popover.Trigger>
	<Popover.Content>
		<Slider
			value={[$backOffice]}
			min={300}
			max={1000}
			step={10}
			onValueChange={(v) => {
				$backOffice = v[0] ?? 500;
			}}
		/>
	</Popover.Content>
</Popover.Root>
