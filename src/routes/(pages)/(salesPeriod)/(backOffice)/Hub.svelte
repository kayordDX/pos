<script lang="ts">
	import { notification } from "$lib/stores/notify.svelte";
	import { hub } from "$lib/stores/hub.svelte";

	interface SoundEvent {
		outletId: number;
		divisions: Array<number>;
	}

	interface Props {
		refetch: () => void;
		divisionIds?: string;
	}
	let { refetch, divisionIds }: Props = $props();

	const divisions = $derived(divisionIds ? divisionIds.split(",").map(Number) : []);

	const audio = new Audio("/sounds/notification.mp3");
	const playSound = (e: SoundEvent) => {
		console.log("PlaySound", e);
		const shouldNotify = divisions.some((r) => e.divisions.includes(r));
		if (shouldNotify) {
			refetch();
			notification.notify();
			audio.play();
		}
	};

	$effect(() => {
		hub.on("PlaySound", playSound);
		return () => {
			hub.off("PlaySound", playSound);
		};
	});
</script>
