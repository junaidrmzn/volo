export type AircraftTechnicalStatus = "SERVICEABLE" | "UNSERVICEABLE" | "SERVICEABLE_WITH_LIMITATIONS" | "UNKNOWN";
export type AircraftResourceType = "OTHER" | "PILOT_SEAT" | "PASSENGER_SEAT" | "BATTERY_SLOT" | "LUGGAGE_COMPARTMENT";
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

export type EventReservationModel = {
    id: string;
    endDateTime: string;
    isBlockedForMission: boolean;
    name: string;
    startDateTime: string;
};

export type MissionReservationModel = {
    id: string;
    assignedAircraftId: string;
    flightNumber: string;
    scheduledArrivalDateTime: string;
    scheduledArrivalVertiportCode: string;
    scheduledDepartureDateTime: string;
    scheduledDepartureVertiportCode: string;
    assignedPilotId: string;
};
export type Reservation = {
    id: string;
    alternativeIdentifier?: string;
    reservationType: ReservationBlockerType;
    startDateTime: string;
    endDateTime: string;
    reservationModel: EventReservationModel | MissionReservationModel;
};

export type CoordinatePoint = {
    x: number;
    y: number;
};

export type MassAndBalancePoint = {
    m: number;
    kg: number;
};

export type MassAndBalanceData = {
    cgPosition: CoordinatePoint;
    bem: number;
    mtom: number;
    longCgEnvelopePoints: MassAndBalancePoint[];
    latCgEnvelopePoints: MassAndBalancePoint[];
};

export type AircraftResource = {
    id?: string;
    name: string;
    type: AircraftResourceType;
    position: CoordinatePoint;
    weight?: number;
};

export type CrewConfiguration = "CREWED" | "UNCREWED";
export type Service = "UNKNOWN" | "PASSENGER" | "CARGO" | "TEST" | "TRAINING" | "FERRY_FLIGHT" | "CARPOOL";

export type Aircraft = {
    aircraftId: string;
    registration?: string;
    msn?: string;
    technicalStatus?: AircraftTechnicalStatus;
    aircraftTypeId?: string;
    aircraftTypeName?: string;
    reservations?: Reservation[];
    massAndBalanceData?: MassAndBalanceData;
    aircraftResources?: AircraftResource[];
    homebaseId?: string;
    homebaseName?: string;
    crewConfiguration?: CrewConfiguration;
    services?: Service[];
};
