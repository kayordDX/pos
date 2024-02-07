/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/user/validate": {
    post: operations["UserValidate"];
  };
  "/user/getStatus": {
    get: operations["UserGetStatus"];
  };
  "/user/getRoles": {
    get: operations["UserGetRoles"];
  };
  "/user/assignOutlet": {
    post: operations["UserAssignOutlet"];
  };
  "/role/createRole": {
    post: operations["RoleCreate"];
  };
  "/role/addUserInRole": {
    post: operations["RoleAddUserInRole"];
  };
  "/order": {
    post: operations["TableOrderCreate"];
  };
  "/order/table/{tableId}": {
    get: operations["OrderViewOrders"];
  };
  "/order/{orderId}/addItem": {
    post: operations["OrderAddItem"];
  };
  "/tableCashUp/tableBooking/{tableBookingId}": {
    get: operations["TableCashUpViewTableCashUps"];
  };
  "/tableCashUp": {
    post: operations["TableCashUpCreate"];
  };
  "/tableBooking": {
    post: operations["TableBookingCreate"];
  };
  "/table/{tableId}": {
    put: operations["TableUpdate"];
  };
  "/table/booked": {
    get: operations["TableGetMyBooked"];
  };
  "/table/available": {
    get: operations["TableGetAvailable"];
  };
  "/table": {
    post: operations["TableCreate"];
  };
  "/section/{sectionId}": {
    get: operations["SectionGet"];
    put: operations["SectionUpdate"];
  };
  "/section": {
    get: operations["SectionList"];
    post: operations["SectionCreate"];
  };
  "/salesPeriod/{outletId}": {
    get: operations["SalesPeriodGet"];
  };
  "/salesPeriod": {
    post: operations["SalesPeriodCreate"];
  };
  "/salesPeriod/close": {
    post: operations["SalesPeriodClose"];
  };
  "/outlet/{id}": {
    get: operations["OutletGet"];
    put: operations["OutletUpdate"];
  };
  "/outlet": {
    get: operations["OutletList"];
    post: operations["OutletCreate"];
  };
  "/menu/{menuId}": {
    get: operations["MenuGet"];
    put: operations["MenuUpdate"];
  };
  "/menu/sections": {
    get: operations["MenuGetSectionsGetOutletMenus"];
  };
  "/menu/outletMenus": {
    get: operations["MenuGetOutletMenuGetOutletMenus"];
  };
  "/menu": {
    get: operations["MenuList"];
    post: operations["MenuCreate"];
  };
  "/clock/list": {
    get: operations["ClockList"];
  };
  "/clock/out": {
    post: operations["ClockClockOut"];
  };
  "/clock/in": {
    post: operations["ClockClockIn"];
  };
  "/business": {
    get: operations["BusinessGetAll"];
    put: operations["BusinessEdit"];
    post: operations["BusinessCreate"];
    delete: operations["BusinessDelete"];
  };
  "/business/{id}": {
    get: operations["BusinessGet"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    Response: {
      userId: string;
      userRoles?: string[] | null;
    };
    InternalErrorResponse: {
      /** @default Internal Server Error! */
      status: string;
      /**
       * Format: int32
       * @default 500
       */
      code: number;
      /** @default Something unexpected has happened */
      reason: string;
      /** @default See application log for stack trace. */
      note: string;
    };
    Request: {
      userId?: string | null;
      email?: string | null;
      image?: string | null;
      firstName?: string | null;
      lastName?: string | null;
      name?: string | null;
    };
    Response2: {
      /** Format: int32 */
      outletId: number;
      clockedIn: boolean;
      /** Format: int32 */
      salesPeriodId: number;
      salesPeriod: components["schemas"]["SalesPeriod"];
    };
    SalesPeriod: {
      /** Format: int32 */
      id: number;
      name?: string | null;
      /** Format: date-time */
      startDate?: string | null;
      /** Format: date-time */
      endDate?: string | null;
      outlet: components["schemas"]["Outlet"];
      /** Format: int32 */
      outletId: number;
    };
    Outlet: {
      /** Format: int32 */
      id: number;
      name: string;
      /** Format: int32 */
      businessId: number;
      business: components["schemas"]["Business"];
      sections?: components["schemas"]["Section"][] | null;
    };
    Business: {
      /** Format: int32 */
      id: number;
      name: string;
      outlets?: components["schemas"]["Outlet"][] | null;
    };
    Section: {
      /** Format: int32 */
      id: number;
      name: string;
      /** Format: int32 */
      outletId: number;
      outlet: components["schemas"]["Outlet"];
      tables?: components["schemas"]["Table"][] | null;
    };
    Table: {
      /** Format: int32 */
      tableId: number;
      name: string;
      /** Format: int32 */
      capacity: number;
      /** Format: int32 */
      sectionId: number;
      section: components["schemas"]["Section"];
      customers: components["schemas"]["Customer"][];
    };
    Customer: {
      /** Format: int32 */
      customerId: number;
      name: string;
      orders: components["schemas"]["Order"][];
    };
    /** @enum {integer} */
    Order: 0 | 1;
    Request2: Record<string, never>;
    UserOutlet: {
      /** Format: int32 */
      id: number;
      /** Format: int32 */
      outletId: number;
      userId: string;
      isCurrent: boolean;
    };
    Request3: {
      /** Format: int32 */
      outletId: number;
    };
    Request4: {
      name: string;
      description: string;
    };
    Request5: {
      userId: string;
      /** Format: int32 */
      roleId: number;
    };
    TableOrder: {
      /** Format: int32 */
      tableOrderId: number;
      /** Format: date-time */
      orderDate: string;
      /** Format: int32 */
      customerId: number;
      customer: components["schemas"]["Customer"];
      /** Format: int32 */
      tableBookingId: number;
    };
    ErrorResponse: {
      /**
       * Format: int32
       * @default 400
       */
      statusCode: number;
      /** @default One or more errors occurred! */
      message: string;
      errors: {
        [key: string]: string[];
      };
    };
    Request6: {
      /** Format: int32 */
      tableBookingId: number;
    };
    Request7: Record<string, never>;
    OrderItem: {
      /** Format: int32 */
      orderItemId: number;
      /** Format: int32 */
      menuItemId: number;
      /** Format: int32 */
      quantity: number;
      /** Format: int32 */
      orderId: number;
      order: components["schemas"]["Order"];
      menuItem: components["schemas"]["MenuItem"];
    };
    MenuItem: {
      /** Format: int32 */
      menuItemId: number;
      menuSection: components["schemas"]["MenuSection"];
      /** Format: int32 */
      menuSectionId: number;
      name: string;
      description: string;
      /** Format: decimal */
      price: number;
      searchVector: components["schemas"]["NpgsqlTsVector_Lexeme"][];
      /** Format: int32 */
      position: number;
      options?: components["schemas"]["Option"][] | null;
      tags?: components["schemas"]["Tag"][] | null;
      extras?: components["schemas"]["Extra"][] | null;
      division: components["schemas"]["Division"];
    };
    MenuSection: {
      /** Format: int32 */
      menuSectionId: number;
      name?: string | null;
      menu: components["schemas"]["Menu"];
      /** Format: int32 */
      menuId: number;
      parent?: components["schemas"]["MenuSection"] | null;
      /** Format: int32 */
      parentId?: number | null;
      subMenuSections?: components["schemas"]["MenuSection"][] | null;
      menuItems?: components["schemas"]["MenuItem"][] | null;
    };
    Menu: {
      /** Format: int32 */
      id: number;
      name: string;
      /** Format: int32 */
      outletId: number;
      outlet: components["schemas"]["Outlet"];
      menuSections?: components["schemas"]["MenuSection"][] | null;
    };
    NpgsqlTsVector_Lexeme: {
      text: string;
      /** Format: int32 */
      count: number;
    };
    Option: {
      /** Format: int32 */
      optionId: number;
      name?: string | null;
    };
    Tag: {
      /** Format: int32 */
      tagId: number;
      name: string;
    };
    Extra: {
      /** Format: int32 */
      extraId: number;
      name: string;
    };
    /** @enum {integer} */
    Division: 0 | 1 | 2;
    Request8: {
      /** Format: int32 */
      menuItemId: number;
    };
    TableCashUp: {
      /** Format: int32 */
      id: number;
      /** Format: int32 */
      tableBookingId: number;
      tableBooking: components["schemas"]["TableBooking"];
      /** Format: decimal */
      salesAmount: number;
      /** Format: decimal */
      totalAmount: number;
      /** Format: date-time */
      cashUpDate: string;
      /** Format: int32 */
      outletId: number;
      outlet: components["schemas"]["Outlet"];
    };
    TableBooking: {
      /** Format: int32 */
      id: number;
      /** Format: int32 */
      tableId: number;
      table: components["schemas"]["Table"];
      bookingName: string;
      /** Format: date-time */
      bookingDate: string;
      /** Format: int32 */
      salesPeriodId: number;
      salesPeriod: components["schemas"]["SalesPeriod"];
      userId: string;
      user: components["schemas"]["User"];
    };
    User: {
      userId: string;
      email: string;
      image: string;
      name: string;
      isActive: boolean;
      userRole?: components["schemas"]["UserRole"][] | null;
    };
    UserRole: {
      /** Format: int32 */
      userRoleId: number;
      userId: string;
      /** Format: int32 */
      roleId: number;
      user: components["schemas"]["User"];
      role?: components["schemas"]["Role"] | null;
    };
    Role: {
      /** Format: int32 */
      roleId: number;
      name: string;
      description: string;
      userRole?: components["schemas"]["UserRole"][] | null;
    };
    Request9: Record<string, never>;
    Request10: {
      /** Format: int32 */
      tableBookingId: number;
      /** Format: decimal */
      salesAmount: number;
      /** Format: decimal */
      totalAmount: number;
      /** Format: int32 */
      outletId: number;
    };
    Request11: {
      /** Format: int32 */
      tableId: number;
      bookingName: string;
      /** Format: int32 */
      salesPeriodId: number;
    };
    Request12: {
      name: string;
      /** Format: int32 */
      sectionId: number;
      /** Format: int32 */
      capacity: number;
    };
    Response3: {
      /** Format: int32 */
      id: number;
      /** Format: int32 */
      tableId: number;
      bookingName: string;
      /** Format: date-time */
      bookingDate: string;
      /** Format: int32 */
      salesPeriodId: number;
      /** Format: int32 */
      staffId: number;
      table: components["schemas"]["TableDto"];
    };
    TableDto: {
      /** Format: int32 */
      tableId: number;
      name: string;
      section: components["schemas"]["SectionDto"];
    };
    SectionDto: {
      /** Format: int32 */
      id: number;
      name: string;
    };
    Request13: Record<string, never>;
    Response4: {
      /** Format: int32 */
      tableId: number;
      name: string;
      /** Format: int32 */
      capacity: number;
      /** Format: int32 */
      sectionId: number;
      section: components["schemas"]["SectionDto2"];
    };
    SectionDto2: {
      /** Format: int32 */
      id: number;
      name: string;
    };
    Request14: Record<string, never>;
    Request15: {
      name: string;
      /** Format: int32 */
      sectionId: number;
      /** Format: int32 */
      capacity: number;
    };
    Request16: {
      /** Format: int32 */
      id: number;
      name: string;
    };
    Request17: Record<string, never>;
    Request18: Record<string, never>;
    Request19: {
      name: string;
      /** Format: int32 */
      outletId: number;
    };
    Request20: Record<string, never>;
    Request21: {
      name: string;
      /** Format: int32 */
      outletId: number;
    };
    Request22: {
      /** Format: int32 */
      salesPeriodId: number;
    };
    Request23: {
      name: string;
      /** Format: int32 */
      businessId: number;
    };
    Request24: Record<string, never>;
    Request25: {
      name: string;
      /** Format: int32 */
      businessId: number;
    };
    Request26: {
      /** Format: int32 */
      id: number;
      name: string;
    };
    Response5: {
      sections: components["schemas"]["MenuSection"][];
      items: components["schemas"]["MenuItem"][];
    };
    Request27: Record<string, never>;
    Request28: Record<string, never>;
    Request29: Record<string, never>;
    Request30: Record<string, never>;
    Request31: {
      /** Format: int32 */
      outletId: number;
      name: string;
      division: components["schemas"]["Division"];
    };
    Request32: Record<string, never>;
    Clock: {
      /** Format: int32 */
      id: number;
      userId: string;
      user: components["schemas"]["User"];
      /** Format: date-time */
      startDate: string;
      /** Format: date-time */
      endDate?: string | null;
      /** Format: int32 */
      outletId: number;
      outlet: components["schemas"]["Outlet"];
    };
    Request33: {
      /** Format: int32 */
      outletId: number;
    };
    Request34: {
      /** Format: int32 */
      outletId: number;
    };
    Request35: Record<string, never>;
    Request36: {
      /** Format: int32 */
      id: number;
      name: string;
    };
    Request37: {
      /** Format: int32 */
      id: number;
    };
    Request38: {
      name: string;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export interface operations {

  UserValidate: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["Request"];
      };
    };
    responses: {
      /** @description Success */
      200: {
        content: {
          "application/json": components["schemas"]["Response"];
        };
      };
      /** @description Server Error */
      500: {
        content: {
          "application/json": components["schemas"]["InternalErrorResponse"];
        };
      };
    };
  };
  UserGetStatus: {
    responses: {
      /** @description Success */
      200: {
        content: {
          "application/json": components["schemas"]["Response2"];
        };
      };
      /** @description Server Error */
      500: {
        content: {
          "application/json": components["schemas"]["InternalErrorResponse"];
        };
      };
    };
  };
  UserGetRoles: {
    parameters: {
      query: {
        userId: string | null;
      };
    };
    responses: {
      /** @description Success */
      200: {
        content: {
          "application/json": string[];
        };
      };
      /** @description Server Error */
      500: {
        content: {
          "application/json": components["schemas"]["InternalErrorResponse"];
        };
      };
    };
  };
  UserAssignOutlet: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["Request3"];
      };
    };
    responses: {
      /** @description Success */
      200: {
        content: {
          "application/json": components["schemas"]["UserOutlet"];
        };
      };
      /** @description Unauthorized */
      401: {
        content: never;
      };
      /** @description Server Error */
      500: {
        content: {
          "application/json": components["schemas"]["InternalErrorResponse"];
        };
      };
    };
  };
  RoleCreate: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["Request4"];
      };
    };
    responses: {
      /** @description Success */
      200: {
        content: {
          "text/plain": unknown;
          "application/json": unknown;
        };
      };
      /** @description Server Error */
      500: {
        content: {
          "application/json": components["schemas"]["InternalErrorResponse"];
        };
      };
    };
  };
  RoleAddUserInRole: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["Request5"];
      };
    };
    responses: {
      /** @description Success */
      200: {
        content: {
          "text/plain": unknown;
          "application/json": unknown;
        };
      };
      /** @description Server Error */
      500: {
        content: {
          "application/json": components["schemas"]["InternalErrorResponse"];
        };
      };
    };
  };
  TableOrderCreate: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["Request6"];
      };
    };
    responses: {
      /** @description Success */
      200: {
        content: {
          "application/json": components["schemas"]["TableOrder"];
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "application/problem+json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Server Error */
      500: {
        content: {
          "application/json": components["schemas"]["InternalErrorResponse"];
        };
      };
    };
  };
  OrderViewOrders: {
    parameters: {
      query: {
        tableBookingId: number;
      };
      path: {
        tableId: string | null;
      };
    };
    responses: {
      /** @description Success */
      200: {
        content: {
          "application/json": components["schemas"]["TableOrder"][];
        };
      };
      /** @description Server Error */
      500: {
        content: {
          "application/json": components["schemas"]["InternalErrorResponse"];
        };
      };
    };
  };
  OrderAddItem: {
    parameters: {
      path: {
        orderId: number;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["Request8"];
      };
    };
    responses: {
      /** @description Success */
      200: {
        content: {
          "application/json": components["schemas"]["OrderItem"];
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "application/problem+json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Server Error */
      500: {
        content: {
          "application/json": components["schemas"]["InternalErrorResponse"];
        };
      };
    };
  };
  TableCashUpViewTableCashUps: {
    parameters: {
      path: {
        tableBookingId: number;
      };
    };
    responses: {
      /** @description Success */
      200: {
        content: {
          "application/json": components["schemas"]["TableCashUp"][];
        };
      };
      /** @description Server Error */
      500: {
        content: {
          "application/json": components["schemas"]["InternalErrorResponse"];
        };
      };
    };
  };
  TableCashUpCreate: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["Request10"];
      };
    };
    responses: {
      /** @description Success */
      200: {
        content: {
          "application/json": components["schemas"]["TableCashUp"];
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "application/problem+json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Server Error */
      500: {
        content: {
          "application/json": components["schemas"]["InternalErrorResponse"];
        };
      };
    };
  };
  TableBookingCreate: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["Request11"];
      };
    };
    responses: {
      /** @description Success */
      200: {
        content: {
          "application/json": components["schemas"]["TableBooking"];
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "application/problem+json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Server Error */
      500: {
        content: {
          "application/json": components["schemas"]["InternalErrorResponse"];
        };
      };
    };
  };
  TableUpdate: {
    parameters: {
      path: {
        tableId: number;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["Request12"];
      };
    };
    responses: {
      /** @description Success */
      200: {
        content: {
          "application/json": components["schemas"]["Table"];
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "application/problem+json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Server Error */
      500: {
        content: {
          "application/json": components["schemas"]["InternalErrorResponse"];
        };
      };
    };
  };
  TableGetMyBooked: {
    parameters: {
      query: {
        outletId: number;
        myBooking: boolean;
      };
    };
    responses: {
      /** @description Success */
      200: {
        content: {
          "application/json": components["schemas"]["Response3"][];
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "application/problem+json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Server Error */
      500: {
        content: {
          "application/json": components["schemas"]["InternalErrorResponse"];
        };
      };
    };
  };
  TableGetAvailable: {
    parameters: {
      query: {
        outletId: number;
      };
    };
    responses: {
      /** @description Success */
      200: {
        content: {
          "application/json": components["schemas"]["Response4"][];
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "application/problem+json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Server Error */
      500: {
        content: {
          "application/json": components["schemas"]["InternalErrorResponse"];
        };
      };
    };
  };
  TableCreate: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["Request15"];
      };
    };
    responses: {
      /** @description Success */
      200: {
        content: {
          "application/json": components["schemas"]["Table"];
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "application/problem+json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Server Error */
      500: {
        content: {
          "application/json": components["schemas"]["InternalErrorResponse"];
        };
      };
    };
  };
  SectionGet: {
    parameters: {
      path: {
        sectionId: number;
      };
    };
    responses: {
      /** @description Success */
      200: {
        content: {
          "application/json": components["schemas"]["Section"];
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "application/problem+json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Server Error */
      500: {
        content: {
          "application/json": components["schemas"]["InternalErrorResponse"];
        };
      };
    };
  };
  SectionUpdate: {
    parameters: {
      path: {
        sectionId: string | null;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["Request16"];
      };
    };
    responses: {
      /** @description Success */
      200: {
        content: {
          "application/json": components["schemas"]["Section"];
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "application/problem+json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Server Error */
      500: {
        content: {
          "application/json": components["schemas"]["InternalErrorResponse"];
        };
      };
    };
  };
  SectionList: {
    parameters: {
      query: {
        outletId: number;
      };
    };
    responses: {
      /** @description Success */
      200: {
        content: {
          "application/json": components["schemas"]["Section"][];
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "application/problem+json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Server Error */
      500: {
        content: {
          "application/json": components["schemas"]["InternalErrorResponse"];
        };
      };
    };
  };
  SectionCreate: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["Request19"];
      };
    };
    responses: {
      /** @description Success */
      200: {
        content: {
          "application/json": components["schemas"]["Section"];
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "application/problem+json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Server Error */
      500: {
        content: {
          "application/json": components["schemas"]["InternalErrorResponse"];
        };
      };
    };
  };
  SalesPeriodGet: {
    parameters: {
      path: {
        outletId: number;
      };
    };
    responses: {
      /** @description Success */
      200: {
        content: {
          "application/json": components["schemas"]["SalesPeriod"];
        };
      };
      /** @description Server Error */
      500: {
        content: {
          "application/json": components["schemas"]["InternalErrorResponse"];
        };
      };
    };
  };
  SalesPeriodCreate: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["Request21"];
      };
    };
    responses: {
      /** @description Success */
      200: {
        content: {
          "application/json": components["schemas"]["SalesPeriod"];
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "application/problem+json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Server Error */
      500: {
        content: {
          "application/json": components["schemas"]["InternalErrorResponse"];
        };
      };
    };
  };
  SalesPeriodClose: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["Request22"];
      };
    };
    responses: {
      /** @description Success */
      200: {
        content: {
          "application/json": components["schemas"]["SalesPeriod"];
        };
      };
      /** @description Server Error */
      500: {
        content: {
          "application/json": components["schemas"]["InternalErrorResponse"];
        };
      };
    };
  };
  OutletGet: {
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      /** @description Success */
      200: {
        content: {
          "application/json": components["schemas"]["Outlet"];
        };
      };
      /** @description Server Error */
      500: {
        content: {
          "application/json": components["schemas"]["InternalErrorResponse"];
        };
      };
    };
  };
  OutletUpdate: {
    parameters: {
      path: {
        id: number;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["Request23"];
      };
    };
    responses: {
      /** @description Success */
      200: {
        content: {
          "application/json": components["schemas"]["Outlet"];
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "application/problem+json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Server Error */
      500: {
        content: {
          "application/json": components["schemas"]["InternalErrorResponse"];
        };
      };
    };
  };
  OutletList: {
    responses: {
      /** @description Success */
      200: {
        content: {
          "application/json": components["schemas"]["Outlet"][];
        };
      };
      /** @description Server Error */
      500: {
        content: {
          "application/json": components["schemas"]["InternalErrorResponse"];
        };
      };
    };
  };
  OutletCreate: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["Request25"];
      };
    };
    responses: {
      /** @description Success */
      200: {
        content: {
          "application/json": components["schemas"]["Outlet"];
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "application/problem+json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Server Error */
      500: {
        content: {
          "application/json": components["schemas"]["InternalErrorResponse"];
        };
      };
    };
  };
  MenuGet: {
    parameters: {
      path: {
        menuId: number;
      };
    };
    responses: {
      /** @description Success */
      200: {
        content: {
          "application/json": components["schemas"]["Menu"];
        };
      };
      /** @description Server Error */
      500: {
        content: {
          "application/json": components["schemas"]["InternalErrorResponse"];
        };
      };
    };
  };
  MenuUpdate: {
    parameters: {
      path: {
        menuId: string | null;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["Request26"];
      };
    };
    responses: {
      /** @description Success */
      200: {
        content: {
          "application/json": components["schemas"]["Menu"];
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "application/problem+json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Server Error */
      500: {
        content: {
          "application/json": components["schemas"]["InternalErrorResponse"];
        };
      };
    };
  };
  MenuGetSectionsGetOutletMenus: {
    parameters: {
      query: {
        outletId: number;
        sectionId: number;
        search?: string | null;
      };
    };
    responses: {
      /** @description Success */
      200: {
        content: {
          "application/json": components["schemas"]["Response5"];
        };
      };
      /** @description Server Error */
      500: {
        content: {
          "application/json": components["schemas"]["InternalErrorResponse"];
        };
      };
    };
  };
  MenuGetOutletMenuGetOutletMenus: {
    parameters: {
      query: {
        outletId: number;
      };
    };
    responses: {
      /** @description Success */
      200: {
        content: {
          "application/json": components["schemas"]["Menu"][];
        };
      };
      /** @description Server Error */
      500: {
        content: {
          "application/json": components["schemas"]["InternalErrorResponse"];
        };
      };
    };
  };
  MenuList: {
    parameters: {
      query: {
        outletId: number;
      };
    };
    responses: {
      /** @description Success */
      200: {
        content: {
          "application/json": components["schemas"]["Menu"][];
        };
      };
      /** @description Server Error */
      500: {
        content: {
          "application/json": components["schemas"]["InternalErrorResponse"];
        };
      };
    };
  };
  MenuCreate: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["Request31"];
      };
    };
    responses: {
      /** @description Success */
      200: {
        content: {
          "application/json": components["schemas"]["Menu"];
        };
      };
      /** @description Server Error */
      500: {
        content: {
          "application/json": components["schemas"]["InternalErrorResponse"];
        };
      };
    };
  };
  ClockList: {
    parameters: {
      query: {
        outletId: number;
        statusId: number;
      };
    };
    responses: {
      /** @description Success */
      200: {
        content: {
          "application/json": components["schemas"]["User"][];
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "application/problem+json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Server Error */
      500: {
        content: {
          "application/json": components["schemas"]["InternalErrorResponse"];
        };
      };
    };
  };
  ClockClockOut: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["Request33"];
      };
    };
    responses: {
      /** @description Success */
      200: {
        content: {
          "application/json": components["schemas"]["Clock"];
        };
      };
      /** @description Server Error */
      500: {
        content: {
          "application/json": components["schemas"]["InternalErrorResponse"];
        };
      };
    };
  };
  ClockClockIn: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["Request34"];
      };
    };
    responses: {
      /** @description Success */
      200: {
        content: {
          "application/json": components["schemas"]["Clock"];
        };
      };
      /** @description Server Error */
      500: {
        content: {
          "application/json": components["schemas"]["InternalErrorResponse"];
        };
      };
    };
  };
  BusinessGetAll: {
    responses: {
      /** @description Success */
      200: {
        content: {
          "application/json": components["schemas"]["Business"][];
        };
      };
      /** @description Unauthorized */
      401: {
        content: never;
      };
      /** @description Server Error */
      500: {
        content: {
          "application/json": components["schemas"]["InternalErrorResponse"];
        };
      };
    };
  };
  BusinessEdit: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["Request36"];
      };
    };
    responses: {
      /** @description Success */
      200: {
        content: {
          "text/plain": unknown;
          "application/json": unknown;
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "application/problem+json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Server Error */
      500: {
        content: {
          "application/json": components["schemas"]["InternalErrorResponse"];
        };
      };
    };
  };
  BusinessCreate: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["Request38"];
      };
    };
    responses: {
      /** @description Success */
      200: {
        content: {
          "application/json": components["schemas"]["Business"];
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "application/problem+json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Server Error */
      500: {
        content: {
          "application/json": components["schemas"]["InternalErrorResponse"];
        };
      };
    };
  };
  BusinessDelete: {
    requestBody: {
      content: {
        "*/*": components["schemas"]["Request37"];
        "application/json": components["schemas"]["Request37"];
      };
    };
    responses: {
      /** @description Success */
      200: {
        content: {
          "text/plain": unknown;
          "application/json": unknown;
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "application/problem+json": components["schemas"]["ErrorResponse"];
        };
      };
      /** @description Server Error */
      500: {
        content: {
          "application/json": components["schemas"]["InternalErrorResponse"];
        };
      };
    };
  };
  BusinessGet: {
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      /** @description Success */
      200: {
        content: {
          "application/json": components["schemas"]["Business"];
        };
      };
      /** @description Server Error */
      500: {
        content: {
          "application/json": components["schemas"]["InternalErrorResponse"];
        };
      };
    };
  };
}
