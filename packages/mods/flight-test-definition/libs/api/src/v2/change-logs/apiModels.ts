import type { FlightTestDefinitionRequestStatus } from "../common";

export type EntityUpdateType = "Status Change" | "Content Editing" | "Creation";
export type EntityType = "flightTestDefinition" | "procedure";

export type ChangeLogV2Value = {
    id: string;
    userName: string;
    userId: string;
    updateTime: string;
    updateType: EntityUpdateType;
    entityType: EntityType;
    title: string;
    revision: string;
    statusChange?: [FlightTestDefinitionRequestStatus, FlightTestDefinitionRequestStatus];
    status: FlightTestDefinitionRequestStatus;
    transactionId: number;
    referenceId: string;
};

export type ChangeLogV2 = {
    id: string;
    revision: string;
    value: ChangeLogV2Value[];
};
