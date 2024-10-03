import type { Schedule } from "./apiModels";

export const anySchedule = (overwrites?: Partial<Schedule>): Required<Schedule> => ({
    id: "1",
    commercialPlanId: "1",
    regionId: "1",
    regionName: "Region 1",
    status: "APPROVED",
    validFrom: "2024-01-01T00:00:00.000Z",
    validTo: "2024-12-31T00:00:00.000Z",
    totalScheduleItems: 1,
    isImported: false,
    ...overwrites,
});
