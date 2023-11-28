import type { OutletSchema, Outlet } from "../routes/setup/schema";

export interface APIError {
	type: string;
	title: string;
	status: number;
	errors?: APIErrors;
}

export interface APIErrors {
	Id: string[];
}

export interface ValidationError {
	statusCode: string;
	message: string;
	errors?: ValidationErrorItem;
}

interface ValidationErrorItem {
	[key: string]: string[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isAPIError = (apiError: any): apiError is APIError => {
	return "status" in apiError && "type" in apiError && "title" in apiError;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isValidationError = (apiError: any): apiError is ValidationError => {
	return "statusCode" in apiError && "message" in apiError && "errors" in apiError;
};

export interface UserDTO {
	id: number;
	name: string;
	type: number;
}

export interface User extends UserDTO {
	token: string;
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
