<script lang="ts">
	import { notification } from "$lib/stores/notify.svelte";
	import { hub } from "$lib/stores/hub.svelte";
	import { HubConnectionState } from "@microsoft/signalr";

	interface SoundEvent {
		outletId: number;
		divisionIds: Array<number>;
		isSilent: boolean;
	}

	interface Props {
		refetch: () => void;
		divisionIds?: string;
	}
	let { refetch, divisionIds }: Props = $props();

	const audio = new Audio("/sounds/notification.mp3");

	const roles = $derived(divisionIds ? divisionIds.split(",").map(Number) : []);

	const playSound = (e: SoundEvent) => {
		const shouldNotify = roles.some((r) => e.divisionIds.includes(r));
		if (shouldNotify) {
			refetch();
			if (!e.isSilent) {
				notification.notify();
				audio.play();
			}
		}
	};

	$effect(() => {
		if (hub.state == HubConnectionState.Connected) {
			hub.on("PlaySound", playSound);
			return () => {
				hub.off("PlaySound", playSound);
			};
		}
	});
</script>
