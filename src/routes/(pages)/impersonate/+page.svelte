<script lang="ts">
	import { createUserUsers, createAdminToken } from "$lib/api";
	import { Card } from "@kayord/ui";
	import { signInCustomToken } from "$lib/firebase.svelte";
	import { goto } from "$app/navigation";

	const query = createUserUsers({ pageSize: 100 });

	const data = $derived(query.data?.items ?? []);

	const createToken = createAdminToken();
	const impersonate = async (userId: string) => {
		// Get custom token
		const token = (await createToken.mutateAsync({ data: { userId } })).token;
		console.log("token", token);

		// Login using custom token.
		const result = await signInCustomToken(token);
		console.log("result", result);

		goto("/");
	};
</script>

<div class="m-2">
	<div class="flex flex-col gap-2">
		{#each data as user}
			<button onclick={() => impersonate(user.userId)}>
				<Card.Root class="p-2">
					{user.name}
				</Card.Root>
			</button>
		{/each}
	</div>
</div>
