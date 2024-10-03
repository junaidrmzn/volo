import { RouteTemplate } from "@voloiq/flight-planning-api/v1";

export const anyRouteTemplate = (overrides?: object): RouteTemplate => ({
    id: 44,
    name: "Demo",
    description: "",
    plannedBy: "voloiq-flightplanning",
    createdAt: "2022-03-28T13:06:14.158813Z",
    distance: 0,
    duration: 0,
    refAltAmsl: 0,
    remainingEnergy: 0,
    validationStatus: "not_yet_validated",
    ...overrides,
});
