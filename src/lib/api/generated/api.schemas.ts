/**
 * Generated by orval v6.21.0 🍺
 * Do not edit manually.
 * Kayord.Pos
 * OpenAPI spec version: v1
 */
export type TableGetMyBookedParams = {
	OutletId: number;
	myBooking: boolean;
};

export type TableGetAvailableParams = {
	OutletId: number;
};

export type SectionListParams = {
	OutletId: number;
};

export type OrderViewOrdersParams = {
	TableBookingId: number;
};

export type MenuListParams = {
	OutletId: number;
};

export type ClockListParams = {
	OutletId: number;
	StatusId: number;
};

export interface Request35 {
	name: string;
}

export interface Request34 {
	id: number;
}

export interface Request33 {
	id: number;
	name: string;
}

export interface Request32 {
	[key: string]: any;
}

export interface Request31 {
	salesPeriodId: number;
	staffId: number;
}

export interface Request30 {
	salesPeriodId: number;
	staffId: number;
}

export interface Request29 {
	[key: string]: any;
}

export interface Request28 {
	name: string;
	outletId: number;
}

export interface Request27 {
	[key: string]: any;
}

export interface Request26 {
	[key: string]: any;
}

export interface Request25 {
	id: number;
	name: string;
}

export interface Request24 {
	name: string;
	price: number;
}

export interface Request23 {
	[key: string]: any;
}

export interface Request22 {
	businessId: number;
	name: string;
}

export interface Request21 {
	businessId: number;
	name: string;
}

export interface Request20 {
	[key: string]: any;
}

export interface Request19 {
	name: string;
	outletId: number;
	startDate: string;
}

export interface Request18 {
	[key: string]: any;
}

export interface Request17 {
	name: string;
	outletId: number;
}

export interface Request16 {
	[key: string]: any;
}

export interface Request15 {
	[key: string]: any;
}

export interface Request14 {
	id: number;
	name: string;
}

export interface Request13 {
	staffId: number;
}

export interface Response3 {
	token: string;
}

export interface Request12 {
	businessId: number;
	name: string;
	outletId: number;
	staffType: StaffType;
}

export interface Request11 {
	[key: string]: any;
}

export interface Clock {
	endDate?: string | null;
	id: number;
	salesPeriod: SalesPeriod;
	salesPeriodId: number;
	staff: Staff;
	staffId: number;
	startDate: string;
}

export interface Request10 {
	capacity: number;
	name: string;
	sectionId: number;
}

export interface Request9 {
	[key: string]: any;
}

export interface SectionDto2 {
	id: number;
	name: string;
}

export interface Response2 {
	capacity: number;
	name: string;
	section: SectionDto2;
	sectionId: number;
	tableId: number;
}

export interface Request8 {
	[key: string]: any;
}

export interface SectionDto {
	id: number;
	name: string;
}

export interface TableDto {
	name: string;
	section: SectionDto;
	tableId: number;
}

export interface Response {
	bookingDate: string;
	bookingName: string;
	id: number;
	salesPeriodId: number;
	staffId: number;
	table: TableDto;
	tableId: number;
}

export interface Request7 {
	capacity: number;
	name: string;
	sectionId: number;
}

export interface Request6 {
	bookingName: string;
	salesPeriodId: number;
	staffId: number;
	tableId: number;
}

export interface Request5 {
	outletId: number;
	salesAmount: number;
	tableBookingId: number;
	totalAmount: number;
}

export interface Request4 {
	[key: string]: any;
}

export type StaffType = (typeof StaffType)[keyof typeof StaffType];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const StaffType = {
	Manager: 1,
	Waiter: 2,
	Chef: 3,
} as const;

export interface Request3 {
	menuItemId: number;
}

export interface Outlet {
	business: Business;
	businessId: number;
	id: number;
	name: string;
	sections?: Section[] | null;
}

export interface Staff {
	id: number;
	name: string;
	outlet: Outlet;
	outletId: number;
	staffType: StaffType;
}

export interface SalesPeriod {
	endDate?: string | null;
	id: number;
	name?: string | null;
	outlet: Outlet;
	outletId: number;
	startDate?: string | null;
}

export interface TableCashUp {
	cashUpDate: string;
	id: number;
	outlet: Outlet;
	outletId: number;
	salesAmount: number;
	tableBooking: TableBooking;
	tableBookingId: number;
	totalAmount: number;
}

export interface Section {
	id: number;
	name: string;
	outlet: Outlet;
	outletId: number;
	tables?: Table[] | null;
}

export interface Table {
	capacity: number;
	customers: Customer[];
	name: string;
	section: Section;
	sectionId: number;
	tableId: number;
}

export interface TableBooking {
	bookingDate: string;
	bookingName: string;
	id: number;
	salesPeriod: SalesPeriod;
	salesPeriodId: number;
	staff: Staff;
	staffId: number;
	table: Table;
	tableId: number;
}

export interface Business {
	id: number;
	name: string;
	outlets?: Outlet[] | null;
}

export interface OrderItem {
	menuItem: MenuItem;
	menuItemId: number;
	order: Order;
	orderId: number;
	orderItemId: number;
	quantity: number;
}

export interface MenuItem {
	menu: Menu;
	menuId: number;
	menuItemId: number;
	name: string;
	orderItems: OrderItem[];
	price: number;
}

export interface Menu {
	id: number;
	menuItems: MenuItem[];
	name: string;
	outlet: Outlet;
	outletId: number;
}

export interface Request2 {
	[key: string]: any;
}

export interface Request {
	tableBookingId: number;
}

export interface InternalErrorResponse {
	code: number;
	note: string;
	reason: string;
	status: string;
}

export type ErrorResponseErrors = { [key: string]: string[] };

export interface ErrorResponse {
	errors: ErrorResponseErrors;
	message: string;
	statusCode: number;
}

export type Order = (typeof Order)[keyof typeof Order];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const Order = {
	Before: 0,
	After: 1,
} as const;

export interface Customer {
	customerId: number;
	name: string;
	orders: Order[];
}

export interface TableOrder {
	customer: Customer;
	customerId: number;
	orderDate: string;
	tableBookingId: number;
	tableOrderId: number;
}
