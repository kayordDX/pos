<script lang="ts">
	import { Button } from "@kayord/ui";
	import type { PageData } from "./$types";
</script>

<div class="m-8 flex gap-4">
	<div class="flex flex-col">
		<Button href="/waiter">Waiter</Button>
	</div>
	<div class="flex flex-col">
		<Button href="/manager">Manager</Button>
	</div>
	<div class="flex flex-col">
		<Button href="/kitchen">Kitchen</Button>
	</div>
</div>
