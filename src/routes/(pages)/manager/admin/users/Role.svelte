<script lang="ts">
	import { toast, Button } from "@kayord/ui";
	import { XIcon } from "@lucide/svelte";
	import { createUserRemoveUserOutletRole } from "$lib/api";
	import { getError } from "$lib/types";

	interface Props {
		role: string;
		userId: string;
		refetch: () => void;
	}

	let { role, userId, refetch }: Props = $props();

	let isLoading = $state(false);

	const mutation = createUserRemoveUserOutletRole();

	const removeRole = async () => {
		try {
			isLoading = true;
			await mutation.mutateAsync({ role: role, userId: userId });
		} catch (error) {
			toast.error(getError(error).message);
		} finally {
			isLoading = false;
			refetch();
		}
	};
</script>

<Button variant="secondary" disabled={isLoading} size="sm" onclick={removeRole}>
	{role}
	<XIcon class="ml-2 size-4" />
</Button>
