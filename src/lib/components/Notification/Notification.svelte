<script lang="ts">
	import { onMount } from "svelte";
	import {
		checkSubscriptionStatus,
		onMessageListener,
		subscribeToPushNotifications,
	} from "$lib/firebase";
	import { requestNotificationPermission } from "$lib/util";

	let notificationPermission: boolean | undefined = undefined;

	onMount(async () => {
		notificationPermission = Notification.permission == "granted";
		if (notificationPermission) {
			// await checkSubscriptionStatus();
			const subscribed = await subscribeToPushNotifications();
			console.log("subscribed", subscribed);
			try {
				const payload = await onMessageListener();
				console.log(payload);
			} catch (err) {
				console.log("failed: ", err);
			}
		} else {
			await requestNotificationPermission();
		}
	});
</script>
