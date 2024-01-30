import type { Outlet } from "./lib/types";
import type { DefaultSession } from "@auth/core/types";

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			session: Session | undefined;
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
		token: string;
		tokenExpires: number;
		refreshToken: string;
		user?: DefaultSession["user"] & {
			id: string;
			roles: Array<string>;
		};
	}
}

export {};
