<script lang="ts">
	import { Loader } from "@kayord/ui";
	import type { PageData } from "./$types";
	import { createTableOrderGetBill } from "$lib/api";
	import Error from "$lib/components/Error.svelte";
	import { getError } from "$lib/types";
	import Bill from "./Bill.svelte";

	export let data: PageData;

	const query = createTableOrderGetBill({ tableBookingId: Number(data.bookingId) });
</script>

{#if $query.error}
	<Error message={getError($query.error).message} />
{/if}

{#if $query.isPending}
	<Loader />
{/if}

{#if $query.data}
	<Bill data={$query.data} bookingId={Number(data.bookingId)} />
{/if}
