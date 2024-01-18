import type { User, Outlet } from "./lib/types";
import type { DefaultSession } from "@auth/core/types";

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

declare module "@auth/core/types" {
	interface Session {
		user?: DefaultSession["user"] & {
			id: string;
			token: string;
		};
	}
}

export {};
