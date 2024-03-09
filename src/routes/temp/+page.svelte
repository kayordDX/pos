<script lang="ts">
	import { Button } from "@kayord/ui";
	import { onMount } from "svelte";

	import { client } from "$lib/api";
	import { hub } from "$lib/stores/hub";

	onMount(() => {
		if (!$hub) {
			return;
		}

		$hub.on("PayMessage", (message: string) => {
			console.log("PayMessage", message);
		});

		$hub.on("ReceiveMessage", (message: string) => {
			console.log("received", message);
		});

		$hub.on("Notification", (message: string) => {
			console.log("received", message);
		});
	});

	function send() {
		$hub?.send("ReceiveMessage", "content").then(() => console.log("finished sending"));
	}

	const getLink = async () => {
		const data = await client.GET("/pay/getLink", {
			params: { query: { amount: 100, tableBookingId: 1 } },
		});
	};
</script>

<Button on:click={getLink}>Get Link</Button>
<Button on:click={send}>Test</Button>
