import { BaseDto, PadService } from "../common/apiModels";

export type PadEventType = "UNKNOWN" | "ACPARKING" | "PREBUFFER" | "POSTBUFFER" | "GENERAL" | "WEATHER";
export type PadReservationType = "UNKNOWN" | "GENERAL" | "DEPARTURE" | "ARRIVAL";
export type ReservationBlockerType = "UNKNOWN" | "EVENT" | "MISSION" | "VERTIPORT";

export type PadEventCreate = {
    title: string;
    subTitle?: string;
    startTime: string;
    endTime: string;
    type: PadEventType;
};

export type PadEventAllOf = {
    id: string;
    blockerId?: string;
    blockerType?: ReservationBlockerType;
    reservationType?: PadReservationType;
    service?: PadService;
};

export type PadEvent = PadEventCreate & BaseDto & PadEventAllOf;
