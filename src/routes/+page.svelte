<script lang="ts">
	import { Badge, Button, Card } from '@kayord/ui';
	import { Clock } from 'lucide-svelte';
</script>

<div class="m-8">
	<h1>Get started by clocking in</h1>
	<p class="text-muted-foreground">Clock in</p>
	<Button class="mt-4" variant="secondary"><Clock class="w-4 mr-2" />Clock In / Out</Button>
</div>

<div class="m-8 mt-20">
	<h1>Clocked in Users</h1>
	<p class="text-muted-foreground">List of current clocked in users</p>
	<div class="flex flex-wrap gap-4 mt-4">
		<Card class="p-5 w-48">
			<h3>Sarel</h3>
			<Badge variant="secondary">Waiter</Badge>
		</Card>
		<Card class="p-5 w-48">
			<h3>Jane</h3>
			<Badge class="bg-purple-300 text-black">Manager</Badge>
		</Card>
		<Card class="p-5 w-48">
			<h3>John</h3>
			<Badge variant="secondary">Waiter</Badge>
		</Card>
		<Card class="p-5 w-48">
			<h3>Pieter</h3>
			<Badge class="bg-green-300 text-black">Chef</Badge>
		</Card>
	</div>
</div>
