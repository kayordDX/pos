<script lang="ts">
	import { Button } from "@kayord/ui";

	const setNotification = () => {
		new Notification("Test", { body: "this is more text", icon: "/logo.svg" });
	};
</script>

<Button on:click={setNotification}>Test</Button>
