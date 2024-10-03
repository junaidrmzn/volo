export type PassengerCheckinType = "NOT_ALLOWED" | "BIOMETRIC" | "UNKNOWN";

export type Service = { available: boolean; serviceKey: string };

export type Vertiport = {
    id: string;
    validFrom: string;
    minimumTemperature: number;
    maximumTemperature: number;
    windSpeed: number;
    relativeHumidity: number;
    rain: number;
    visibility: number;
    cloudCeilingHeight: number;
    airDensity: number;
    name: string;
    productLine: string;
    createTime: string;
    updateTime: string;
    performanceDataFileUrl?: string;
    performanceDataFileVersion: number;
    version: number;
    validTo: string;
    wakeTurbulenceCategory?: unknown;
    maximumAirspeed?: unknown;
    maximumTranslationalAcceleration?: unknown;
    maximumLoadFactor?: unknown;
    maximumYawRateInHover?: unknown;
    maximumYawAccelerationInHover?: unknown;
    maximumTurnRateInCoordinatedFlight?: unknown;
    maximumTurnAccelerationInCoordinatedFlight?: unknown;
    serviceCeiling?: unknown;
    climbRate?: unknown;
    climbAcceleration?: unknown;
    descendRate?: unknown;
    descendAcceleration?: unknown;
    massAndBalanceData?: {
        cgPosition: {
            x: number;
            y: number;
        };
        bem: number;
        mtom: number;
        longCgEnvelopePoints: unknown[];
        latCgEnvelopePoints: unknown[];
    };
    aircraftResources: unknown[];
    pilotSeats: number;
    passengerSeats: number;
    batterySlots: number;
    luggageCompartments: number;
    otherResources: number;
    createdBy: string;
    updatedBy: string;
    aircraftCount: number;
    performanceModel: string;
    maxDurationToCsfl?: unknown;
    // does not exist on the vertiport response
    code?: string;
    shortName?: string;
};
