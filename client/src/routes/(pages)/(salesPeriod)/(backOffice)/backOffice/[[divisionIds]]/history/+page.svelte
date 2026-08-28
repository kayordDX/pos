<script lang="ts">
	import { page } from "$app/state";
	import BackOffice from "../../../BackOffice.svelte";
</script>

<BackOffice isHistory={true} divisionIds={page.params.divisionIds} />
