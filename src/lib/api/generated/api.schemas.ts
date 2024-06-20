// @ts-nocheck
/**
 * Generated by orval v6.30.2 🍺
 * Do not edit manually.
 * Kayord.Pos
 * OpenAPI spec version: v1
 */
export type CashUpUserGetParams = {
	outletId: number;
};

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

export type TableOrderOfficeOrderBasedBackParams = {
	divisionIds?: string | null;
	complete: boolean;
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

export interface AdjustmentCreateRequest {
	adjustmentTypeId: number;
	amount: number;
	/** @nullable */
	note?: string | null;
	tableBookingId: number;
}

export interface AdjustmentGetAllRequest {
	[key: string]: any;
}

export interface BusinessCreateRequest {
	/**
	 * @minLength 1
	 */
	name: string;
}

export interface BusinessDeleteRequest {
	/**
	 * @minLength 1
	 */
	id: number;
}

export interface BusinessEditRequest {
	/**
	 * @minLength 1
	 */
	id: number;
	/**
	 * @minLength 1
	 */
	name: string;
}

export interface BusinessGetRequest {
	[key: string]: any;
}

export interface CashUpUserDetailRequest {
	[key: string]: any;
}

export interface CashUpUserDetailResponseItem {
	cashUpUserItemType: EntitiesCashUpUserItemType;
	value: number;
}

export interface CashUpUserDetailResponse {
	responseItems: CashUpUserDetailResponseItem[];
	user: EntitiesUser;
	userId: string;
}

export interface CashUpUserGetRequest {
	[key: string]: any;
}

export interface CashUpUserGetResponse {
	sales: number;
	user: EntitiesUser;
	userId: string;
}

export interface ClockClockInRequest {
	outletId: number;
}

export interface ClockClockOutRequest {
	outletId: number;
}

export interface EntitiesClock {
	/** @nullable */
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
	/** @nullable */
	divisionId?: number | null;
	menuItemId: number;
	name: string;
	position: number;
	price: number;
}

export interface ManagerOrderViewOrderItemDTO {
	divisionId: number;
	menuItem: ManagerOrderViewMenuItemDTO;
	/** @nullable */
	note?: string | null;
	/** @nullable */
	orderItemExtras?: DTOOrderItemExtraDTO[] | null;
	orderItemId: number;
	/** @nullable */
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
	/** @nullable */
	closeDate?: string | null;
	id: number;
	/** @nullable */
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
	/** @nullable */
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
	/** @nullable */
	tags?: EntitiesTag[] | null;
}

export interface MenuGetItemsRequest {
	[key: string]: any;
}

export interface DTOMenuSectionBasicDTO {
	menuSectionId: number;
	/** @nullable */
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
	/** @nullable */
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
	/** @nullable */
	name?: string | null;
	/** @nullable */
	parentId?: number | null;
}

/**
 * @nullable
 */
export type DTOMenuSectionDTOParent = DTOMenuSectionParentDTO | null;

export interface DTOMenuSectionDTO {
	menuId: number;
	menuSectionId: number;
	/** @nullable */
	name?: string | null;
	/** @nullable */
	parent?: DTOMenuSectionDTOParent;
	/** @nullable */
	parentId?: number | null;
}

export interface MenuGetSectionsResponse {
	/** @nullable */
	parents?: DTOMenuSectionDTO[] | null;
	/** @nullable */
	sections?: DTOMenuSectionDTO[] | null;
}

export interface MenuUpdateRequest {
	/**
	 * @minimum 0
	 * @exclusiveMinimum
	 */
	id: number;
	/**
	 * @minLength 1
	 */
	name: string;
}

export interface NotificationAddUserRequest {
	token: string;
}

export interface NotificationTestRequest {
	message: string;
}

export interface NotificationTestNewRequest {
	body: string;
	title: string;
	userId: string;
}

export interface NotificationUserRequest {
	message: string;
	userId: string;
}

export interface OutletCreateRequest {
	businessId: number;
	/**
	 * @minLength 1
	 */
	name: string;
}

export interface OutletGetRequest {
	[key: string]: any;
}

export interface OutletGetPaymentTypeRequest {
	[key: string]: any;
}

export interface OutletUpdateRequest {
	businessId: number;
	/**
	 * @minLength 1
	 */
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

/**
 * @nullable
 */
export type CommonWrapperResultOfResponseAllOfValue = PayGetLinkResponse | null;

export type CommonWrapperResultOfResponseAllOf = {
	/** @nullable */
	value?: CommonWrapperResultOfResponseAllOfValue;
};

export type CommonWrapperResultOfResponse = CommonWrapperResult &
	CommonWrapperResultOfResponseAllOf;

export interface PayManualPaymentRequest {
	amount: number;
	paymentTypeId: number;
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

/**
 * @nullable
 */
export type CommonWrapperResultOfStatusResultDtoAllOfValue = PayDtoStatusResultDto | null;

export type CommonWrapperResultOfStatusResultDtoAllOf = {
	/** @nullable */
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
	/** @nullable */
	note?: string | null;
	/** @nullable */
	orderItemExtras?: DTOOrderItemExtraDTO[] | null;
	orderItemId: number;
	/** @nullable */
	orderItemOptions?: DTOOrderItemOptionDTO[] | null;
	tableBooking: DTOTableBookingDTO;
	tableBookingId: number;
	userId: string;
}

/**
 * @nullable
 */
export type SalesPeriodCashUpTableCashUpUser = DTOUserDTO | null;

export interface SalesPeriodCashUpTableCashUp {
	balance: number;
	orderItems: SalesPeriodCashUpBillOrderItemDTO[];
	paymentsReceived: EntitiesPayment[];
	tablePaymentTotal: number;
	total: number;
	/** @nullable */
	user?: SalesPeriodCashUpTableCashUpUser;
	/** @nullable */
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

export type SalesPeriodCashUpCashUp = EntitiesCashUp & SalesPeriodCashUpCashUpAllOf;

export interface SalesPeriodCloseRequest {
	salesPeriodId: number;
}

export interface SalesPeriodCreateRequest {
	/**
	 * @minLength 1
	 */
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
	/** @nullable */
	signOffDate?: string | null;
	signOffUserId: string;
	tableCount: number;
	userId: string;
}

export interface SalesPeriodGetRequest {
	[key: string]: any;
}

export interface SectionCreateRequest {
	/**
	 * @minLength 1
	 */
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
	/**
	 * @minimum 0
	 * @exclusiveMinimum
	 */
	id: number;
	/**
	 * @minLength 1
	 */
	name: string;
}

export interface TableCreateRequest {
	capacity: number;
	/**
	 * @minLength 1
	 */
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
	/**
	 * @minLength 1
	 */
	name: string;
	sectionId: number;
}

export interface TableBookingCloseRequest {
	tableBookingId: number;
}

export interface TableBookingCreateRequest {
	/**
	 * @minLength 1
	 */
	bookingName: string;
	/**
	 * @minimum 0
	 * @exclusiveMinimum
	 */
	salesPeriodId: number;
	/**
	 * @minimum 0
	 * @exclusiveMinimum
	 */
	tableId: number;
}

export interface TableBookingEmailBillRequest {
	email: string;
	name: string;
	tableBookingId: number;
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

export interface TableBookingHistorySalesPeriodRequest {
	[key: string]: any;
}

export interface ManagerOrderViewSectionDTO {
	name: string;
}

/**
 * @nullable
 */
export type ManagerOrderViewTableDTOSection = ManagerOrderViewSectionDTO | null;

export interface ManagerOrderViewTableDTO {
	name: string;
	outletId: number;
	/** @nullable */
	section?: ManagerOrderViewTableDTOSection;
	tableId: number;
}

export interface TableBookingGetResponse {
	bookingDate: string;
	bookingName: string;
	/** @nullable */
	closeDate?: string | null;
	id: number;
	salesPeriodId: number;
	table: ManagerOrderViewTableDTO;
	tableId: number;
	user: DTOUserDTO;
	userId: string;
}

export interface TableBookingHistoryResponse {
	bookingDate: string;
	bookingName: string;
	/** @nullable */
	closeDate?: string | null;
	id: number;
	salesPeriodId: number;
	table: ManagerOrderViewTableDTO;
	tableId: number;
	total: number;
}

export interface OrderAddItemsOrder {
	/** @nullable */
	extraIds?: number[] | null;
	menuItemId: number;
	note: string;
	/** @nullable */
	optionIds?: number[] | null;
	quantity: number;
}

export interface OrderAddItemsRequest {
	orders: OrderAddItemsOrder[];
	tableBookingId: number;
}

export interface OrderClearBasketRequest {
	tableBookingId: number;
}

export interface TableOrderCopyItemRequest {
	orderItemId: number;
}

export interface TableOrderCopyItemResponse {
	isSuccess: boolean;
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
	/** @nullable */
	note?: string | null;
	/** @nullable */
	orderItemExtras?: DTOOrderItemExtraDTO[] | null;
	orderItemId: number;
	/** @nullable */
	orderItemOptions?: DTOOrderItemOptionDTO[] | null;
	quantity: number;
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

export interface EntitiesCashUpConfig {
	id: number;
	/** @nullable */
	name?: string | null;
	outletId: number;
	value: number;
}

/**
 * @nullable
 */
export type EntitiesCashUpUserItemTypePaymentType = EntitiesPaymentType | null;

/**
 * @nullable
 */
export type EntitiesCashUpUserItemTypeCashupConfig = EntitiesCashUpConfig | null;

export interface EntitiesCashUpUserItemType {
	/** @nullable */
	cashupConfig?: EntitiesCashUpUserItemTypeCashupConfig;
	/** @nullable */
	cashupConfigId?: number | null;
	id: number;
	isAuto: boolean;
	itemType: string;
	/** @nullable */
	paymentType?: EntitiesCashUpUserItemTypePaymentType;
	/** @nullable */
	paymentTypeId?: number | null;
}

export interface EntitiesCashUpUser {
	cashUpUserItems: EntitiesCashUpUserItem[];
	closingBalance: number;
	id: number;
	openingBalance: number;
	outletId: number;
	userId: string;
}

export interface EntitiesCashUpUserItem {
	cashUpItemTypeId: number;
	cashUpItemTypes: EntitiesCashUpUserItemType;
	cashUpUser: EntitiesCashUpUser;
	closingBalance: number;
	id: number;
	openingBalance: number;
	outletId: number;
	userCashUpId: number;
	userId: string;
}

export interface EntitiesAdjustmentType {
	adjustmentTypeId: number;
	/** @nullable */
	description?: string | null;
	name: string;
}

export interface EntitiesAdjustment {
	adjustmentId: number;
	adjustmentType: EntitiesAdjustmentType;
	adjustmentTypeId: number;
	amount: number;
	created: string;
	/** @nullable */
	note?: string | null;
	userId: string;
}

export interface EntitiesOrderItemStatus {
	assignGroup: boolean;
	isBackOffice: boolean;
	isBillable: boolean;
	isCancelled: boolean;
	isComplete: boolean;
	isFrontLine: boolean;
	isHistory: boolean;
	notify: boolean;
	orderItemStatusId: number;
	priority: number;
	status: string;
}

export interface EntitiesOrderItemExtra {
	extra: EntitiesExtra;
	extraId: number;
	orderItem: EntitiesOrderItem;
	orderItemExtraId: number;
	orderItemId: number;
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
	/** @nullable */
	menuItemExtraGroups?: EntitiesMenuItemExtraGroup[] | null;
	name: string;
}

export interface EntitiesExtra {
	extraGroup: EntitiesExtraGroup;
	extraGroupId: number;
	extraId: number;
	name: string;
	/** @nullable */
	orderItemExtras?: EntitiesOrderItemExtra[] | null;
	positionId: number;
	price: number;
}

export interface EntitiesMenuItemOptionGroup {
	menuItem: EntitiesMenuItem;
	menuItemId: number;
	optionGroup: EntitiesOptionGroup;
	optionGroupId: number;
}

export interface EntitiesOptionGroup {
	maxSelections: number;
	/** @nullable */
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
	/** @nullable */
	orderItemOptions?: EntitiesOrderItemOption[] | null;
	positionId: number;
	price: number;
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
	/** @nullable */
	menuSections?: EntitiesMenuSection[] | null;
	name: string;
	outlet: EntitiesOutlet;
	outletId: number;
	position: number;
}

/**
 * @nullable
 */
export type EntitiesMenuSectionParent = EntitiesMenuSection | null;

/**
 * @nullable
 */
export type EntitiesMenuItemDivision = EntitiesDivision | null;

export interface EntitiesMenuItem {
	description: string;
	/** @nullable */
	division?: EntitiesMenuItemDivision;
	/** @nullable */
	divisionId?: number | null;
	isAvailable: boolean;
	/** @nullable */
	menuItemExtraGroups?: EntitiesMenuItemExtraGroup[] | null;
	menuItemId: number;
	/** @nullable */
	menuItemOptionGroups?: EntitiesMenuItemOptionGroup[] | null;
	menuSection: EntitiesMenuSection;
	menuSectionId: number;
	name: string;
	position: number;
	price: number;
	searchVector: NpgsqlTypesNpgsqlTsVectorLexeme[];
	stockPrice: number;
	/** @nullable */
	tags?: EntitiesTag[] | null;
}

export interface EntitiesMenuSection {
	menu: EntitiesMenu;
	menuId: number;
	/** @nullable */
	menuItems?: EntitiesMenuItem[] | null;
	menuSectionId: number;
	/** @nullable */
	name?: string | null;
	/** @nullable */
	parent?: EntitiesMenuSectionParent;
	/** @nullable */
	parentId?: number | null;
	/** @nullable */
	positionId?: number | null;
	/** @nullable */
	subMenuSections?: EntitiesMenuSection[] | null;
}

/**
 * @nullable
 */
export type EntitiesOrderItemOrderGroup = EntitiesOrderGroup | null;

export interface EntitiesOrderItem {
	menuItem: EntitiesMenuItem;
	menuItemId: number;
	/** @nullable */
	note?: string | null;
	/** @nullable */
	orderCompleted?: string | null;
	/** @nullable */
	orderGroup?: EntitiesOrderItemOrderGroup;
	/** @nullable */
	orderGroupId?: number | null;
	/** @nullable */
	orderItemExtras?: EntitiesOrderItemExtra[] | null;
	orderItemId: number;
	/** @nullable */
	orderItemOptions?: EntitiesOrderItemOption[] | null;
	orderItemStatus: EntitiesOrderItemStatus;
	orderItemStatusId: number;
	orderReceived: string;
	orderUpdated: string;
	tableBooking: EntitiesTableBooking;
	tableBookingId: number;
}

export interface EntitiesOrderItemOption {
	option: EntitiesOption;
	optionId: number;
	orderItem: EntitiesOrderItem;
	orderItemId: number;
	orderItemOptionId: number;
}

export interface EntitiesOrderGroup {
	orderGroupId: number;
	/** @nullable */
	orderItems?: EntitiesOrderItem[] | null;
}

/**
 * @nullable
 */
export type EntitiesUserRoleRole = EntitiesRole | null;

export interface EntitiesUser {
	email: string;
	image: string;
	isActive: boolean;
	name: string;
	userId: string;
	/** @nullable */
	userRole?: EntitiesUserRole[] | null;
}

export interface EntitiesUserRole {
	/** @nullable */
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
	/** @nullable */
	outletId?: number | null;
	roleId: number;
	/** @nullable */
	userRole?: EntitiesUserRole[] | null;
}

/**
 * @nullable
 */
export type EntitiesTableBookingCashUpUser = EntitiesCashUpUser | null;

export interface EntitiesPayment {
	amount: number;
	dateReceived: string;
	id: number;
	paymentReference: string;
	paymentType: EntitiesPaymentType;
	/** @nullable */
	paymentTypeId?: number | null;
	tableBooking: EntitiesTableBooking;
	tableBookingId: number;
	userId: string;
}

export interface EntitiesTableBooking {
	/** @nullable */
	adjustments?: EntitiesAdjustment[] | null;
	bookingDate: string;
	bookingName: string;
	/** @nullable */
	cashUpUser?: EntitiesTableBookingCashUpUser;
	/** @nullable */
	cashUpUserId?: number | null;
	/** @nullable */
	closeDate?: string | null;
	id: number;
	/** @nullable */
	orderItems?: EntitiesOrderItem[] | null;
	/** @nullable */
	payments?: EntitiesPayment[] | null;
	salesPeriod: EntitiesSalesPeriod;
	salesPeriodId: number;
	table: EntitiesTable;
	tableId: number;
	/** @nullable */
	total?: number | null;
	user: EntitiesUser;
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
	/** @nullable */
	closeDate?: string | null;
	id: number;
	tableId: number;
	user: DTOUserDTO;
	userId: string;
}

export interface TableOrderGetBillBillOrderItemDTO {
	menuItem: TableOrderGetBillBillMenuItemDTO;
	menuItemId: number;
	/** @nullable */
	note?: string | null;
	/** @nullable */
	orderItemExtras?: DTOOrderItemExtraDTO[] | null;
	orderItemId: number;
	/** @nullable */
	orderItemOptions?: DTOOrderItemOptionDTO[] | null;
	tableBooking: DTOTableBookingDTO;
	tableBookingId: number;
}

export interface TableOrderGetBillResponse {
	/** @nullable */
	adjustments?: EntitiesAdjustment[] | null;
	balance: number;
	billDate: string;
	orderItems: TableOrderGetBillBillOrderItemDTO[];
	paymentsReceived: EntitiesPayment[];
	tipAmount: number;
	total: number;
	totalExVAT: number;
	vat: number;
}

export interface TableOrderOfficeOrderBasedBackRequest {
	[key: string]: any;
}

export interface TableOrderOfficeOrderBasedBackOrderItemStatusDTO {
	orderItemStatusId: number;
	priority: number;
	status: string;
}

export interface TableOrderOfficeOrderBasedBackMenuItemDTO {
	description: string;
	divisionId: number;
	menuItemId: number;
	name: string;
	position: number;
	price: number;
}

/**
 * @nullable
 */
export type TableOrderOfficeOrderBasedBackOrderItemDTOTableBooking =
	TableOrderOfficeOrderBasedBackTableBookingDTO | null;

export interface TableOrderOfficeOrderBasedBackOrderItemDTO {
	divisionId: number;
	menuItem: TableOrderOfficeOrderBasedBackMenuItemDTO;
	/** @nullable */
	note?: string | null;
	/** @nullable */
	orderGroupId?: number | null;
	/** @nullable */
	orderItemExtras?: DTOOrderItemExtraDTO[] | null;
	orderItemId: number;
	/** @nullable */
	orderItemOptions?: DTOOrderItemOptionDTO[] | null;
	orderItemStatus: TableOrderOfficeOrderBasedBackOrderItemStatusDTO;
	orderItemStatusId: number;
	orderReceived: string;
	orderReceivedFormatted: string;
	orderUpdated: string;
	orderUpdatedFormatted: string;
	/** @nullable */
	tableBooking?: TableOrderOfficeOrderBasedBackOrderItemDTOTableBooking;
	tableBookingId: number;
}

export interface TableOrderOfficeOrderBasedBackSectionDTO {
	name: string;
}

/**
 * @nullable
 */
export type TableOrderOfficeOrderBasedBackTableDTOSection =
	TableOrderOfficeOrderBasedBackSectionDTO | null;

export interface TableOrderOfficeOrderBasedBackTableDTO {
	name: string;
	outletId: number;
	/** @nullable */
	section?: TableOrderOfficeOrderBasedBackTableDTOSection;
	tableId: number;
}

/**
 * @nullable
 */
export type TableOrderOfficeOrderBasedBackOrderGroupDTOTableBooking =
	TableOrderOfficeOrderBasedBackTableBookingDTO | null;

export interface TableOrderOfficeOrderBasedBackOrderGroupDTO {
	lastDate: string;
	orderGroupId: number;
	/** @nullable */
	orderItems?: TableOrderOfficeOrderBasedBackOrderItemDTO[] | null;
	priority: number;
	/** @nullable */
	tableBooking?: TableOrderOfficeOrderBasedBackOrderGroupDTOTableBooking;
	tableBookingId: number;
}

export interface TableOrderOfficeOrderBasedBackResponse {
	lastRefresh: string;
	/** @nullable */
	orderGroups?: TableOrderOfficeOrderBasedBackOrderGroupDTO[] | null;
	pendingItems: number;
	pendingOrders: number;
}

export interface TableOrderBackOfficeRequest {
	[key: string]: any;
}

export interface TableOrderBackOfficeResponse {
	lastRefresh: string;
	pendingItems: number;
	pendingTables: number;
	/** @nullable */
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

export interface TableOrderOfficeOrderBasedBackTableBookingDTO {
	bookingDate: string;
	bookingName: string;
	/** @nullable */
	closeDate?: string | null;
	id: number;
	table: TableOrderOfficeOrderBasedBackTableDTO;
	tableId: number;
	user: DTOUserDTO;
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
	/** @nullable */
	note?: string | null;
	/** @nullable */
	orderItemExtras?: DTOOrderItemExtraDTO[] | null;
	orderItemId: number;
	/** @nullable */
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

/**
 * @nullable
 */
export type TableOrderOfficeTableDTOSection = TableOrderOfficeSectionDTO | null;

export interface TableOrderOfficeTableDTO {
	name: string;
	outletId: number;
	/** @nullable */
	section?: TableOrderOfficeTableDTOSection;
	tableId: number;
}

export interface TableOrderOfficeTableBookingDTO {
	bookingDate: string;
	bookingName: string;
	/** @nullable */
	closeDate?: string | null;
	id: number;
	/** @nullable */
	orderItems?: TableOrderOfficeOrderItemDTO[] | null;
	table: TableOrderOfficeTableDTO;
	tableId: number;
	user: DTOUserDTO;
}

export interface TableOrderFrontOfficeResponse {
	lastRefresh: string;
	pendingItems: number;
	pendingTables: number;
	/** @nullable */
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

export interface TableOrderUpdateGroupOrderRequest {
	orderGroupId: number;
	orderItemStatusId: number;
}

export interface TableOrderUpdateGroupOrderResponse {
	isSuccess: boolean;
}

export interface TableOrderUpdateOrderItemRequest {
	orderItemIds: number[];
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

export interface UserGetRolesRequest {
	[key: string]: any;
}

export interface EntitiesOutletPaymentType {
	outlet: EntitiesOutlet;
	outletId: number;
	paymentType: EntitiesPaymentType;
	paymentTypeId: number;
	position: number;
}

export interface EntitiesPaymentType {
	discountPercentage: number;
	/** @nullable */
	outletPaymentTypes?: EntitiesOutletPaymentType[] | null;
	paymentTypeId: number;
	paymentTypeName: string;
	tipLevyPercentage: number;
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
	/** @nullable */
	logo?: string | null;
	name: string;
	/** @nullable */
	outletPaymentTypes?: EntitiesOutletPaymentType[] | null;
	/** @nullable */
	sections?: EntitiesSection[] | null;
	vatNumber: string;
}

export interface EntitiesSection {
	id: number;
	name: string;
	outlet: EntitiesOutlet;
	outletId: number;
	/** @nullable */
	tables?: EntitiesTable[] | null;
}

export interface EntitiesTable {
	capacity: number;
	customers: EntitiesCustomer[];
	name: string;
	position: number;
	section: EntitiesSection;
	sectionId: number;
	tableId: number;
}

export interface EntitiesBusiness {
	id: number;
	name: string;
	/** @nullable */
	outlets?: EntitiesOutlet[] | null;
}

export interface EntitiesSalesPeriod {
	/** @nullable */
	endDate?: string | null;
	id: number;
	/** @nullable */
	name?: string | null;
	outlet: EntitiesOutlet;
	outletId: number;
	/** @nullable */
	startDate?: string | null;
}

/**
 * @nullable
 */
export type UserGetStatusResponseSalesPeriod = EntitiesSalesPeriod | null;

export interface UserGetStatusResponse {
	clockedIn: boolean;
	outletId: number;
	roles: string[];
	/** @nullable */
	salesPeriod?: UserGetStatusResponseSalesPeriod;
	salesPeriodId: number;
}

export interface UserValidateRequest {
	email: string;
	/** @nullable */
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
	/** @nullable */
	userRoles?: string[] | null;
}
