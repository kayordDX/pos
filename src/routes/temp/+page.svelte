<script lang="ts">
	import { env } from "$env/dynamic/public";
	import { Button } from "@kayord/ui";
	import * as signalR from "@microsoft/signalr";
	import { onMount } from "svelte";

	import { client } from "$lib/api";

	let connection: signalR.HubConnection;

	onMount(() => {
		connection = new signalR.HubConnectionBuilder().withUrl(`${env.PUBLIC_API_URL}/chat`).build();

		connection.on("messageReceived", (username: string, message: string) => {
			console.log("messageReceived", username, message);
		});

		connection.on("ReceiveMessage", (message: string) => {
			console.log("received", message);
		});

		connection.start().catch((err) => console.error(err));
	});

	function send() {
		connection.send("ReceiveMessage", "content").then(() => console.log("finished sending"));
	}

	const getLink = async () => {
		const data = await client.GET("/pay/getLink", {
			params: { query: { amount: 100, tableBookingId: 1 } },
		});
	};
</script>

<Button on:click={getLink}>Get Link</Button>
<Button on:click={send}>Test</Button>
