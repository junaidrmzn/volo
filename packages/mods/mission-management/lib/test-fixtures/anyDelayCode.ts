import { DelayCode } from "@voloiq/network-schedule-management-api/v1";

export const anyDelayCode = (overwrites?: Partial<DelayCode>): DelayCode => ({
    code: "7",
    priority: false,
    delayCategory: "PASSENGER_AND_BAGGAGE",
    description: "Baggage processing, sorting, etc.",
    ...overwrites,
});
