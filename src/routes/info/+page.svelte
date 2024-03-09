<script lang="ts">
	import { session } from "$lib/firebase";
</script>

{JSON.stringify($session?.getIdToken())}
