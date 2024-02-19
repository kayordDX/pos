<script lang="ts">
	import { Button, Card } from "@kayord/ui";
	import { client } from "$lib/api/client";
	import type { PageData } from "./$types";
	export let data: PageData;

	const getData = async () => {
		const what = await client.GET("/business");
	};

	getData();
</script>

<Card.Root class="m-8 p-4">
	{JSON.stringify(data.data)}
</Card.Root>
