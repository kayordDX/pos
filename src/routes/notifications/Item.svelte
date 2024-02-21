<script lang="ts">
	import { Card } from "@kayord/ui";

	export let notification: string;
	export let created: string;
</script>

<Card.Root class="p-4">
	<div>{notification}</div>
	<div class="text-muted-foreground">{created}</div>
</Card.Root>
