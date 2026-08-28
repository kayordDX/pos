<script lang="ts">
	import { page } from "$app/state";
	import EmailBill from "./EmailBill.svelte";
</script>

<EmailBill bookingId={Number(page.params.id)} />
