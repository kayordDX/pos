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
	import { createSalesPeriodCreate } from "$lib/api";
	import { page } from "$app/stores";
	import { getFlash } from "sveltekit-flash-message/client";
	import { goto, invalidateAll } from "$app/navigation";
	import { outlet } from "$lib/stores/outletStore";
	export let data: PageData;

	let name: string;

	const flash = getFlash(page);
	const mutation = createSalesPeriodCreate();

	const openSalesPeriod = async () => {
		try {
			await $mutation.mutateAsync({
				data: { outletId: $outlet?.outletId ?? 0, name: name },
			});
			$flash = { type: "success", message: "Successfully opened sales period" };
			goto("/");
		} catch (err) {
			$flash = { type: "error", message: "Error opening sales period" };
		}
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
