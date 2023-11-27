import type { OutletSchema, Outlet } from "../routes/setup/schema";

export interface User {
	id: number;
	name: string;
	type: number;
}

export interface UserToken {
	token: string;
}

export { OutletSchema, Outlet };

export interface ClockUser {
	id: number;
	name: string;
	staffType: StaffType;
	outletId: number;
}

export enum StaffType {
	Manager = 1,
	Waiter,
	Chef,
}
