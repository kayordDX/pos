<script lang="ts">
	import { session } from "$lib/firebase.svelte";
	import { Loader } from "@kayord/ui";
	import Login from "../Login.svelte";
	import type { Snippet } from "svelte";
	import { mode } from "$lib/stores/mode.svelte";
	import CounterLogin from "../CounterLogin.svelte";
	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

{#if session.isLoadingSession}
	<Loader />
{:else if session.user}
	{@render children?.()}
{:else if mode.value.mode == "counter" && mode.value.outletId > 0}
	<CounterLogin />
{:else}
	<Login />
{/if}
