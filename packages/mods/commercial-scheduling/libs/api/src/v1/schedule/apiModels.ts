export type ScheduleStatus = "DRAFT" | "AWAITING_APPROVAL" | "APPROVED";

export type Schedule = {
    id: string;
    commercialPlanId: string;
    isImported: boolean;
    regionId: string;
    regionName: string;
    status: ScheduleStatus;
    totalScheduleItems: number;
    validFrom: string;
    validTo: string;
};
