export type MissionForFTL = {
    arrivalTimeZone: string;
    arrivalVertiportCode: string;
    departureTimeZone: string;
    departureVertiportCode: string;
    estimatedArrival: string;
    estimatedDeparture: string;
    reportOff: string;
    reportOn: string;
};

export type FlightTimeLimitation = {
    restBefore: number;
    restAfter: number;
    minRestBefore: number;
    minRestAfter: number;
    totalFlightTime: number;
    totalDutyTime: number;
    maxFlightTime: number;
    maxDutyTime: number;
    missions: MissionForFTL[];
};
