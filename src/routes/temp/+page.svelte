<script lang="ts">
	import { PUBLIC_API_URL } from "$env/static/public";
	import { Button } from "@kayord/ui";
	import { onMount } from "svelte";
	import { createPayGetLink } from "$lib/api";

	let guid: string = "";

	let sse: EventSource;

	const closeConnection = () => {
		sse.close();
	};

	const getLink = createPayGetLink({ amount: 12 }, { query: { enabled: false } });

	const generateLink = () => {
		$getLink.refetch();
	};

	const startListener = () => {
		sse.addEventListener("status", (e) => {
			const json = JSON.parse(e.data);
			console.log(json);
			guid = json.guid;
		});
	};

	onMount(() => {
		sse = new EventSource(
			`${PUBLIC_API_URL}/pay/status/sse/${"80392a34-623d-4ee4-9b1e-140f03293a92"}`
		);
		return () => {
			if (sse.readyState === 1) {
				sse.close();
			}
		};
	});
</script>

<div>{guid}</div>

{JSON.stringify($getLink)}

<Button on:click={generateLink}>Generate</Button>
<Button on:click={startListener}>Start</Button>
<Button on:click={closeConnection}>Stop</Button>
