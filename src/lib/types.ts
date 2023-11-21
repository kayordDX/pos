export interface User {
	id: number;
	name: string;
	email: string;
	type: number;
}

export interface UserToken {
	token: string;
}

export interface Outlet {
	id: number;
	salesPeriod: string;
}
