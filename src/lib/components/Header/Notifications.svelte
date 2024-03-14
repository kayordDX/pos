<script lang="ts">
	import { createUserGetNotifications } from "$lib/api";
	import { Avatar, Badge, Card, DropdownMenu, Loader } from "@kayord/ui";
	import { MailIcon } from "lucide-svelte";
	import Error from "$lib/components/Error.svelte";
	import { getError } from "$lib/types";

	const query = createUserGetNotifications();
</script>

<DropdownMenu.Root onOpenChange={() => $query.refetch()}>
	<DropdownMenu.Trigger>
		<Avatar.Root>
			<Avatar.Fallback><MailIcon /></Avatar.Fallback>
		</Avatar.Root>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-full max-w-md overflow-auto max-h-[calc(100vh-56px)]">
		<DropdownMenu.Label class="flex items-center gap-2">
			<MailIcon class="h-4 w-4" /> Notifications
		</DropdownMenu.Label>
		{#if $query.isPending}
			<Loader />
		{/if}
		{#if $query.error}
			<Error message={getError($query.error).message} />
		{/if}
		<DropdownMenu.Separator />
		<DropdownMenu.Group class="">
			{#if $query.data}
				{#if ($query.data?.length ?? 0) <= 0}
					<Card.Root>
						<Card.Header>
							<Card.Title>No notifications</Card.Title>
							<Card.Description>You are all caught up</Card.Description>
						</Card.Header>
					</Card.Root>
				{/if}
				{#each $query.data ?? [] as notification, i}
					{#if i < 5}
						<DropdownMenu.Item>
							<div class="flex flex-col">
								<div>{notification.notification}</div>
								<div>{notification.dateSentFormatted}</div>
							</div>
						</DropdownMenu.Item>
					{/if}
				{/each}
			{/if}
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Item href="/notifications"
			>Show All
			<Badge class="ml-2">{$query.data?.length}</Badge>
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
