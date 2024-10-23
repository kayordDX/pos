import { initializeApp } from "firebase/app";
import {
	getAuth,
	GoogleAuthProvider,
	onIdTokenChanged,
	signInWithPopup,
	signOut,
	type User,
} from "firebase/auth";
import { getMessaging, getToken } from "firebase/messaging";
import { PUBLIC_VAPID_KEY } from "$env/static/public";

import { client } from "./api";
import { onDestroy } from "svelte";

const firebaseConfig = {
	apiKey: "AIzaSyAoHwOFNJ0_ag0Ly4YZzGzdW_n5_NjC2uE",
	authDomain: "kayord-pos.firebaseapp.com",
	projectId: "kayord-pos",
	storageBucket: "kayord-pos.appspot.com",
	messagingSenderId: "249122681101",
	appId: "1:249122681101:web:3b0c9caccdee78e304c044",
};

export const app = initializeApp(firebaseConfig);

const saveTokenToDatabase = async (token: string) => {
	await client.POST("/notification/addUser", {
		body: {
			token: token,
		},
	});
};

export const subscribeToPushNotifications = async () => {
	const messaging = getMessaging();
	let subscribe = false;
	try {
		await navigator.serviceWorker.ready;
		const currentToken = await getToken(messaging, {
			vapidKey: PUBLIC_VAPID_KEY,
		});
		if (currentToken) {
			saveTokenToDatabase(currentToken);
			subscribe = true;
		} else {
			console.error("Could not generate token");
		}
	} catch (err) {
		console.error("An error occurred while retrieving token. ", err);
	}
	return subscribe;
};

export const auth = getAuth(app);

export const signInGoogle = async () => {
	const provider = new GoogleAuthProvider();
	provider.setCustomParameters({ prompt: "select_account" });
	const result = await signInWithPopup(auth, provider);

	await client.POST("/user/validate", {
		body: {
			email: result.user.email ?? "",
			image: result.user.photoURL,
			name: result.user.displayName ?? "",
			userId: result.user.uid,
		},
	});
};

export const logout = async () => {
	await signOut(auth);
};

const createSession = () => {
	let isLoadingSession = $state(true);
	let user = $state<User | null>(null);
	// let unsubscribe: () => void;

	if (!auth || !globalThis.window) {
		console.warn("Auth is not initialized or not in browser");
		user = null;
	}

	$effect.root(() => {
		const unsubscribe = onIdTokenChanged(auth, (u) => {
			isLoadingSession = false;
			user = u;
		});

		return () => {
			unsubscribe();
		};
	});

	return {
		get user() {
			return user;
		},
		set user(value) {
			user = value;
		},
		get isLoadingSession() {
			return isLoadingSession;
		},
	};
};

export const session = createSession();
