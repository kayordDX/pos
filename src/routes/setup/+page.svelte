<script lang="ts">
	import { Badge, Card } from "@kayord/ui";
	import type { PageData } from "./$types";
	import SetupForm from "./SetupForm.svelte";

	import { getFlash } from "sveltekit-flash-message";
	import { page } from "$app/stores";

	const flash = getFlash(page);

	export let data: PageData;
</script>

<Card class="p-5 m-5">
	<SetupForm form={data.form} />
</Card>
