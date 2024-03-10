<script lang="ts">
	import { Button, Card } from "@kayord/ui";
	import { CalendarOffIcon } from "lucide-svelte";
</script>

<div class="m-2">
	<Card.Root>
		<Card.Header>
			<Card.Title>Welcome Guest</Card.Title>
			<Card.Description>
				You are currently a guest and do not have permissions to access any other pages
			</Card.Description>
		</Card.Header>
		<Card.Content>
			<div class="flex flex-col items-start">
				<img src="/logo.svg" alt="kayord-logo" class="h-28 hover:animate-pulse" />
				<div class="text-muted-foreground mt-4 text-sm">
					Once you have been assigned a role you can start using the system
				</div>
			</div>
		</Card.Content>
	</Card.Root>
</div>
