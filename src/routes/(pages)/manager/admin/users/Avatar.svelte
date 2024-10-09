<script lang="ts">
	import { getInitials } from "$lib/util";
	import { Avatar } from "@kayord/ui";
	let { name, image }: { name: string; image: string } = $props();
</script>

<Avatar.Root>
	<Avatar.Image src={image} alt="profile" />
	<Avatar.Fallback class="bg-primary text-primary-foreground">
		{getInitials(name)}
	</Avatar.Fallback>
</Avatar.Root>
