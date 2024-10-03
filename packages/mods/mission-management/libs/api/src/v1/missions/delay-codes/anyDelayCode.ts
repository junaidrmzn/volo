import { DelayCode } from "./apiModels";

export const anyDelayCode = (overwrites?: Partial<DelayCode>): Required<DelayCode> => ({
    code: "1",
    priority: true,
    delayCategory: "PASSENGER_AND_BAGGAGE",
    description: "Late check-in, congestion in check-in area",
    ...overwrites,
});
