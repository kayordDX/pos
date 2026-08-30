import type { Outlet } from "./lib/types";

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			outlet: Outlet | null;
		}
		interface PageData {
			flash?: { type: "success" | "error"; message: string };
		}
		// interface Platform {}
	}
}

export {};
