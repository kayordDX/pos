<script lang="ts">
	import { createUserRemoveUserOutlet } from "$lib/api";
	import { getError } from "$lib/types";
	import { Button } from "@kayord/ui";
	import { toast } from "@kayord/ui/sonner";
	import { XIcon } from "@lucide/svelte";

	interface Props {
		userId: string;
		refetch: () => void;
	}
	let { refetch, userId }: Props = $props();

	const mutation = createUserRemoveUserOutlet();

	let isLoading = $state(false);

	const rejectUser = async () => {
		try {
			isLoading = true;
			await mutation.mutateAsync({ userId: userId });
		} catch (error) {
			toast.error(getError(error).message);
		} finally {
			toast.info("Rejected user");
			isLoading = false;
			refetch();
		}
	};
</script>

<Button variant="destructive" disabled={isLoading} size="sm" onclick={rejectUser}>
	Reject
	<XIcon class="ml-2 size-4" />
</Button>
