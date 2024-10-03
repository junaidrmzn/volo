import type { FlightPlanInfo } from "@voloiq-typescript-api/flight-planning-types";
import * as faker from "faker";
import { createMockedRouteOption } from "./routeOption";

export const anyFlightPlan = (overwrites?: Partial<FlightPlanInfo>): FlightPlanInfo => ({
    id: 1,
    externalId: faker.datatype.uuid().toString(),
    version: 1,
    planStage: "filed",
    conflictStatus: "no_conflict",
    conformanceStatus: "conforming",
    startTime: new Date(Date.UTC(2022, 1, 1)).toString(),
    endTime: new Date(Date.UTC(2022, 1, 1)).toString(),
    operationType: "other",
    scheduledDepartureTime: new Date(Date.UTC(2022, 1, 5)).toString(),
    scheduledArrivalTime: new Date(Date.UTC(2022, 1, 6)).toString(),
    filedTime: new Date(Date.UTC(2022, 1, 1)).toString(),
    targetActivationTime: new Date(Date.UTC(2022, 1, 1)).toString(),
    flightRules: "VFR",
    paxCount: 1,
    preferredRoute: 2,
    additionalRoutes: [3, 4],
    aircraftId: faker.datatype.uuid().toString(),
    routeOption: createMockedRouteOption(),
    ...overwrites,
});
