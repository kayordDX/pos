<script lang="ts">
	import { Button } from "@kayord/ui";

	$: console.log(document.visibilityState);

	document.addEventListener("visibilitychange", () => {
		if (document.visibilityState === "visible") {
			console.log("visible");
		} else {
			console.log("not");
		}
	});

	document.addEventListener("focus", (event) => {
		console.log("focus", event);
	});
</script>

<Button>Test</Button>
