import type { User, Outlet } from "./lib/types";

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: User | null;
			outlet: Outlet | null;
		}
		interface PageData {
			flash?: { type: "success" | "error"; message: string };
		}
		// interface Platform {}
	}
}

export {};
