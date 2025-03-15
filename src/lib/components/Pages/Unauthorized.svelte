<script>
	import { Card } from "@kayord/ui";
	import { AlertTriangleIcon } from "@lucide/svelte";
</script>

<div class="m-2">
	<Card.Root>
		<Card.Header class="flex flex-row items-center gap-4">
			<AlertTriangleIcon class="text-primary" />
			<div>
				<Card.Title>Unauthorized</Card.Title>
				<Card.Description>Access Denied</Card.Description>
			</div>
		</Card.Header>
		<Card.Content>
			<div class="text-muted-foreground text-sm">
				You do not have permission to access this page
			</div>
		</Card.Content>
	</Card.Root>
</div>
