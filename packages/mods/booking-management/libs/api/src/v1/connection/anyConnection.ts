import { Connection } from "./apiModels";

export const anyConnection = (overwrites?: Partial<Connection>): Required<Connection> => ({
    id: "1",
    name: "Connection",
    flightDuration: 1,
    validFrom: "2024-01-01T00:00:00.000Z",
    title: "Title",
    subtitle: "Sub Title",
    category: "DIRECT",
    passengerSeats: 1,
    updatedAt: "2024-01-01T00:00:00.000Z",
    validTo: "2025-01-01T00:00:00.000Z",
    aircraftTypeId: "1",
    aircraftTypeName: "Aircraft Type",
    regionId: "1",
    regionName: "Region",
    departureVertiportUuid: "1",
    arrivalVertiportUuid: "1",
    departureVertiportCode: "DEP",
    arrivalVertiportCode: "ARR",
    ...overwrites,
});
