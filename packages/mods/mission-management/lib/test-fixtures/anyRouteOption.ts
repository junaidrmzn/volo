import type { RouteOption } from "@voloiq-typescript-api/network-scheduling-types";

export const anyRouteOption = (overwrites?: Partial<RouteOption>) => ({
    id: "472",
    name: "XRJ - FCO Route Day 2",
    validForOperation: true,
    departureVertiportId: "97468050-19df-4c12-a751-b8a23da56121",
    arrivalVertiportId: "f5cf2755-0eb0-484a-bef6-67f0f604e8d5",
    ...overwrites,
});
