<script lang="ts">
	import { ModeWatcher } from "@kayord/ui";
	import { Header } from "$lib/components/Header";
	import "../app.postcss";
	import { user } from "$lib/stores/userStore";
	import { page } from "$app/stores";

	if ($page.data.user) {
		$user = $page.data.user;
	} else {
		$user = undefined;
	}
</script>

<ModeWatcher />
<Header />
<slot />
