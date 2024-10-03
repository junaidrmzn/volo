import type { FlightPlanInfo } from "@voloiq-typescript-api/flight-planning-types";

export const mockedFlightPlan: FlightPlanInfo = {
    scheduledDepartureTime: new Date(2022, 3, 3, 15, 5, 0).toISOString(),
    scheduledArrivalTime: new Date(2022, 3, 3, 15, 11, 0).toISOString(),
    operationType: "other",
    flightRules: "VFR",
    paxCount: 1,
    preferredRoute: 43,
    additionalRoutes: [],
    aircraftId: "1234-32132-43234323-32131",
};

export const createMockedFlightPlan = (overrides?: Partial<FlightPlanInfo>): FlightPlanInfo => ({
    ...mockedFlightPlan,
    ...overrides,
});
