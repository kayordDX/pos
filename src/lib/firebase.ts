import { initializeApp } from "firebase/app";
import {
	getAuth,
	GoogleAuthProvider,
	onIdTokenChanged,
	signInWithPopup,
	signOut,
	type User,
} from "firebase/auth";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

import { client } from "./api";
import { writable } from "svelte/store";
import { requestNotificationPermission } from "./util";

const firebaseConfig = {
	apiKey: "AIzaSyAoHwOFNJ0_ag0Ly4YZzGzdW_n5_NjC2uE",
	authDomain: "kayord-pos.firebaseapp.com",
	projectId: "kayord-pos",
	storageBucket: "kayord-pos.appspot.com",
	messagingSenderId: "249122681101",
	appId: "1:249122681101:web:3b0c9caccdee78e304c044",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging();

export const onMessageListener = () =>
	new Promise((resolve) => {
		onMessage(messaging, (payload) => {
			console.log("payload", payload);
			resolve(payload);
		});
	});

export const subscribeToPushNotifications = async () => {
	// TODO: vapidKey should be in env config
	try {
		const currentToken = await getToken(messaging, {
			vapidKey:
				"BCZD0Ws2H5KEesEczFvNJk4BvokrUSbWdLYaDzJ_IiRexmP9XPnWWNM8-uuODmsXz825QEkz47D1OZwG1SgWYYg",
		});
		if (currentToken) {
			// TODO: Save token in backend and use it to send messages
			// Send the token to your server and update the UI if necessary
			console.log(currentToken);
		} else {
			requestNotificationPermission();
		}
	} catch (err) {
		console.log("An error occurred while retrieving token. ", err);
	}
};

const auth = getAuth(app);

export const signInGoogle = async () => {
	const provider = new GoogleAuthProvider();
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

export const isLoadingSession = writable<boolean>(true);

const createSession = () => {
	let unsubscribe: () => void;

	if (!auth || !globalThis.window) {
		console.warn("Auth is not initialized or not in browser");
		const { subscribe } = writable<User | null>(null);
		return {
			subscribe,
		};
	}

	const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
		unsubscribe = onIdTokenChanged(auth, (user) => {
			isLoadingSession.set(false);
			set(user);
		});

		return () => unsubscribe();
	});

	return {
		subscribe,
	};
};

export const session = createSession();
