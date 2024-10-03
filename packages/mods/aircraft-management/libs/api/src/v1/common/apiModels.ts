export type BaseDto = {
    createTime: string;
    updateTime: string;
};

export type Point = {
    longitude: number;
    latitude: number;
    height: number;
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

export type AircraftResourceType = "PILOT_SEAT" | "PASSENGER_SEAT" | "BATTERY_SLOT" | "LUGGAGE_COMPARTMENT" | "OTHER";

export type AircraftResource = {
    id?: string;
    name: string;
    type: AircraftResourceType;
    position: CoordinatePoint;
    weight?: number;
};

export type TechnicalStatus = "UNKNOWN" | "SERVICEABLE" | "UNSERVICEABLE" | "SERVICEABLE_WITH_LIMITATIONS";

export type ProductLine = "UNKNOWN" | "VOLOCITY" | "VOLODRONE" | "VOLOREGION" | "2X" | "LILIUM_JET";
