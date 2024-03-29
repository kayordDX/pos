// @ts-nocheck
/**
 * Generated by orval v6.25.0 🍺
 * Do not edit manually.
 * Kayord.Pos
 * OpenAPI spec version: v1
 */
export type BusinessDelete200Two = {};

export type BusinessDelete200One = {};

export type BusinessEdit200Two = {};

export type BusinessEdit200One = {};

export type ClockListParams = {
	outletId: number;
	statusId: number;
};

export type ManagerOrderViewParams = {
	divisionIds: number[];
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
	tableBookingId: number;
};

export type RoleAddUserInRole200Two = {};

export type RoleAddUserInRole200One = {};

export type RoleCreate200Two = {};

export type RoleCreate200One = {};

export type SalesPeriodCashUpParams = {
	salesPeriodId: number;
	userId: string;
};

export type SalesPeriodCreateCashUpParams = {
	cashUpTotal: number;
	tableCount: number;
	cashUpBalance: number;
	cashUpTotalPayments: number;
	salesPeriodId: number;
	userId: string;
	signOffUserId: string;
	signOffDate?: string | null;
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

export type TableOrderGetBasketParams = {
	tableBookingId: number;
};

export type TableOrderGetBillParams = {
	tableBookingId: number;
};

export type TableOrderBackOfficeParams = {
	divisionIds?: string | null;
};

export type TableOrderFrontOfficeParams = {
	divisionIds?: string | null;
};

export type UserGetRolesParams = {
	userId: string;
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

export interface ManagerOrderViewRequest {
	[key: string]: any;
}

export interface ManagerOrderViewOrderItemStatusDTO {
	orderItemStatusId: number;
	status: string;
}

export interface ManagerOrderViewMenuItemDTO {
	description: string;
	divisionId?: number | null;
	menuItemId: number;
	name: string;
	position: number;
	price: number;
}

export interface ManagerOrderViewOrderItemDTO {
	divisionId: number;
	menuItem: ManagerOrderViewMenuItemDTO;
	note?: string | null;
	orderItemExtras?: DTOOrderItemExtraDTO[] | null;
	orderItemId: number;
	orderItemOptions?: DTOOrderItemOptionDTO[] | null;
	orderItemStatus: ManagerOrderViewOrderItemStatusDTO;
	orderItemStatusId: number;
	orderReceived: string;
	orderReceivedFormatted: string;
	orderUpdated: string;
	orderUpdatedFormatted: string;
	tableBookingId: number;
}

export interface ManagerOrderViewTableBookingDTO {
	bookingDate: string;
	bookingName: string;
	closeDate?: string | null;
	id: number;
	orderItems?: ManagerOrderViewOrderItemDTO[] | null;
	table: ManagerOrderViewTableDTO;
	tableId: number;
	user: DTOUserDTO;
}

export interface ManagerOrderViewResponse {
	division: EntitiesDivision;
	divisionId: number;
	lastRefresh: string;
	pendingItems: number;
	pendingTables: number;
	tables?: ManagerOrderViewTableBookingDTO[] | null;
}

export interface MenuCreateRequest {
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

export interface DTOExtraGroupDTO {
	extraGroupId: number;
	extras: DTOExtraDTO[];
	name: string;
}

export interface DTOMenuItemExtraGroupDTO {
	extraGroup: DTOExtraGroupDTO;
	extraGroupId: number;
	menuItemId: number;
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
	divisionId: number;
	menuItemExtraGroups: DTOMenuItemExtraGroupDTO[];
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

export interface DTOMenuSectionBasicDTO {
	menuSectionId: number;
	name?: string | null;
}

export interface DTOMenuItemDTOBasic {
	description: string;
	isAvailable: boolean;
	menuItemId: number;
	menuSection: DTOMenuSectionBasicDTO;
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

export interface NotificationTestRequest {
	message: string;
}

export interface NotificationUserRequest {
	message: string;
	userId: string;
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

export interface PayHaloPayRequest {
	[key: string]: any;
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

export interface PayManualPaymentRequest {
	amount: number;
	tableBookingId: number;
}

export interface PayStatusRequest {
	[key: string]: any;
}

export interface CommonWrapperResult {
	error: string;
	failure: boolean;
	success: boolean;
}

export interface PayDtoStatusResultDto {
	amount: number;
	authorisationCode: string;
	createdAt: string;
	currency: string;
	currencyCode: string;
	disposition: string;
	merchantTransactionReference: string;
	paymentReference: string;
	qrCodeState: string;
	responseCode: number;
	status: string;
	transactionId: string;
	type: string;
	updatedAt: string;
	userId: string;
}

export type CommonWrapperResultOfStatusResultDtoAllOfValue = PayDtoStatusResultDto | null;

export type CommonWrapperResultOfStatusResultDtoAllOf = {
	value?: CommonWrapperResultOfStatusResultDtoAllOfValue;
};

export type CommonWrapperResultOfStatusResultDto = CommonWrapperResult &
	CommonWrapperResultOfStatusResultDtoAllOf;

export interface RoleAddUserInRoleRequest {
	roleId: number;
	userId: string;
}

export interface RoleCreateRequest {
	description: string;
	name: string;
}

export interface SalesPeriodCashUpRequest {
	[key: string]: any;
}

export interface SalesPeriodCashUpBillMenuItemDTO {
	menuItemId: number;
	name: string;
	price: number;
}

export interface SalesPeriodCashUpBillOrderItemDTO {
	menuItem: SalesPeriodCashUpBillMenuItemDTO;
	menuItemId: number;
	note?: string | null;
	orderItemExtras?: DTOOrderItemExtraDTO[] | null;
	orderItemId: number;
	orderItemOptions?: DTOOrderItemOptionDTO[] | null;
	tableBooking: DTOTableBookingDTO;
	tableBookingId: number;
	userId: string;
}

export type SalesPeriodCashUpTableCashUpUser = DTOUserDTO | null;

export interface SalesPeriodCashUpTableCashUp {
	balance: number;
	orderItems: SalesPeriodCashUpBillOrderItemDTO[];
	paymentsReceived: EntitiesPayment[];
	tablePaymentTotal: number;
	total: number;
	user?: SalesPeriodCashUpTableCashUpUser;
	userId?: string | null;
}

export interface SalesPeriodCashUpUserCashUp {
	tableCashUps: SalesPeriodCashUpTableCashUp[];
	tableTurnaroundTime: string;
	user: DTOUserDTO;
	userBalance: number;
	userId: string;
	userPaymentTotal: number;
	userTipTotal: number;
	userTotal: number;
}

export type SalesPeriodCashUpCashUpAllOf = {
	userCashUps: SalesPeriodCashUpUserCashUp[];
};

export interface SalesPeriodCloseRequest {
	salesPeriodId: number;
}

export interface SalesPeriodCreateRequest {
	name: string;
	outletId: number;
}

export interface SalesPeriodCreateCashUpRequest {
	[key: string]: any;
}

export interface EntitiesCashUp {
	cashUpBalance: number;
	cashUpTotal: number;
	cashUpTotalPayments: number;
	id: number;
	openTableCount: number;
	salesPeriod: EntitiesSalesPeriod;
	salesPeriodId: number;
	signOffDate?: string | null;
	signOffUserId: string;
	tableCount: number;
	userId: string;
}

export type SalesPeriodCashUpCashUp = EntitiesCashUp & SalesPeriodCashUpCashUpAllOf;

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

export interface TableBookingCloseRequest {
	tableBookingId: number;
}

export interface TableBookingCreateRequest {
	bookingName: string;
	salesPeriodId: number;
	tableId: number;
}

export interface TableBookingGetRequest {
	[key: string]: any;
}

export type ErrorResponseErrors = { [key: string]: string[] };

export interface ErrorResponse {
	errors: ErrorResponseErrors;
	message: string;
	statusCode: number;
}

export interface ManagerOrderViewSectionDTO {
	name: string;
}

export type ManagerOrderViewTableDTOSection = ManagerOrderViewSectionDTO | null;

export interface ManagerOrderViewTableDTO {
	name: string;
	outletId: number;
	section?: ManagerOrderViewTableDTOSection;
	tableId: number;
}

export interface TableBookingGetResponse {
	bookingDate: string;
	bookingName: string;
	closeDate?: string | null;
	id: number;
	salesPeriodId: number;
	table: ManagerOrderViewTableDTO;
	tableId: number;
	user: DTOUserDTO;
	userId: string;
}

export interface OrderAddItemsOrder {
	extraIds?: number[] | null;
	menuItemId: number;
	note: string;
	optionIds?: number[] | null;
}

export interface OrderAddItemsRequest {
	orders: OrderAddItemsOrder[];
	tableBookingId: number;
}

export interface OrderClearBasketRequest {
	tableBookingId: number;
}

export interface TableOrderGetBasketRequest {
	[key: string]: any;
}

export interface TableOrderGetBasketBillMenuItemDTO {
	menuItemId: number;
	name: string;
	price: number;
}

export interface TableOrderGetBasketBillOrderItemDTO {
	menuItem: TableOrderGetBasketBillMenuItemDTO;
	menuItemId: number;
	note?: string | null;
	orderItemExtras?: DTOOrderItemExtraDTO[] | null;
	orderItemId: number;
	orderItemOptions?: DTOOrderItemOptionDTO[] | null;
	tableBooking: DTOTableBookingDTO;
	tableBookingId: number;
}

export interface TableOrderGetBasketResponse {
	orderItems: TableOrderGetBasketBillOrderItemDTO[];
	total: number;
}

export interface TableOrderGetBillRequest {
	[key: string]: any;
}

export interface EntitiesPaymentType {
	paymentTypeId: number;
	paymentTypeName: string;
}

export interface EntitiesPayment {
	amount: number;
	dateReceived: string;
	id: number;
	paymentReference: string;
	paymentType: EntitiesPaymentType;
	paymentTypeId?: number | null;
	tableBookingId: number;
	userId: string;
}

export interface TableOrderGetBillBillMenuItemDTO {
	menuItemId: number;
	name: string;
	price: number;
}

export interface DTOTableBookingDTO {
	bookingDate: string;
	bookingName: string;
	closeDate?: string | null;
	id: number;
	tableId: number;
	user: DTOUserDTO;
	userId: string;
}

export interface TableOrderGetBillBillOrderItemDTO {
	menuItem: TableOrderGetBillBillMenuItemDTO;
	menuItemId: number;
	note?: string | null;
	orderItemExtras?: DTOOrderItemExtraDTO[] | null;
	orderItemId: number;
	orderItemOptions?: DTOOrderItemOptionDTO[] | null;
	tableBooking: DTOTableBookingDTO;
	tableBookingId: number;
}

export interface TableOrderGetBillResponse {
	balance: number;
	orderItems: TableOrderGetBillBillOrderItemDTO[];
	paymentsReceived: EntitiesPayment[];
	tipAmount: number;
	total: number;
}

export interface TableOrderBackOfficeRequest {
	[key: string]: any;
}

export interface TableOrderBackOfficeResponse {
	lastRefresh: string;
	pendingItems: number;
	pendingTables: number;
	tables?: TableOrderOfficeTableBookingDTO[] | null;
}

export interface TableOrderFrontOfficeRequest {
	[key: string]: any;
}

export interface DTOUserDTO {
	email: string;
	image: string;
	isActive: boolean;
	name: string;
	userId: string;
}

export interface DTOExtraGroupBasicDTO {
	extraGroupId: number;
	name: string;
}

export interface DTOExtraDTO {
	extraGroup: DTOExtraGroupBasicDTO;
	extraGroupId: number;
	extraId: number;
	name: string;
	positionId: number;
	price: number;
}

export interface DTOOrderItemExtraDTO {
	extra: DTOExtraDTO;
	extraId: number;
	orderItemExtraId: number;
	orderItemId: number;
}

export interface DTOOptionGroupBasicDTO {
	name: string;
	optionGroupId: number;
}

export interface DTOOptionDTO {
	name: string;
	optionGroup: DTOOptionGroupBasicDTO;
	optionGroupId: number;
	optionId: number;
	price: number;
}

export interface DTOOrderItemOptionDTO {
	option: DTOOptionDTO;
	optionId: number;
	orderItemId: number;
	orderItemOptionId: number;
}

export interface TableOrderOfficeOrderItemStatusDTO {
	orderItemStatusId: number;
	status: string;
}

export interface TableOrderOfficeMenuItemDTO {
	description: string;
	divisionId: number;
	menuItemId: number;
	name: string;
	position: number;
	price: number;
}

export interface TableOrderOfficeOrderItemDTO {
	divisionId: number;
	menuItem: TableOrderOfficeMenuItemDTO;
	note?: string | null;
	orderItemExtras?: DTOOrderItemExtraDTO[] | null;
	orderItemId: number;
	orderItemOptions?: DTOOrderItemOptionDTO[] | null;
	orderItemStatus: TableOrderOfficeOrderItemStatusDTO;
	orderItemStatusId: number;
	orderReceived: string;
	orderReceivedFormatted: string;
	orderUpdated: string;
	orderUpdatedFormatted: string;
	tableBookingId: number;
}

export interface TableOrderOfficeSectionDTO {
	name: string;
}

export type TableOrderOfficeTableDTOSection = TableOrderOfficeSectionDTO | null;

export interface TableOrderOfficeTableDTO {
	name: string;
	outletId: number;
	section?: TableOrderOfficeTableDTOSection;
	tableId: number;
}

export interface TableOrderOfficeTableBookingDTO {
	bookingDate: string;
	bookingName: string;
	closeDate?: string | null;
	id: number;
	orderItems?: TableOrderOfficeOrderItemDTO[] | null;
	table: TableOrderOfficeTableDTO;
	tableId: number;
	user: DTOUserDTO;
}

export interface TableOrderFrontOfficeResponse {
	lastRefresh: string;
	pendingItems: number;
	pendingTables: number;
	tables?: TableOrderOfficeTableBookingDTO[] | null;
}

export interface TableOrderRemoveItemRequest {
	orderItemId: number;
}

export interface TableOrderRemoveItemResponse {
	isSuccess: boolean;
}

export interface TableOrderSendToKitchenRequest {
	tableBookingId: number;
}

export interface TableOrderSendToKitchenResponse {
	isSuccess: boolean;
}

export interface TableOrderUpdateOrderItemRequest {
	orderItemId: number;
	orderItemStatusId: number;
}

export interface TableOrderUpdateOrderItemResponse {
	isSuccess: boolean;
}

export interface TableOrderUpdateTableOrderRequest {
	orderItemStatusId: number;
	tableBookingId: number;
}

export interface TableOrderUpdateTableOrderResponse {
	isSuccess: boolean;
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

export interface UserGetNotificationsUserNotificationDTO {
	dateExpires?: string | null;
	dateRead?: string | null;
	dateSent: string;
	dateSentFormatted: string;
	id: number;
	jsonContent?: string | null;
	notification: string;
	userId: string;
}

export interface UserGetRolesRequest {
	[key: string]: any;
}

export interface EntitiesOrderItemStatus {
	isBackOffice: boolean;
	isBillable: boolean;
	isCancelled: boolean;
	isComplete: boolean;
	isFrontLine: boolean;
	notify: boolean;
	orderItemStatusId: number;
	status: string;
}

export interface EntitiesMenuItemExtraGroup {
	extraGroup: EntitiesExtraGroup;
	extraGroupId: number;
	menuItem: EntitiesMenuItem;
	menuItemId: number;
}

export interface EntitiesExtraGroup {
	extraGroupId: number;
	extras: EntitiesExtra[];
	menuItemExtraGroups?: EntitiesMenuItemExtraGroup[] | null;
	name: string;
}

export interface EntitiesExtra {
	extraGroup: EntitiesExtraGroup;
	extraGroupId: number;
	extraId: number;
	name: string;
	orderItemExtras?: EntitiesOrderItemExtra[] | null;
	positionId: number;
	price: number;
}

export interface EntitiesOrderItemExtra {
	extra: EntitiesExtra;
	extraId: number;
	orderItem: EntitiesOrderItem;
	orderItemExtraId: number;
	orderItemId: number;
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
	orderItemOptions?: EntitiesOrderItemOption[] | null;
	positionId: number;
	price: number;
}

export interface EntitiesOrderItemOption {
	option: EntitiesOption;
	optionId: number;
	orderItem: EntitiesOrderItem;
	orderItemId: number;
	orderItemOptionId: number;
}

export interface EntitiesDivision {
	divisionId: number;
	divisionName: string;
}

export interface EntitiesTag {
	name: string;
	tagId: number;
}

export interface NpgsqlTypesNpgsqlTsVectorLexeme {
	count: number;
	text: string;
}

export interface EntitiesMenu {
	id: number;
	menuSections?: EntitiesMenuSection[] | null;
	name: string;
	outlet: EntitiesOutlet;
	outletId: number;
}

export type EntitiesMenuSectionParent = EntitiesMenuSection | null;

export type EntitiesMenuItemDivision = EntitiesDivision | null;

export interface EntitiesMenuItem {
	description: string;
	division?: EntitiesMenuItemDivision;
	divisionId?: number | null;
	isAvailable: boolean;
	menuItemExtraGroups?: EntitiesMenuItemExtraGroup[] | null;
	menuItemId: number;
	menuItemOptionGroups?: EntitiesMenuItemOptionGroup[] | null;
	menuSection: EntitiesMenuSection;
	menuSectionId: number;
	name: string;
	position: number;
	price: number;
	searchVector: NpgsqlTypesNpgsqlTsVectorLexeme[];
	stockPrice: number;
	tags?: EntitiesTag[] | null;
}

export interface EntitiesMenuItemOptionGroup {
	menuItem: EntitiesMenuItem;
	menuItemId: number;
	optionGroup: EntitiesOptionGroup;
	optionGroupId: number;
}

export interface EntitiesMenuSection {
	menu: EntitiesMenu;
	menuId: number;
	menuItems?: EntitiesMenuItem[] | null;
	menuSectionId: number;
	name?: string | null;
	parent?: EntitiesMenuSectionParent;
	parentId?: number | null;
	positionId?: number | null;
	subMenuSections?: EntitiesMenuSection[] | null;
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
	isBackOffice: boolean;
	isFrontLine: boolean;
	name: string;
	outletId?: number | null;
	roleId: number;
	userRole?: EntitiesUserRole[] | null;
}

export interface EntitiesOrderItem {
	menuItem: EntitiesMenuItem;
	menuItemId: number;
	note?: string | null;
	orderCompleted?: string | null;
	orderItemExtras?: EntitiesOrderItemExtra[] | null;
	orderItemId: number;
	orderItemOptions?: EntitiesOrderItemOption[] | null;
	orderItemStatus: EntitiesOrderItemStatus;
	orderItemStatusId: number;
	orderReceived: string;
	orderUpdated: string;
	tableBooking: EntitiesTableBooking;
	tableBookingId: number;
}

export interface EntitiesTableBooking {
	bookingDate: string;
	bookingName: string;
	closeDate?: string | null;
	id: number;
	orderItems?: EntitiesOrderItem[] | null;
	salesPeriod: EntitiesSalesPeriod;
	salesPeriodId: number;
	table: EntitiesTable;
	tableId: number;
	user: EntitiesUser;
	userId: string;
}

export interface EntitiesOrder {
	orderId: number;
	orderItem: EntitiesOrderItem;
	orderItemId: number;
}

export interface EntitiesCustomer {
	customerId: number;
	name: string;
	orders: EntitiesOrder[];
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

export type UserGetStatusResponseSalesPeriod = EntitiesSalesPeriod | null;

export interface UserGetStatusResponse {
	clockedIn: boolean;
	outletId: number;
	roles: string[];
	salesPeriod?: UserGetStatusResponseSalesPeriod;
	salesPeriodId: number;
}

export interface UserValidateRequest {
	email: string;
	image?: string | null;
	name: string;
	userId: string;
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
