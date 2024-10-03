import type { Event } from "@voloiq-typescript-api/network-scheduling-types";

export const constructAircraftSummary = (event: Event | undefined, noAssignment: string) => {
    if (!event?.aircraft) {
        return noAssignment;
    }
    return `${event?.aircraft.aircraftTypeName} - MSN ${event?.aircraft.msn}${
        event?.aircraft.registration ? ` - ${event?.aircraft.registration}` : ""
    }`;
};
