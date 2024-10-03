export type PlanProcessStatus = "NEW" | "IN_PROGRESS" | "COMPLETED" | "FAILED";

export const LINE_SIZE = "#LINE_SIZE";
export const FLIGHT_NUMBER_FORMAT = "#FLIGHT_NUMBER_FORMAT";
export const INVALID_DEP_DATE_TIME_FORMAT = "#INVALID_DEP_DATE_TIME_FORMAT";
export const INVALID_ARRIVAL_DATE_TIME_FORMAT = "#INVALID_ARRIVAL_DATE_TIME_FORMAT";
export const INVALID_DEP_VERT_CODE = "#INVALID_DEP_VERT_CODE";
export const INVALID_ARV_VERT_CODE = "#INVALID_ARV_VERT_CODE";
export const INVALID_FILE = "#INVALID_FILE";
export const COMM_PLAN_UNQ_NAME = "#COMM_PLAN_UNQ_NAME";
export const FLIGHT_NUM_UNIQUE = "#FLIGHT_NUM_UNIQUE";
export const GEN_CONST_VIOLATION = "#GEN_CONST_VIOLATION";
export const CONNECTION_NOT_FOUND = "#CONNECTION_NOT_FOUND";
export const CONNECTION_INVALID = "#CONNECTION_INVALID";
export const CONNECTION_INCONSISTENT_WRT_DEP_ARV_TIME = "#CONNECTION_INCONSISTENT_WRT_DEP_ARV_TIME";
export const VERTIPORT_NOT_FOUND_FOR_DEP_ARV_TIME = "#VERTIPORT_NOT_FOUND_FOR_DEP_ARV_TIME";
export const VERTIPORT_INVALID = "#VERTIPORT_INVALID";
export const VERTIPORT_NOT_FOUND = "#VERTIPORT_NOT_FOUND";
export const DUPLICATE_VERTIPORTS = "#DUPLICATE_VERTIPORTS";
export const MULTIPLE_REGIONS = "#MULTIPLE_REGIONS";
export const INVALID_COMM_PLAN_STATUS = "#INVALID_COMM_PLAN_STATUS";

export const DEP_VERT_NOT_FOUND = "#DEP_VERT_NOT_FOUND";
export const ARV_VERT_NOT_FOUND = "#ARV_VERT_NOT_FOUND";
export const DEP_VERT_CODE_INCONSISTENT = "#DEP_VERT_CODE_INCONSISTENT";
export const ARV_VERT_CODE_INCONSISTENT = "#ARV_VERT_CODE_INCONSISTENT";
export const DEP_VERT_REGION = "#DEP_VERT_REGION";
export const ARV_VERT_REGION = "#ARV_VERT_REGION";
export const DEP_VERT_NO_PASSENGER_SERVICE = "#DEP_VERT_NO_PASSENGER_SERVICE";
export const ARV_VERT_NO_PASSENGER_SERVICE = "#ARV_VERT_NO_PASSENGER_SERVICE";
export const DEP_VERT_VALID_FROM = "#DEP_VERT_VALID_FROM";
export const DEP_VERT_VALID_TO = "#DEP_VERT_VALID_TO";
export const ARV_VERT_VALID_FROM = "#ARV_VERT_VALID_FROM";
export const ARV_VERT_VALID_TO = "#ARV_VERT_VALID_TO";

export type DetailedErrorKey =
    | typeof LINE_SIZE
    | typeof FLIGHT_NUMBER_FORMAT
    | typeof INVALID_DEP_DATE_TIME_FORMAT
    | typeof INVALID_ARRIVAL_DATE_TIME_FORMAT
    | typeof INVALID_FILE
    | typeof COMM_PLAN_UNQ_NAME
    | typeof INVALID_DEP_VERT_CODE
    | typeof INVALID_ARV_VERT_CODE
    | typeof FLIGHT_NUM_UNIQUE
    | typeof GEN_CONST_VIOLATION
    | typeof CONNECTION_NOT_FOUND
    | typeof CONNECTION_INVALID
    | typeof CONNECTION_INCONSISTENT_WRT_DEP_ARV_TIME
    | typeof VERTIPORT_NOT_FOUND_FOR_DEP_ARV_TIME
    | typeof VERTIPORT_INVALID
    | typeof VERTIPORT_NOT_FOUND
    | typeof DUPLICATE_VERTIPORTS
    | typeof MULTIPLE_REGIONS
    | typeof INVALID_COMM_PLAN_STATUS
    | typeof DEP_VERT_NOT_FOUND
    | typeof ARV_VERT_NOT_FOUND
    | typeof DEP_VERT_CODE_INCONSISTENT
    | typeof ARV_VERT_CODE_INCONSISTENT
    | typeof DEP_VERT_NO_PASSENGER_SERVICE
    | typeof ARV_VERT_NO_PASSENGER_SERVICE
    | typeof DEP_VERT_REGION
    | typeof ARV_VERT_REGION
    | typeof DEP_VERT_VALID_FROM
    | typeof DEP_VERT_VALID_TO
    | typeof ARV_VERT_VALID_FROM
    | typeof ARV_VERT_VALID_TO;

export type DetailedError = {
    detailedError: string;
    attribute: string;
    value: string;
    message: string;
    key: DetailedErrorKey;
};

export type PlanProcessProgress = {
    status: PlanProcessStatus;
    comments?: string | null;
    errors: DetailedError[];
};

export type PlanProcess = {
    id: string;
    remarks?: string;
} & PlanProcessProgress;
