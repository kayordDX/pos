<script lang="ts">
	import { ModeWatcher } from "@kayord/ui";
	import { Header } from "$lib/components/Header";
	import "../app.postcss";
</script>

<ModeWatcher />
<Header />
<slot />
