// @ts-nocheck
/**
 * Generated by orval v6.24.0 🍺
 * Do not edit manually.
 * Kayord.Pos
 * OpenAPI spec version: v1
 */
export type ClockListParams = {
	outletId: number;
	statusId: number;
};

export type MenuListParams = {
	outletId: number;
};

export type MenuGetOutletMenuGetOutletMenusParams = {
	outletId: number;
};

export type MenuGetSectionsGetOutletMenusParams = {
	outletId: number;
	sectionId: number;
	search?: string | null;
};

export type SectionListParams = {
	outletId: number;
};

export type TableGetAvailableParams = {
	outletId: number;
};

export type TableGetMyBookedParams = {
	outletId: number;
	myBooking: boolean;
};

export type OrderViewOrdersParams = {
	tableBookingId: number;
};

export type UserGetRolesParams = {
	userId: string | null;
};

export interface Request38 {
	name: string;
}

export interface Request37 {
	id: number;
}

export interface Request36 {
	id: number;
	name: string;
}

export interface Request35 {
	[key: string]: any;
}

export interface Request34 {
	outletId: number;
}

export interface Request33 {
	outletId: number;
}

export interface Clock {
	endDate?: string | null;
	id: number;
	outlet: Outlet;
	outletId: number;
	startDate: string;
	user: User;
	userId: string;
}

export interface Request32 {
	[key: string]: any;
}

export interface Request31 {
	division: Division;
	name: string;
	outletId: number;
}

export interface Request30 {
	[key: string]: any;
}

export interface Request29 {
	[key: string]: any;
}

export interface Request28 {
	[key: string]: any;
}

export interface Request27 {
	[key: string]: any;
}

export interface Response5 {
	items: MenuItem[];
	sections: MenuSection[];
}

export interface Request26 {
	id: number;
	name: string;
}

export interface Request25 {
	businessId: number;
	name: string;
}

export interface Request24 {
	[key: string]: any;
}

export interface Request23 {
	businessId: number;
	name: string;
}

export interface Request22 {
	salesPeriodId: number;
}

export interface Request21 {
	name: string;
	outletId: number;
}

export interface Request20 {
	[key: string]: any;
}

export interface Request19 {
	name: string;
	outletId: number;
}

export interface Request18 {
	[key: string]: any;
}

export interface Request17 {
	[key: string]: any;
}

export interface Request16 {
	id: number;
	name: string;
}

export interface Request15 {
	capacity: number;
	name: string;
	sectionId: number;
}

export interface Request14 {
	[key: string]: any;
}

export interface SectionDto2 {
	id: number;
	name: string;
}

export interface Response4 {
	capacity: number;
	name: string;
	section: SectionDto2;
	sectionId: number;
	tableId: number;
}

export interface Request13 {
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

export interface Response3 {
	bookingDate: string;
	bookingName: string;
	id: number;
	salesPeriodId: number;
	staffId: number;
	table: TableDto;
	tableId: number;
}

export interface Request12 {
	capacity: number;
	name: string;
	sectionId: number;
}

export interface Request11 {
	bookingName: string;
	salesPeriodId: number;
	tableId: number;
}

export interface Request10 {
	outletId: number;
	salesAmount: number;
	tableBookingId: number;
	totalAmount: number;
}

export interface Request9 {
	[key: string]: any;
}

export type UserRoleRole = Role | null;

export interface User {
	email: string;
	image: string;
	isActive: boolean;
	name: string;
	userId: string;
	userRole?: UserRole[] | null;
}

export interface UserRole {
	role?: UserRoleRole;
	roleId: number;
	user: User;
	userId: string;
	userRoleId: number;
}

export interface Role {
	description: string;
	name: string;
	roleId: number;
	userRole?: UserRole[] | null;
}

export interface TableBooking {
	bookingDate: string;
	bookingName: string;
	id: number;
	salesPeriod: SalesPeriod;
	salesPeriodId: number;
	table: Table;
	tableId: number;
	user: User;
	userId: string;
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

export interface Request8 {
	menuItemId: number;
}

export type Division = (typeof Division)[keyof typeof Division];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const Division = {
	Bar: 0,
	Kitchen: 1,
	Barista: 2,
} as const;

export interface Extra {
	extraId: number;
	name: string;
}

export interface Tag {
	name: string;
	tagId: number;
}

export interface Option {
	name?: string | null;
	optionId: number;
}

export interface NpgsqlTsVectorLexeme {
	count: number;
	text: string;
}

export interface Menu {
	id: number;
	menuSections?: MenuSection[] | null;
	name: string;
	outlet: Outlet;
	outletId: number;
}

export type MenuSectionParent = MenuSection | null;

export interface MenuItem {
	description: string;
	division: Division;
	extras?: Extra[] | null;
	menuItemId: number;
	menuSection: MenuSection;
	menuSectionId: number;
	name: string;
	options?: Option[] | null;
	position: number;
	price: number;
	searchVector: NpgsqlTsVectorLexeme[];
	tags?: Tag[] | null;
}

export interface MenuSection {
	menu: Menu;
	menuId: number;
	menuItems?: MenuItem[] | null;
	menuSectionId: number;
	name?: string | null;
	parent?: MenuSectionParent;
	parentId?: number | null;
	subMenuSections?: MenuSection[] | null;
}

export interface Request7 {
	[key: string]: any;
}

export interface Request6 {
	tableBookingId: number;
}

export type ErrorResponseErrors = { [key: string]: string[] };

export interface ErrorResponse {
	errors: ErrorResponseErrors;
	message: string;
	statusCode: number;
}

export interface TableOrder {
	customer: Customer;
	customerId: number;
	orderDate: string;
	tableBookingId: number;
	tableOrderId: number;
}

export interface Request5 {
	roleId: number;
	userId: string;
}

export interface Request4 {
	description: string;
	name: string;
}

export interface Request3 {
	outletId: number;
}

export interface UserOutlet {
	id: number;
	isCurrent: boolean;
	outletId: number;
	userId: string;
}

export interface Request2 {
	[key: string]: any;
}

export type Order = (typeof Order)[keyof typeof Order];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const Order = {
	Before: 0,
	After: 1,
} as const;

export interface OrderItem {
	menuItem: MenuItem;
	menuItemId: number;
	order: Order;
	orderId: number;
	orderItemId: number;
	quantity: number;
}

export interface Customer {
	customerId: number;
	name: string;
	orders: Order[];
}

export interface Outlet {
	business: Business;
	businessId: number;
	id: number;
	name: string;
	sections?: Section[] | null;
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

export interface Business {
	id: number;
	name: string;
	outlets?: Outlet[] | null;
}

export interface SalesPeriod {
	endDate?: string | null;
	id: number;
	name?: string | null;
	outlet: Outlet;
	outletId: number;
	startDate?: string | null;
}

export interface Response2 {
	clockedIn: boolean;
	outletId: number;
	salesPeriod: SalesPeriod;
	salesPeriodId: number;
}

export interface Request {
	email?: string | null;
	firstName?: string | null;
	image?: string | null;
	lastName?: string | null;
	name?: string | null;
	userId?: string | null;
}

export interface InternalErrorResponse {
	code: number;
	note: string;
	reason: string;
	status: string;
}

export interface Response {
	userId: string;
	userRoles?: string[] | null;
}
