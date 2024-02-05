<script lang="ts">
	import { ClockIcon } from "lucide-svelte";
	import { Button, Card, toast } from "@kayord/ui";
	import type { PageData } from "./$types";
	export let data: PageData;
	import { createClockClockIn } from "$lib/api";
	import { goto } from "$app/navigation";
	import { getError } from "$lib/types";

	const mutation = createClockClockIn();

	const clockIn = async () => {
		try {
			await $mutation.mutateAsync({
				data: { outletId: data.status?.outletId ?? 0 },
			});
			toast.info("Successfully Clocked in User");
			goto("/");
		} catch (err) {
			toast.error(getError(err).message);
		}
	};
</script>

<div class="m-8">
	<h1>Clock In</h1>
	<p class="text-muted-foreground">Clock in to get started</p>
	<Button class="mt-4" on:click={clockIn}><ClockIcon class="mr-2 h-5 w-5" /> Clock In</Button>
</div>
