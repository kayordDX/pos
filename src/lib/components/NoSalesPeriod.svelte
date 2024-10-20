<script lang="ts">
	import { Button, Card, toast } from "@kayord/ui";
	import { CalendarOffIcon, CalendarCheck2Icon } from "lucide-svelte";
	import { status } from "$lib/stores/status";

	let isChecking = $state(false);

	const checkStatus = async () => {
		isChecking = true;
		await status.getStatus();
		isChecking = false;
		if ($status.salesPeriodId == 0) {
			toast.error("No active sales period");
		}
	};
</script>

<div class="m-2">
	<Card.Root>
		<Card.Header class="flex flex-row items-center gap-4 pb-6">
			<CalendarOffIcon />
			<div>
				<Card.Title>No Active sales period</Card.Title>
				<Card.Description>Once a sales period has been opened you can get started</Card.Description>
			</div>
		</Card.Header>
		<Card.Footer>
			<Button on:click={checkStatus} disabled={isChecking}>
				<CalendarCheck2Icon class="h-5 w-5 mr-2" />Check
			</Button>
		</Card.Footer>
	</Card.Root>
</div>
