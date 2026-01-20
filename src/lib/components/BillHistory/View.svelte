<script lang="ts">
	import { Button } from "@kayord/ui";
	import ViewIcon from "@lucide/svelte/icons/eye";

	interface Props {
		id: number;
	}

	let { id }: Props = $props();
</script>

<Button variant="outline" href={`/waiter/history/${id}`}>
	<ViewIcon class="size-4 mr-2" />View
</Button>
