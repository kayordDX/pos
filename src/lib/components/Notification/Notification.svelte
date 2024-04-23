<script lang="ts">
	import { onMount } from "svelte";
	import { app, subscribeToPushNotifications } from "$lib/firebase";
	import { requestNotificationPermission } from "$lib/util";
	import { getMessaging, onMessage } from "firebase/messaging";
	let notificationPermission: boolean | undefined = undefined;

	onMount(async () => {
		notificationPermission = Notification.permission == "granted";
		if (notificationPermission) {
			const registration = await navigator.serviceWorker.ready;
			await subscribeToPushNotifications();
			try {
				const messaging = getMessaging(app);
				onMessage(messaging, (payload) => {
					// TODO: Decide if this should be toast or notification
					registration.showNotification(payload.notification?.title ?? "Kayord", {
						body: payload.notification?.body,
						icon: payload.notification?.icon,
					});
				});
			} catch (err) {
				console.log("failed: ", err);
			}
		} else {
			await requestNotificationPermission();
		}
	});
</script>
