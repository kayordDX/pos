<script lang="ts">
	import { Loader } from "@kayord/ui";
	import { createTableOrderGetBill } from "$lib/api";
	import Error from "$lib/components/Error.svelte";
	import { getError } from "$lib/types";
	import Bill from "./Bill.svelte";
	import { page } from "$app/stores";

	const query = createTableOrderGetBill({ tableBookingId: Number($page.params.id) });
</script>

{#if $query.error}
	<Error message={getError($query.error).message} />
{/if}

{#if $query.isPending}
	<Loader />
{/if}

{#if $query.data}
	<Bill data={$query.data} bookingId={Number($page.params.id)} refetch={$query.refetch} />
{/if}
