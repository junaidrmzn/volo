export declare type CheckListCategory =
    | "AIRCRAFT"
    | "BATTERY"
    | "CREW"
    | "FLIGHT_PLAN"
    | "GENERAL"
    | "GROUND_OPERATION"
    | "PASSENGER"
    | "NOTAMS"
    | "WEATHER"
    | "UNKNOWN";

export type UserRole = "OCC" | "PILOT";

export type MessageInformationCreate = {
    message: string;
    messageCategory: CheckListCategory;
    userRole: UserRole;
};

export type MessageInformationAllOf = {
    id: string;
    authorEmail?: string;
    publishDate?: string;
};

export type MessageInformation = MessageInformationCreate & MessageInformationAllOf;
