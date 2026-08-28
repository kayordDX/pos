<script lang="ts">
	import { Button } from "@kayord/ui";
	import ViewIcon from "@lucide/svelte/icons/eye";

	interface Props {
		id: number;
	}

	let { id }: Props = $props();
</script>

<Button variant="outline" href={`/waiter/history/${id}`}>
	<ViewIcon class="mr-2 size-4" />View
</Button>
