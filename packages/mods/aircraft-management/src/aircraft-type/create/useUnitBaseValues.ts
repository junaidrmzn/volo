import { useState } from "react";

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
    maxDurationToCsfl: string;
    voltageThreshold: string;
};
export const useUnitBaseValues = () => {
    const [baseValues, setBaseValues] = useState<UnitBaseValues>({
        minimumTemperature: "",
        maximumTemperature: "",
        windSpeed: "",
        mbBem: "",
        mbMtom: "",
        relativeHumidity: "",
        rain: "",
        visibility: "",
        cloudCeilingHeight: "",
        airDensity: "",
        maxDurationToCsfl: "",
        voltageThreshold: "",
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
