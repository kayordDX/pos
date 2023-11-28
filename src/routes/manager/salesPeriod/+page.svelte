<script lang="ts">
	import {
		Card,
		CardContent,
		CardFooter,
		CardHeader,
		CardTitle,
		Form,
		Input,
		Label,
	} from "@kayord/ui";
	import type { PageData } from "./$types";
	import { Button } from "@kayord/ui";

	export let data: PageData;

	let name: string;

	const openSalesPeriod = () => {
		console.log("Whuut", name);
	};
</script>

<Card class="p-5 m-5">
	<CardHeader>
		<CardTitle>Open Sales Period</CardTitle>
	</CardHeader>
	<CardContent>
		<Label for="name">Name</Label>
		<Input type="text" id="name" placeholder="name" bind:value={name} />
	</CardContent>
	<CardFooter class="gap-2">
		<Button variant="secondary" href="/manager">Cancel</Button>
		<Button on:click={openSalesPeriod}>Open</Button>
	</CardFooter>
</Card>
