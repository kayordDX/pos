<script lang="ts">
	import { Alert } from "@kayord/ui";
	import { AlertTriangleIcon } from "lucide-svelte";

	export let message: string | undefined = undefined;
	export let title: string = "Error";
</script>

<Alert.Root variant="destructive">
	<div class="flex gap-2">
		<AlertTriangleIcon class="h-4 w-4" />
		<Alert.Title>{title}</Alert.Title>
	</div>
	<Alert.Description>{message ?? "An error occurred"}</Alert.Description>
</Alert.Root>
