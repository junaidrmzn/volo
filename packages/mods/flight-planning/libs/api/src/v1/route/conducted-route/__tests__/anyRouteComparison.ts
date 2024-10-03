import { RouteComparison } from "../models";

export const anyRouteComparison = (overrides?: Partial<RouteComparison>): RouteComparison => ({
    conductedRoute: [[1.23, 1.23]],
    deviationFromPlannedRoute: [
        {
            averageDeviation: 1234,
            coordinates: [[1.23, 1.23]],
        },
    ],
    deviationFromPlannedRoutePolygons: [[[1.23, 1.23]]],
    ...overrides,
});
