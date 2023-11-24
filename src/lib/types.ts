import type { OutletSchema, Outlet } from "../routes/setup/schema";

export interface User {
	id: number;
	name: string;
	email: string;
	type: number;
}

export interface UserToken {
	token: string;
}

export { OutletSchema, Outlet };
