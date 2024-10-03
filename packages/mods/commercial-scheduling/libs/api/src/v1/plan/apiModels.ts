import { Schedule } from "../schedule";

export type PlanStatus = "DRAFT" | "AWAITING_APPROVAL" | "APPROVED" | "PUBLISHED";
export type PlanConnectionsState = "ALL_CONSISTENT" | "ALL_INCONSISTENT" | "SOME_INCONSISTENT" | "ONE_INCONSISTENT";

export type Plan = {
    id: string;
    planName: string;
    timeCreated: string;
    regionId: string;
    regionName: string;
    status: PlanStatus;
    isArchived: boolean;
    isDeleted: boolean;
    commercialSchedule: Schedule;
    hasPrice: boolean;
    hasOffer: boolean;
    hasSchedule: boolean;
    scheduleItemWrtConnectionState: PlanConnectionsState;
};

export type PlanUpdate = Partial<Pick<Plan, "planName" | "isArchived" | "isDeleted">>;
