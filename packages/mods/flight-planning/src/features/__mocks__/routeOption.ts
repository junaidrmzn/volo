import { RouteOption, anyRouteOption } from "@voloiq/flight-planning-api/v1";
import { mockedVertiport1, mockedVertiport2 } from "./vertiports";

export const mockedRouteOption = anyRouteOption({
    id: 34,
    departureExternalVertiport: mockedVertiport1,
    arrivalExternalVertiport: mockedVertiport2,
    aircraftType: "VC2-1",
    name: "Mocked RouteOption",
    validForOperation: true,
    aircraftTypeId: "42",
});

export const createMockedRouteOption = (overrides?: Partial<RouteOption>): RouteOption => ({
    ...mockedRouteOption,
    ...overrides,
});
