<script lang="ts">
	import { Alert, AlertDescription, AlertTitle, Card } from "@kayord/ui";
	import { AlertTriangleIcon } from "lucide-svelte";

	export let message: string | undefined = undefined;
</script>

<Alert variant="destructive">
	<div class="flex gap-2">
		<AlertTriangleIcon class="h-4 w-4" />
		<AlertTitle>Error</AlertTitle>
	</div>
	<AlertDescription>{message ?? "An error occurred"}</AlertDescription>
</Alert>
