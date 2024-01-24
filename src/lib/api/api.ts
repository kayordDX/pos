import createClient from "openapi-fetch";
import type { paths } from "./generated/schema";
import { PUBLIC_API_URL } from "$env/static/public";
import { get } from "svelte/store";
import { outlet } from "$lib/stores/outletStore";
import { user } from "$lib/stores/userStore";
import { page } from "$app/stores";
import { browser } from "$app/environment";
import { session } from "$lib/stores/session";
// import { getStores } from "$app/stores";

// const getBearer = () => `Bearer ${get(page).data.session?.token}`;

// let test = "";
// if (browser) {
// 	page.subscribe((v) => {
// 		test = v.data?.session?.token ?? "";
// 	});
// 	console.log(test);
// }

// const testData = () => get(page);
// // const headers = browser
// // 	? {
// // 			Authorization: getBearer(),
// // 		}
// // 	: {};

// // if (browser) {
// // 	console.log("What", get(page).data.session?.user?.token);
// // }
// if (browser) {
// 	console.log("testData", testData());
// }

// export const client = () => {
// 	return createClient<paths>({
// 		baseUrl: PUBLIC_API_URL,
// 	});
// };

// const client = browser
// 	? createClient<paths>({
// 			headers: {
// 				Authorization:
// 					"Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ4YTYzYmM0NzY3Zjg1NTBhNTMyZGM2MzBjZjdlYjQ5ZmYzOTdlN2MiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIyNDkxMjI2ODExMDEtYXNvM24zMzIwbG10bThpajg5bTh2NzdvbDAwNTFiNG4uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIyNDkxMjI2ODExMDEtYXNvM24zMzIwbG10bThpajg5bTh2NzdvbDAwNTFiNG4uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDMzMDEyNTg5MTIwMTE5Mjc4ODQiLCJlbWFpbCI6Imtva2phY28yQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiSXJMYkdkWjdmWkNOZUJQWms1LVQ0USIsIm5hbWUiOiJKYWNvIEtvayIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NJSzNXT3laSUFrQkZSdnZWdlR5WWdNQm90bDhCTG9sc1lCRjhOTVlDOHJ6NTVWPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IkphY28iLCJmYW1pbHlfbmFtZSI6IktvayIsImxvY2FsZSI6ImVuIiwiaWF0IjoxNzA2MDQxOTYwLCJleHAiOjE3MDYwNDU1NjB9.mdVl1m82P55GGiDcAu2zIxZUTprHn_6A_REwiGLdWM5OE-uDH_ZAlyMWRUjeZNJSmqQI3dsITw9fhEkRMhKkh9qZdMBS-vIAjaLgrNnyFzVboqcU31-WGRF4ERuagEmHbQ4lXTV7ytIu628_AP4glmmRZRjJaLVNE6rU47G4nTtsORYnvGtsH8z6rETqlO3gJ0oN3OuQaw2H1ykTRK_DlxmgoIiX3CACB1QIL_v23P1AyINhTZC3MsNYyXsWeJjOZ9KU0cKol4h29Pg8UO4nx2Jadpyp5Orv9LiQFzaEZKEry_kaLKw4ikT_S168J9Fa24EcIQEe4upVSeVHRMojtw",
// 			},
// 			baseUrl: PUBLIC_API_URL,
// 		})
// 	: createClient<paths>({
// 			baseUrl: PUBLIC_API_URL,
// 		});

// export { client };

const getToken = () => {
	let authToken: string | undefined = undefined;
	session.subscribe((v) => (authToken = v?.token));
	console.log(authToken, "authtoken");
	return authToken;
};

export const client = createClient<paths>({
	// headers: {
	// 	Authorization: `Bearer ${getToken()}`,
	// },
	baseUrl: PUBLIC_API_URL,
	headers: {
		get Authorization() {
			return getToken() ? `Bearer ${getToken()}` : undefined;
		},
	},
});
