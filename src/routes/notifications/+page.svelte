<script lang="ts">
	import { MailIcon } from "lucide-svelte";
	import type { PageData } from "./$types";
	import Item from "./Item.svelte";
	import autoAnimate from "@formkit/auto-animate";

	export let data: PageData;
</script>

<div class="mt-4 flex flex-col items-center">
	<div
		class="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center"
	>
		<MailIcon />
	</div>
	<h1 class="mt-2">Notifications</h1>
</div>

<div class="flex flex-col gap-2 mt-6 mx-2" use:autoAnimate>
	<Item />

	<Item />
	<Item />
</div>
