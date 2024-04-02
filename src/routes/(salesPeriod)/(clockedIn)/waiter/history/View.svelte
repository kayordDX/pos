<script lang="ts">
	import { Button } from "@kayord/ui";
	import ViewIcon from "lucide-svelte/icons/eye";

	export let id: number;
</script>

<Button variant="secondary" href={`/waiter/history/${id}`}>
	<ViewIcon class="size-4 mr-2" />View
</Button>
