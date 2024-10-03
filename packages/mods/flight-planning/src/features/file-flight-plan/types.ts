import type { FlightPlanInfo } from "@voloiq-typescript-api/flight-planning-types";

export const initialFlightPlan: FlightPlanInfo = {
    scheduledDepartureTime: undefined!,
    scheduledArrivalTime: undefined!,
    operationType: undefined!,
    flightRules: undefined!,
    paxCount: undefined!,
    preferredRoute: 0,
    additionalRoutes: [],
    aircraftId: "",
};
