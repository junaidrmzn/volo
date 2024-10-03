import { FlightTimeLimitation } from "./apiModels";

export const anyFlightTimeLimitation = (overwrites?: Partial<FlightTimeLimitation>): FlightTimeLimitation => ({
    restBefore: 1_209_600,
    restAfter: 1_209_600,
    minRestBefore: 43_200,
    minRestAfter: 43_200,
    missions: [
        {
            reportOn: "2023-06-05T10:55:00Z",
            departureVertiportCode: "PAU",
            estimatedDeparture: "2023-06-05T11:00:00Z",
            arrivalVertiportCode: "PAU",
            estimatedArrival: "2023-06-05T12:00:00Z",
            departureTimeZone: "Europe/Paris",
            arrivalTimeZone: "Europe/Paris",
            reportOff: "2023-06-05T12:05:00Z",
        },
    ],
    totalFlightTime: 3600,
    totalDutyTime: 4200,
    maxFlightTime: 36_000,
    maxDutyTime: 43_200,
    ...overwrites,
});
