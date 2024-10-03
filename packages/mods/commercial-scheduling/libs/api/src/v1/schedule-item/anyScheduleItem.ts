import type { ScheduleItem } from "./apiModels";

export const anyScheduleItem = (overwrites?: Partial<ScheduleItem>): Required<ScheduleItem> => ({
    id: "1",
    flightNumber: "1111",
    planName: "Plan 1",
    status: "DRAFT",
    connection: {
        departureVertiportCode: "DEP",
        arrivalVertiportCode: "ARR",
    },
    departureTime: "2024-01-01T14:00:00.000Z",
    arrivalTime: "2024-01-01T14:30:00.000Z",
    service: "PASSENGER",
    operationType: "PILOTED",
    numberOfPassengerSeats: 1,
    earliestBookable: "2024-01-01T00:00:00.000Z",
    bookingStartDifference: 1,
    latestBookable: "2024-01-01T00:00:00.000Z",
    ...overwrites,
});
