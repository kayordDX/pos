<script lang="ts">
	import { Button, Card, toast } from "@kayord/ui";
	import { ClockIcon, TimerIcon, TimerOffIcon } from "lucide-svelte";
	import { status } from "$lib/stores/status.svelte";
	import { createClockClockIn } from "$lib/api";
	import { getError } from "$lib/types";

	const mutation = createClockClockIn();

	const clockIn = async () => {
		try {
			await $mutation.mutateAsync({
				data: { outletId: status.value?.outletId ?? 0 },
			});
			await status.getStatus();
			toast.info("Successfully Clocked in User");
		} catch (err) {
			toast.error(getError(err).message);
		}
	};
</script>

<div class="m-2">
	<Card.Root>
		<Card.Header class="flex flex-row items-center gap-4">
			<TimerOffIcon />
			<div>
				<Card.Title>Your are not clocked in</Card.Title>
				<Card.Description>Press the Clock in button to clock in</Card.Description>
			</div>
		</Card.Header>
		<Card.Footer>
			<Button class="mt-4" onclick={clockIn} disabled={$mutation.isPending}>
				<ClockIcon class="mr-2 h-5 w-5" /> Clock In
			</Button>
		</Card.Footer>
	</Card.Root>
</div>
