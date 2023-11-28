<script lang="ts">
	import {
		Button,
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle,
	} from "@kayord/ui";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<Card class="m-8">
	<CardHeader>
		<CardTitle>R23.09</CardTitle>
		<CardDescription>Amount</CardDescription>
	</CardHeader>
	<CardContent>Please tap your card on the back of the phone</CardContent>
	<CardFooter>
		<Button class="w-full" href={`/table/${data.bookingId}`} variant="outline">Cancel</Button>
	</CardFooter>
</Card>
