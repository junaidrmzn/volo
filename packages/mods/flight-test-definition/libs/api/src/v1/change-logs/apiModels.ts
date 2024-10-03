import type { ProceduresChangesOverview } from "..";
import type { FlightTestDefinitionChangesOverview, FlightTestDefinitionRequestStatus } from "../../v2";

type EntityUpdateType = "Status Change" | "Content Editing" | "Creation";

export type ChangeLog = {
    id: string;
    userName: string;
    userId: string;
    updateTime: string;
    updateType: EntityUpdateType;
    entityType: "flightTestDefinition" | "procedure";
    statusChange?: [FlightTestDefinitionRequestStatus, FlightTestDefinitionRequestStatus];
    status: FlightTestDefinitionRequestStatus;
    title: string;
    referenceId: string;
};

export type ChangeLogDetails = {
    id: string;
    userName: string;
    userId: string;
    updateTime: string;
    updateType: EntityUpdateType;
    transactionId: number;
    entity: ProceduresChangesOverview | FlightTestDefinitionChangesOverview;
    changes?: {
        [key: string]: [object, object];
    };
};
