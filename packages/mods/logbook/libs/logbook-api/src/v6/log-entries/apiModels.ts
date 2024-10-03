import type { Aircraft } from "../aircrafts";
import type { LogCrewMember, LogCrewMemberInsert } from "../crew-members";
import type { LogbookFile } from "../files";
import type { Location } from "../locations";

export type Log = {
    id: string;
    files: LogbookFile[];
    date: string;
    location: Location;
    fcSoftware: string;
    aircraft: Aircraft;
    crew?: LogCrewMember[];
    remarks?: string;
    statistics?: LogStats;
    flightTestOrder?: string;
    endDate?: string;
    createTime: string;
    updateTime: string;
    validTo?: string;
    inactive: boolean;
    dataState: DataState;
};

export type LogInsert = {
    date: string;
    locationId: string;
    aircraftId: string;
    crew?: LogCrewMemberInsert[];
    remarks?: string;
    flightTestOrder?: string;
    endDate?: string;
};

export type LogPatch = {
    fcSoftware: string;
};

export type LogPatchRemarks = {
    remarks: string;
};

export type LogStats = {
    maxAltitude?: number;
    maxVelocity?: number;
    totalFlightDuration?: number;
};

export const DataStateEnum = {
    TM_DATA: "TM_DATA",
    ONBOARD_RECORDED_DATA: "ONBOARD_RECORDED_DATA",
    NO_DATA: "NO_DATA",
} as const;

export type DataState = typeof DataStateEnum[keyof typeof DataStateEnum];
