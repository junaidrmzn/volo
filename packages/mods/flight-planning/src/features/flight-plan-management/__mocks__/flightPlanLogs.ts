import type { FlightPlanLogInfo } from "@voloiq-typescript-api/flight-planning-types";
import { createFlightPlanMock } from "./flightPlan";

export const createFlightPlanLogMock = (overrides?: Partial<FlightPlanLogInfo>) => {
    const data: FlightPlanLogInfo = {
        timestamp: new Date(Date.UTC(2022, 1, 1)).toString(),
        flightPlan: createFlightPlanMock(),
        message: "example message",
        action: "create",
        source: "system",
        ...overrides,
    };
    return data;
};
