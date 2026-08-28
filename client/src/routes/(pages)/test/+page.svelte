<script lang="ts">
	import { session } from "$lib/firebase.svelte";
	import { hub } from "$lib/stores/hub.svelte";
	import { info } from "$lib/stores/info.svelte";
	import { Button } from "@kayord/ui";

	const setModeAgain = async () => {
		let fullUrl = `${info.kayordURL()}/outlet/mode`;
		const token = await session.user?.getIdToken();
		const response = await fetch(fullUrl, {
			method: "POST",
			credentials: "include",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ mode: 2 }),
		});
		console.log(response);
		if (response.ok) {
			console.log(response.headers);
		}
	};

	const listCookies = () => {
		const allCookies = document.cookie;
		console.log(allCookies);
	};
</script>

<div>
	Test
	<Button onclick={listCookies}>Cookies</Button>
	<Button onclick={setModeAgain}>Mode Again</Button>
</div>
