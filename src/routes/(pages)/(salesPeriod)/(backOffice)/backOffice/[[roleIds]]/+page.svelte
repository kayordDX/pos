<script lang="ts">
	import { page } from "$app/state";
	import BackOffice from "../../BackOffice.svelte";
</script>

<BackOffice roleIds={page.params.roleIds} />
