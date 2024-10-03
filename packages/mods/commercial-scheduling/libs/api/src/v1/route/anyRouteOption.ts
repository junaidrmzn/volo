import { RouteOption } from "./apiModels";

export const anyRouteOption = (overwrites?: Partial<RouteOption>): Required<RouteOption> => ({
    id: 1,
    name: "Route Option",
    arrivalExternalVertiport: {
        id: 1,
        name: "Arr External Port",
        lat: 0,
        lng: 0,
        alt: 0,
        externalId: "",
    },
    departureExternalVertiport: {
        id: 1,
        name: "Arr External Port",
        lat: 0,
        lng: 0,
        alt: 0,
        externalId: "",
    },
    aircraftTypeId: "1",
    aircraftType: "Aircraft Type",
    validForOperation: true,
    isCopied: false,
    lastModified: "2024-01-01T00:00:00.000Z",
    ...overwrites,
});
