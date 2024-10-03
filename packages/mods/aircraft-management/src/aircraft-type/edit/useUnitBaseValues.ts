import { useState } from "react";
import { AircraftType } from "@voloiq/aircraft-management-api/v1";

export type UnitBaseValues = {
    minimumTemperature: string;
    maximumTemperature: string;
    windSpeed: string;
    mbBem: string;
    mbMtom: string;
    relativeHumidity: string;
    rain: string;
    visibility: string;
    cloudCeilingHeight: string;
    airDensity: string;
    voltageThreshold?: string;
    maxDurationToCsfl?: string;
};
export const useUnitBaseValues = (resource: AircraftType) => {
    const [baseValues, setBaseValues] = useState<UnitBaseValues>({
        minimumTemperature: String(resource.minimumTemperature),
        maximumTemperature: String(resource.maximumTemperature),
        windSpeed: String(resource.windSpeed),
        mbBem: String(resource.massAndBalanceData?.bem),
        mbMtom: String(resource.massAndBalanceData?.mtom),
        relativeHumidity: String(resource.relativeHumidity),
        rain: String(resource.rain),
        visibility: String(resource.visibility),
        cloudCeilingHeight: String(resource.cloudCeilingHeight),
        airDensity: String(resource.airDensity),
        voltageThreshold: String(resource.voltageThreshold ?? ""),
        maxDurationToCsfl: String(resource.maxDurationToCsfl ?? ""),
    });

    const handleBaseValueUpdate = (key: keyof UnitBaseValues, value: string) => {
        const newBaseValues = baseValues;
        newBaseValues[key] = value;
        setBaseValues(newBaseValues);
    };

    return {
        baseValues,
        handleBaseValueUpdate,
    };
};
