import { useState } from "react";
import { MarkLineReference } from "./types";
import { useChartTranslations } from "./useChartTranslations";

export const useBatteryAndTemperatureGraphs = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [markLineReference, setMarkLineReference] = useState<MarkLineReference>("csfl");

    const {
        CSFL_PDM_2_ENERGY,
        CSFL_PDM_2_TEMPERATURE,
        NOMINAL_MISSION_TEMPERATURE,
        CSFL_NOMINAL_ENERGY,
        CSFL_NOMINAL_TEMPERATURE,
        NOMINAL_MISSION_ENERGY,
        ENERGY_CONDUCTED_ROUTE,
        CONTINGENCY_ENERGY,
        TEMPERATURE_CONDUCTED_ROUTE,
        NOMINAL_MAX_TEMPERATURE,
        CSFL_MAX_TEMPERATURE,
    } = useChartTranslations();

    const legendMapping = {
        [NOMINAL_MISSION_ENERGY]: NOMINAL_MISSION_TEMPERATURE,
        [NOMINAL_MISSION_TEMPERATURE]: NOMINAL_MISSION_ENERGY,
        [CSFL_NOMINAL_ENERGY]: CSFL_NOMINAL_TEMPERATURE,
        [CSFL_NOMINAL_TEMPERATURE]: CSFL_NOMINAL_ENERGY,
        [CSFL_PDM_2_ENERGY]: CSFL_PDM_2_TEMPERATURE,
        [CSFL_PDM_2_TEMPERATURE]: CSFL_PDM_2_ENERGY,
        [ENERGY_CONDUCTED_ROUTE]: TEMPERATURE_CONDUCTED_ROUTE,
        [TEMPERATURE_CONDUCTED_ROUTE]: ENERGY_CONDUCTED_ROUTE,
    };

    const alwaysVisibleSeries = [CONTINGENCY_ENERGY, NOMINAL_MAX_TEMPERATURE, CSFL_MAX_TEMPERATURE];

    return {
        legendMapping,
        isLoading,
        setIsLoading,
        markLineReference,
        setMarkLineReference,
        alwaysVisibleSeries,
    };
};
