importScripts("https://www.gstatic.com/firebasejs/10.11.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.11.0/firebase-messaging-compat.js");

const firebaseConfig = {
	apiKey: "AIzaSyAoHwOFNJ0_ag0Ly4YZzGzdW_n5_NjC2uE",
	authDomain: "kayord-pos.firebaseapp.com",
	projectId: "kayord-pos",
	storageBucket: "kayord-pos.appspot.com",
	messagingSenderId: "249122681101",
	appId: "1:249122681101:web:3b0c9caccdee78e304c044",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
	console.log("Received background message ", payload);

	// const notificationTitle = payload.notification.title;
	// const notificationOptions = {
	// 	body: payload.notification.body,
	// 	// TODO: static icon later
	// };

	// self.registration.showNotification(notificationTitle, notificationOptions);
});
