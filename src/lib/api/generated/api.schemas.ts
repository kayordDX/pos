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

export type MenuGetItemGetMenuItemsParams = {
	id: number;
};

export type MenuGetItemsGetMenuItemsParams = {
	menuId: number;
	sectionId: number;
	search?: string | null;
};

export type MenuGetOutletMenuGetOutletMenusParams = {
	outletId: number;
};

export type MenuGetSectionsGetMenusSectionsParams = {
	menuId: number;
	sectionId: number;
};

export type PayGetLinkParams = {
	amount: number;
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

export interface BusinessCreateRequest {
	name: string;
}

export interface BusinessDeleteRequest {
	id: number;
}

export interface BusinessEditRequest {
	id: number;
	name: string;
}

export interface BusinessGetRequest {
	[key: string]: any;
}

export interface ClockClockInRequest {
	outletId: number;
}

export interface ClockClockOutRequest {
	outletId: number;
}

export interface EntitiesClock {
	endDate?: string | null;
	id: number;
	outlet: EntitiesOutlet;
	outletId: number;
	startDate: string;
	user: EntitiesUser;
	userId: string;
}

export interface ClockListRequest {
	[key: string]: any;
}

export interface MenuCreateRequest {
	division: CommonEnumsDivision;
	name: string;
	outletId: number;
}

export interface MenuGetRequest {
	[key: string]: any;
}

export interface MenuListRequest {
	[key: string]: any;
}

export interface MenuGetItemRequest {
	[key: string]: any;
}

export interface DTOOptionDTO {
	name: string;
	optionGroupId: number;
	optionId: number;
	price: number;
}

export interface DTOOptionGroupDTO {
	maxSelections: number;
	minSelections: number;
	name: string;
	optionGroupId: number;
	options: DTOOptionDTO[];
}

export interface DTOMenuItemOptionGroupDTO {
	menuItemId: number;
	optionGroup: DTOOptionGroupDTO;
	optionGroupId: number;
}

export interface DTOMenuItemDTO {
	description: string;
	division: CommonEnumsDivision;
	extras?: EntitiesExtra[] | null;
	menuItemId: number;
	menuItemOptionGroups: DTOMenuItemOptionGroupDTO[];
	menuSectionId: number;
	name: string;
	position: number;
	price: number;
	tags?: EntitiesTag[] | null;
}

export interface MenuGetItemsRequest {
	[key: string]: any;
}

export interface DTOMenuItemDTOBasic {
	description: string;
	menuItemId: number;
	menuSectionId: number;
	name: string;
	position: number;
	price: number;
	tags?: EntitiesTag[] | null;
}

export interface MenuGetOutletMenuRequest {
	[key: string]: any;
}

export interface MenuGetSectionsRequest {
	[key: string]: any;
}

export interface DTOMenuSectionParentDTO {
	menuId: number;
	menuSectionId: number;
	name?: string | null;
	parentId?: number | null;
}

export type DTOMenuSectionDTOParent = DTOMenuSectionParentDTO | null;

export interface DTOMenuSectionDTO {
	menuId: number;
	menuSectionId: number;
	name?: string | null;
	parent?: DTOMenuSectionDTOParent;
	parentId?: number | null;
}

export interface MenuGetSectionsResponse {
	parents?: DTOMenuSectionDTO[] | null;
	sections?: DTOMenuSectionDTO[] | null;
}

export interface MenuUpdateRequest {
	id: number;
	name: string;
}

export interface OutletCreateRequest {
	businessId: number;
	name: string;
}

export interface OutletGetRequest {
	[key: string]: any;
}

export interface OutletUpdateRequest {
	businessId: number;
	name: string;
}

export interface PayGetLinkRequest {
	[key: string]: any;
}

export interface CommonWrapperResult {
	error: string;
	failure: boolean;
	success: boolean;
}

export interface PayGetLinkResponse {
	reference: string;
	url: string;
}

export type CommonWrapperResultOfResponseAllOfValue = PayGetLinkResponse | null;

export type CommonWrapperResultOfResponseAllOf = {
	value?: CommonWrapperResultOfResponseAllOfValue;
};

export type CommonWrapperResultOfResponse = CommonWrapperResult &
	CommonWrapperResultOfResponseAllOf;

export interface PayStatusSSERequest {
	[key: string]: any;
}

export interface PayStatusRequest {
	[key: string]: any;
}

export interface SalesPeriodCloseRequest {
	salesPeriodId: number;
}

export interface SalesPeriodCreateRequest {
	name: string;
	outletId: number;
}

export interface SalesPeriodGetRequest {
	[key: string]: any;
}

export interface SectionCreateRequest {
	name: string;
	outletId: number;
}

export interface SectionGetRequest {
	[key: string]: any;
}

export interface SectionListRequest {
	[key: string]: any;
}

export interface SectionUpdateRequest {
	id: number;
	name: string;
}

export interface TableCreateRequest {
	capacity: number;
	name: string;
	sectionId: number;
}

export interface TableGetAvailableRequest {
	[key: string]: any;
}

export interface TableGetAvailableSectionDto {
	id: number;
	name: string;
}

export interface TableGetAvailableResponse {
	capacity: number;
	name: string;
	section: TableGetAvailableSectionDto;
	sectionId: number;
	tableId: number;
}

export interface TableGetMyBookedRequest {
	[key: string]: any;
}

export interface TableGetMyBookedSectionDto {
	id: number;
	name: string;
}

export interface TableGetMyBookedTableDto {
	name: string;
	section: TableGetMyBookedSectionDto;
	tableId: number;
}

export interface TableGetMyBookedResponse {
	bookingDate: string;
	bookingName: string;
	id: number;
	salesPeriodId: number;
	staffId: number;
	table: TableGetMyBookedTableDto;
	tableId: number;
}

export interface TableUpdateRequest {
	capacity: number;
	name: string;
	sectionId: number;
}

export interface TableBookingCreateRequest {
	bookingName: string;
	salesPeriodId: number;
	tableId: number;
}

export interface TableCashUpCreateRequest {
	outletId: number;
	salesAmount: number;
	tableBookingId: number;
	totalAmount: number;
}

export interface TableCashUpViewTableCashUpsRequest {
	[key: string]: any;
}

export type EntitiesUserRoleRole = EntitiesRole | null;

export interface EntitiesUser {
	email: string;
	image: string;
	isActive: boolean;
	name: string;
	userId: string;
	userRole?: EntitiesUserRole[] | null;
}

export interface EntitiesUserRole {
	role?: EntitiesUserRoleRole;
	roleId: number;
	user: EntitiesUser;
	userId: string;
	userRoleId: number;
}

export interface EntitiesRole {
	description: string;
	name: string;
	roleId: number;
	userRole?: EntitiesUserRole[] | null;
}

export interface EntitiesTableBooking {
	bookingDate: string;
	bookingName: string;
	id: number;
	salesPeriod: EntitiesSalesPeriod;
	salesPeriodId: number;
	table: EntitiesTable;
	tableId: number;
	user: EntitiesUser;
	userId: string;
}

export interface EntitiesTableCashUp {
	cashUpDate: string;
	id: number;
	outlet: EntitiesOutlet;
	outletId: number;
	salesAmount: number;
	tableBooking: EntitiesTableBooking;
	tableBookingId: number;
	totalAmount: number;
}

export interface OrderAddItemsOrder {
	extraIds?: number[] | null;
	menuItemId: number;
	optionIds?: number[] | null;
	orderId: number;
}

export interface OrderAddItemsRequest {
	orders: OrderAddItemsOrder[];
	tableBookingId: number;
}

export interface OrderViewOrdersRequest {
	[key: string]: any;
}

export interface TableOrderCreateRequest {
	tableBookingId: number;
}

export type ErrorResponseErrors = { [key: string]: string[] };

export interface ErrorResponse {
	errors: ErrorResponseErrors;
	message: string;
	statusCode: number;
}

export interface EntitiesMenuItemOptionGroup {
	menuItem: EntitiesMenuItem;
	menuItemId: number;
	optionGroup: EntitiesOptionGroup;
	optionGroupId: number;
}

export interface EntitiesOptionGroup {
	maxSelections: number;
	menuItemOptionGroups?: EntitiesMenuItemOptionGroup[] | null;
	minSelections: number;
	name: string;
	optionGroupId: number;
	options: EntitiesOption[];
}

export interface EntitiesOption {
	name: string;
	optionGroup: EntitiesOptionGroup;
	optionGroupId: number;
	optionId: number;
	price: number;
}

export type CommonEnumsDivision = (typeof CommonEnumsDivision)[keyof typeof CommonEnumsDivision];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const CommonEnumsDivision = {
	Bar: 0,
	Kitchen: 1,
	Barista: 2,
} as const;

export interface EntitiesExtra {
	extraId: number;
	name: string;
	positionId: number;
	price: number;
}

export interface EntitiesTag {
	name: string;
	tagId: number;
}

export interface NpgsqlTypesNpgsqlTsVectorLexeme {
	count: number;
	text: string;
}

export type EntitiesMenuSectionParent = EntitiesMenuSection | null;

export interface EntitiesMenuItem {
	description: string;
	division: CommonEnumsDivision;
	extras?: EntitiesExtra[] | null;
	menuItemId: number;
	menuItemOptionGroups?: EntitiesMenuItemOptionGroup[] | null;
	menuSection: EntitiesMenuSection;
	menuSectionId: number;
	name: string;
	position: number;
	price: number;
	searchVector: NpgsqlTypesNpgsqlTsVectorLexeme[];
	tags?: EntitiesTag[] | null;
}

export interface EntitiesMenuSection {
	menu: EntitiesMenu;
	menuId: number;
	menuItems?: EntitiesMenuItem[] | null;
	menuSectionId: number;
	name?: string | null;
	parent?: EntitiesMenuSectionParent;
	parentId?: number | null;
	subMenuSections?: EntitiesMenuSection[] | null;
}

export interface EntitiesMenu {
	id: number;
	menuSections?: EntitiesMenuSection[] | null;
	name: string;
	outlet: EntitiesOutlet;
	outletId: number;
}

export interface EntitiesOrderItem {
	extras?: EntitiesExtra[] | null;
	menuItem: EntitiesMenuItem;
	menuItemId: number;
	options?: EntitiesOption[] | null;
	orderItemId: number;
	tableBookingId: number;
}

export type EntitiesTableOrderOrderItem = EntitiesOrderItem | null;

export interface EntitiesTableOrder {
	customer: EntitiesCustomer;
	customerId: number;
	orderDate: string;
	orderItem?: EntitiesTableOrderOrderItem;
	orderItemId?: number | null;
	tableBookingId: number;
	tableOrderId: number;
}

export interface RoleAddUserInRoleRequest {
	roleId: number;
	userId: string;
}

export interface RoleCreateRequest {
	description: string;
	name: string;
}

export interface UserAssignOutletRequest {
	outletId: number;
}

export interface EntitiesUserOutlet {
	id: number;
	isCurrent: boolean;
	outletId: number;
	userId: string;
}

export interface UserGetRolesRequest {
	[key: string]: any;
}

export type Order = (typeof Order)[keyof typeof Order];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const Order = {
	Before: 0,
	After: 1,
} as const;

export interface EntitiesCustomer {
	customerId: number;
	name: string;
	orders: Order[];
}

export interface EntitiesOutlet {
	business: EntitiesBusiness;
	businessId: number;
	id: number;
	name: string;
	sections?: EntitiesSection[] | null;
}

export interface EntitiesSection {
	id: number;
	name: string;
	outlet: EntitiesOutlet;
	outletId: number;
	tables?: EntitiesTable[] | null;
}

export interface EntitiesTable {
	capacity: number;
	customers: EntitiesCustomer[];
	name: string;
	section: EntitiesSection;
	sectionId: number;
	tableId: number;
}

export interface EntitiesBusiness {
	id: number;
	name: string;
	outlets?: EntitiesOutlet[] | null;
}

export interface EntitiesSalesPeriod {
	endDate?: string | null;
	id: number;
	name?: string | null;
	outlet: EntitiesOutlet;
	outletId: number;
	startDate?: string | null;
}

export interface UserGetStatusResponse {
	clockedIn: boolean;
	outletId: number;
	salesPeriod: EntitiesSalesPeriod;
	salesPeriodId: number;
}

export interface UserValidateRequest {
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

export interface UserValidateResponse {
	userId: string;
	userRoles?: string[] | null;
}
