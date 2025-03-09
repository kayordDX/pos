<script lang="ts">
	import { page } from "$app/state";
	import BackOffice from "../../../BackOffice.svelte";
</script>

<BackOffice isHistory={true} roleIds={page.params.roleIds} />
