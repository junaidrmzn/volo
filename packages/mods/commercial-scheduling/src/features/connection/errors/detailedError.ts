export const DEP_VERT_NOT_FOUND = "#DEP_VERT_NOT_FOUND";
export const ARV_VERT_NOT_FOUND = "#ARV_VERT_NOT_FOUND";
export const DEP_VERT_CODE_INCONSISTENT = "#DEP_VERT_CODE_INCONSISTENT";
export const ARV_VERT_CODE_INCONSISTENT = "#ARV_VERT_CODE_INCONSISTENT";
export const DEP_VERT_REGION = "#DEP_VERT_REGION";
export const ARV_VERT_REGION = "#ARV_VERT_REGION";
export const DEP_VERT_NO_PASSENGER_SERVICE = "#DEP_VERT_NO_PASSENGER_SERVICE";
export const ARV_VERT_NO_PASSENGER_SERVICE = "#ARV_VERT_NO_PASSENGER_SERVICE";
export const DEP_VERT_NO_SERVICE = "#DEP_VERT_NO_SERVICE";
export const ARV_VERT_NO_SERVICE = "#ARV_VERT_NO_SERVICE";
export const DEP_VERT_VALID_FROM = "#DEP_VERT_VALID_FROM";
export const DEP_VERT_VALID_TO = "#DEP_VERT_VALID_TO";
export const ARV_VERT_VALID_FROM = "#ARV_VERT_VALID_FROM";
export const ARV_VERT_VALID_TO = "#ARV_VERT_VALID_TO";
export const CONN_UNQ_NAME = "#CONN_UNQ_NAME";
export const UNQ_CONN_VALID_FROM_TO_CATEGORY_DEP_ARV_VERT = "#UNQ_CONN_VALID_FROM_TO_CATEGORY_DEP_ARV_VERT";

export type DetailedErrorKey =
    | typeof DEP_VERT_NOT_FOUND
    | typeof ARV_VERT_NOT_FOUND
    | typeof DEP_VERT_CODE_INCONSISTENT
    | typeof ARV_VERT_CODE_INCONSISTENT
    | typeof DEP_VERT_NO_PASSENGER_SERVICE
    | typeof ARV_VERT_NO_PASSENGER_SERVICE
    | typeof DEP_VERT_REGION
    | typeof DEP_VERT_NO_SERVICE
    | typeof ARV_VERT_NO_SERVICE
    | typeof ARV_VERT_REGION
    | typeof DEP_VERT_VALID_FROM
    | typeof DEP_VERT_VALID_TO
    | typeof ARV_VERT_VALID_FROM
    | typeof ARV_VERT_VALID_TO
    | typeof CONN_UNQ_NAME
    | typeof UNQ_CONN_VALID_FROM_TO_CATEGORY_DEP_ARV_VERT;

export type DetailedError = {
    detailedError: string;
    attribute: string;
    value: string;
    message: string;
    key: DetailedErrorKey;
};
