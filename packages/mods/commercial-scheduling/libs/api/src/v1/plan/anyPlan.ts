import { anySchedule } from "../schedule/anySchedule";
import type { Plan } from "./apiModels";

export const anyPlan = (overwrites?: Partial<Plan>): Required<Plan> => ({
    id: "1",
    planName: "Plan",
    timeCreated: "2024-09-01T00:00:00.000Z",
    regionId: "region-1",
    regionName: "Region",
    status: "DRAFT",
    isArchived: false,
    isDeleted: false,
    hasOffer: false,
    hasPrice: false,
    hasSchedule: true,
    commercialSchedule: anySchedule(),
    scheduleItemWrtConnectionState: "ALL_CONSISTENT",
    ...overwrites,
});
