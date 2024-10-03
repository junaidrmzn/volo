import { TechnicalStatus } from "../common/apiModels";

export type ReservationBlockerType = "UNKNOWN" | "EVENT" | "MISSION" | "VERTIPORT";

export type Reservation = {
    id: string;
    alternativeIdentifier?: string;
    reservationType: ReservationBlockerType;
    startDateTime: string;
    endDateTime: string;
};
export type AircraftWithReservations = {
    aircraftId: string;
    registration?: string;
    msn?: string;
    technicalStatus?: TechnicalStatus;
    aircraftTypeId?: string;
    aircraftTypeName?: string;
    reservations?: Reservation[];
};
