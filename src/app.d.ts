import type { Outlet } from "./lib/types";
import { CustomOptions, CustomColumnMeta } from "@kayord/ui/data-table";

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

declare module "@tanstack/table-core" {
	interface ColumnMeta<TData extends RowData, TValue> extends CustomColumnMeta {}
	interface TableOptionsResolved<TData extends RowData> extends CustomOptions {}
}

export {};
