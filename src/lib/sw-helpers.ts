export const detectSWUpdate = async () => {
	const registration = await navigator.serviceWorker.ready;

	registration.addEventListener("updatefound", () => {
		const newSW = registration.installing;
		newSW?.addEventListener("statechange", () => {
			if (newSW.state === "installed") {
				if (confirm("New update available! Reload to update?")) {
					newSW.postMessage({ type: "SKIP_WAITING" });
					window.location.reload();
				}
			}
		});
	});
};
