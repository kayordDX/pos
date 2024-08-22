<script lang="ts">
	import { Button } from "@kayord/ui";

	const setNotification = () => {
		navigator.serviceWorker.ready.then((registration) => {
			registration.showNotification("Test", {
				body: "this is more text",
				icon: "/logo.svg",
			});
		});
	};
</script>

<Button on:click={setNotification}>Notification Test</Button>
