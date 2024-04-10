/// <reference types="@sveltejs/kit" />
/// <reference lib="webworker" />

declare var self: ServiceWorkerGlobalScope;

import { build, files, version } from "$service-worker";

const CACHE = `cache-${version}`;

const ASSETS = [...build, ...files];

self.addEventListener("install", (event) => {
	// Create a new cache and add all files to it
	async function addFilesToCache() {
		const cache = await caches.open(CACHE);
		await cache.addAll(ASSETS).then(() => {
			self.skipWaiting();
		});
	}
	event.waitUntil(addFilesToCache());
});

self.addEventListener("activate", (event) => {
	// Remove previous cached data from disk
	async function deleteOldCaches() {
		for (const key of await caches.keys()) {
			if (key !== CACHE) await caches.delete(key);
		}
	}
	event.waitUntil(deleteOldCaches());
});

// self.addEventListener("fetch", (event) => {
// 	if (event.request.method !== "GET") return;

// 	async function respond() {
// 		const url = new URL(event.request.url);
// 		const cache = await caches.open(CACHE);
// 		if (ASSETS.includes(url.pathname)) {
// 			const response = await cache.match(url.pathname);

// 			if (response) {
// 				return response;
// 			}
// 		}
// 		try {
// 			const response = await fetch(event.request);
// 			if (!(response instanceof Response)) {
// 				throw new Error("invalid response from fetch");
// 			}

// 			if (response.status === 200) {
// 				cache.put(event.request, response.clone());
// 			}

// 			return response;
// 		} catch (err) {
// 			const response = await cache.match(event.request);

// 			if (response) {
// 				return response;
// 			}
// 			throw err;
// 		}
// 	}
// 	event.respondWith(respond());
// });

// self.addEventListener("message", (event) => {
// 	console.log("found event", event.data);
// 	if (event.data && event.data.type === "SKIP_WAITING") {
// 		console.log("waiting", event.data);
// 		self.skipWaiting();
// 	}
// });

self.addEventListener("push", function (event: any) {
	const payload = event.data?.text() ?? "no payload";
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const registration = (self as any).registration as ServiceWorkerRegistration;
	event.waitUntil(
		registration.showNotification("Kayord", {
			body: payload,
		})
	);
} as EventListener);
