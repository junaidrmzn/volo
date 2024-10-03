import { anyVertiport } from "../vertiport";
import { RouteOption, RouteOptionUpdate } from "./models";

export const anyRouteOption = (overwrites: Partial<RouteOption> = {}): RouteOption => ({
    aircraftType: "Drone",
    arrivalExternalVertiport: anyVertiport(),
    departureExternalVertiport: anyVertiport(),
    id: 123,
    name: "Foo",
    isCopied: false,
    validForOperation: true,
    ...overwrites,
});

export const anyRouteOptionUpdate = (overwrites: Partial<RouteOptionUpdate> = {}): RouteOptionUpdate => ({
    aircraftType: "Drone",
    arrivalExternalVertiport: 1,
    departureExternalVertiport: 2,
    id: 123,
    name: "Foo",
    isCopied: false,
    validForOperation: true,
    ...overwrites,
});
