import { AircraftResourcesCount } from "../aircrafts/apiModels";
import { AircraftResource, BaseDto, MassAndBalanceData, ProductLine } from "../common/apiModels";

export type WakeTurbulenceCategory = "UNKNOWN" | "A" | "B" | "C" | "D" | "E" | "F" | "H" | "J" | "L" | "M";

export type PerformanceModelType = "VOLOCITY001" | "VOLOREGION001" | "NO_CONSUMPTION" | "UNKNOWN";
export const PerformanceModel: {
    VOLOCITY001: PerformanceModelType;
    VOLOREGION001: PerformanceModelType;
    NO_CONSUMPTION: PerformanceModelType;
    UNKNOWN: PerformanceModelType;
} = {
    VOLOCITY001: "VOLOCITY001",
    VOLOREGION001: "VOLOREGION001",
    NO_CONSUMPTION: "NO_CONSUMPTION",
    UNKNOWN: "UNKNOWN",
};

export type AircraftTypeBase = {
    validFrom: string;
    validTo?: string;
    wakeTurbulenceCategory?: WakeTurbulenceCategory;
    maximumAirspeed?: number;
    maximumTranslationalAcceleration?: number;
    maximumLoadFactor?: number;
    maximumYawRateInHover?: number;
    maximumYawAccelerationInHover?: number;
    maximumTurnRateInCoordinatedFlight?: number;
    maximumTurnAccelerationInCoordinatedFlight?: number;
    serviceCeiling?: number;
    climbRate?: number;
    climbAcceleration?: number;
    descendRate?: number;
    descendAcceleration?: number;
    minimumTemperature: number;
    maximumTemperature: number;
    windSpeed: number;
    relativeHumidity: number;
    rain: number;
    visibility: number;
    cloudCeilingHeight: number;
    airDensity: number;
    massAndBalanceData?: MassAndBalanceData;
    aircraftResources?: AircraftResource[];
    performanceModel: PerformanceModelType;
    maxDurationToCsfl?: number;
    voltageThreshold?: number;
};

export type AircraftTypeCreateAllOf = {
    name: string;
    productLine: ProductLine;
    createdBy?: string;
};

export type AircraftTypeCreate = AircraftTypeBase & AircraftTypeCreateAllOf;

export type AircraftTypeUpdateAllOf = {
    updatedBy?: string;
};

export type AircraftTypeUpdate = AircraftTypeBase & AircraftTypeUpdateAllOf;

export type AircraftTypeAllOf = {
    id: string;
    performanceDataFileUrl?: string;
    performanceDataFileVersion?: number;
    version?: number;
    synchronizedWithLeon: boolean;
};

export type AircraftType = AircraftTypeCreate &
    AircraftTypeUpdate &
    BaseDto &
    AircraftResourcesCount &
    AircraftTypeAllOf;
