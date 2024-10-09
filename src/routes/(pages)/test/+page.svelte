<script lang="ts">
	import { Button } from "@kayord/ui";
	import Comp1 from "./Comp1.svelte";
	import Comp2 from "./Comp2.svelte";
	import LocalStorage from "./LocalStorage.svelte";
	import NotificationsTest from "./NotificationsTest.svelte";
	import { counter } from "./store.svelte";
</script>

<div class="flex gap-8 flex-col p-6">
	<NotificationsTest />
	<LocalStorage />
	<Button onclick={() => (counter.count += 1)}>+ {counter.count}</Button>
	<div>
		<Comp1 />
		<Comp2 />
	</div>
</div>
