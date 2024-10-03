import { AircraftTechnicalStatus } from "../apiModel";

export type ReservationBlockerType =
    | "UNKNOWN"
    | "EVENT"
    | "MISSION"
    | "BRIEFING"
    | "DEBRIEFING"
    | "VACATION"
    | "SICK"
    | "OTHER"
    | "ABSENT_IN_HR_SYSTEM"
    | "PILOT_MISSION"
    | "VERTIPORT";

export type Reservation = {
    id: string;
    alternativeIdentifier?: string;
    reservationType: ReservationBlockerType;
    startDateTime: string;
    endDateTime: string;
};

export type Aircraft = {
    aircraftId: string;
    registration?: string;
    msn?: string;
    technicalStatus?: AircraftTechnicalStatus;
    aircraftTypeId?: string;
    aircraftTypeName?: string;
    reservations?: Reservation[];
    synchronizedWithLeon: boolean;
};
