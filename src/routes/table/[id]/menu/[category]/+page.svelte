<script lang="ts">
	import { Badge, Button, Card } from "@kayord/ui";
	import type { PageData } from "./$types";
	import { Minus, MoveUp, Plus } from "lucide-svelte";

	export let data: PageData;
	let count: number = 0;

	const increment = () => {
		count++;
	};

	const decrement = () => {
		count--;
	};
</script>

<div class="m-8">
	<h1>Menu</h1>
	<div class="flex flex-wrap gap-4 mt-4">
		{#if data.category == "0"}
			<a href="1">
				<Card class="p-5 w-48">
					<h3>Drinks</h3>
				</Card>
			</a>
			<a href="2">
				<Card class="p-5 w-48">
					<h3>Desert</h3>
				</Card>
			</a>
		{:else if data.category == "1"}
			<a href="3">
				<Card class="p-5 w-48">
					<h3>Alcoholic</h3>
				</Card>
			</a>
			<a href="4">
				<Card class="p-5 w-48">
					<h3>Non Alcoholic</h3>
				</Card>
			</a>
		{:else if data.category == "2"}
			<a href="5">
				<Card class="p-5 w-48">
					<h3>Apple Pie</h3>
				</Card>
			</a>
			<a href="6">
				<Card class="p-5 w-48">
					<h3>Baklava</h3>
				</Card>
			</a>
		{:else if data.category == "4"}
			<a href="7">
				<Card class="p-5 w-48">
					<h3>Coke</h3>
				</Card>
			</a>
			<a href="8">
				<Card class="p-5 w-48">
					<h3>Cream Sode</h3>
				</Card>
			</a>
		{:else if data.category == "3"}
			<a href="9">
				<Card class="p-5 w-48">
					<h3>Brandy</h3>
				</Card>
			</a>
			<a href="10">
				<Card class="p-5 w-48">
					<h3>Devilspeak Lager</h3>
				</Card>
			</a>
		{:else if data.category == "9"}
			<a href="9">
				<Card class="p-5">
					<div class="flex gap-4 items-center">
						<Badge>{count}</Badge>
						<Button variant="outline" size="icon" on:click={decrement}
							><Minus class="w-4 h-4" /></Button
						>
						<h3>KWV 10 Year</h3>
						<Button variant="outline" size="icon" on:click={increment}
							><Plus class="w-4 h-4" /></Button
						>
					</div>
				</Card>
			</a>
		{/if}
	</div>
	<Button variant="secondary" class="mt-8" href={`/table/${data.bookingId}`}>Cancel</Button>
	{#if count > 0}
		<Button class="mt-8 ml-2" href={`/table/${data.bookingId}/temp`}>Add to Order</Button>
	{/if}
</div>
