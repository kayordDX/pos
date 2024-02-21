<script lang="ts">
	import { MailIcon } from "lucide-svelte";
	import Item from "./Item.svelte";
	import autoAnimate from "@formkit/auto-animate";
	import { createUserGetNotifications } from "$lib/api";
	import { Card, Loader } from "@kayord/ui";
	import Error from "$lib/components/Error.svelte";
	import { getError } from "$lib/types";

	const query = createUserGetNotifications();
</script>

<div class="mt-4 flex flex-col items-center">
	<div
		class="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center"
	>
		<MailIcon />
	</div>
	<h1 class="mt-2">Notifications</h1>
</div>

{#if $query.isPending}
	<Loader />
{/if}
{#if $query.error}
	<Error message={getError($query.error).message} />
{/if}
{#if $query.data}
	<div class="flex flex-col gap-2 mt-6 mx-2" use:autoAnimate>
		{#if ($query.data?.length ?? 0) <= 0}
			<Card.Root>
				<Card.Header>
					<Card.Title>No notifications</Card.Title>
					<Card.Description>You are all caught up</Card.Description>
				</Card.Header>
			</Card.Root>
		{/if}
		{#each $query.data ?? [] as notification}
			<Item notification={notification.notification} created={notification.dateSentFormatted} />
		{/each}
	</div>
{/if}
