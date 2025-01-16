<script lang="ts">
	import { notification } from "$lib/stores/notify.svelte";
	import { hub } from "$lib/stores/hub.svelte";

	interface SoundEvent {
		outletId: number;
		roleIds: Array<number>;
	}

	interface Props {
		refetch: () => void;
		roleIds?: string;
	}
	let { refetch, roleIds }: Props = $props();

	const audio = new Audio("/sounds/notification.mp3");

	const roles = $derived(roleIds ? roleIds.split(",").map(Number) : []);

	const playSound = (e: SoundEvent) => {
		console.log("PlaySound", e);
		const shouldNotify = roles.some((r) => e.roleIds.includes(r));
		if (shouldNotify) {
			refetch();
			notification.notify();
			audio.play();
		}
	};

	$effect(() => {
		if (hub.state == "Connected") {
			hub.on("PlaySound", playSound);
			return () => {
				hub.off("PlaySound", playSound);
			};
		}
	});
</script>
