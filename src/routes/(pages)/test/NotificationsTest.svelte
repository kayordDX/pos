<script lang="ts">
	import { info } from "$lib/stores/info.svelte";
	import { Button } from "@kayord/ui";

	const setNotification = () => {
		navigator.serviceWorker.ready.then((registration) => {
			registration.showNotification("Test", {
				body: "this is more text",
				icon: `${info.isKayord() ? "/kayord" : ""}/logo.svg`,
			});
		});
	};
</script>

<Button onclick={setNotification}>Notification Test</Button>
