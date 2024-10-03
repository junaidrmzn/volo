import { useFlightPlanningTranslation } from "../../translations";

export const useChartTranslations = () => {
    const { t: translate } = useFlightPlanningTranslation();

    /* Energy chart curves */
    const NOMINAL_MISSION_ENERGY = translate("chart.energyCurve.nominalMission");
    const CSFL_NOMINAL_ENERGY = translate("chart.energyCurve.CSFLNominal");
    const CSFL_PDM_2_ENERGY = translate("chart.energyCurve.CSFLPDM2");
    const UNUSABLE_ENERGY = translate("chart.energyCurve.unusableEnergy");
    const FINAL_RESERVE = translate("chart.energyCurve.finalReserve");
    const ADDITIONAL_ENERGY = translate("chart.energyCurve.additionalEnergy");
    const EXTRA_ENERGY = translate("chart.energyCurve.extraEnergy");
    const DISCRETIONARY_ENERGY = translate("chart.energyCurve.discretionaryEnergy");
    const ENERGY_CONDUCTED_ROUTE = translate("chart.energyCurve.energyConductedRoute");
    const CONTINGENCY_ENERGY = translate("chart.energyCurve.contingencyEnergy");

    /* Battery temperature chart curves */
    const NOMINAL_MISSION_TEMPERATURE = translate("chart.batteryTemperatureCurve.nominalMission");
    const CSFL_NOMINAL_TEMPERATURE = translate("chart.batteryTemperatureCurve.CSFLNominal");
    const CSFL_PDM_2_TEMPERATURE = translate("chart.batteryTemperatureCurve.CSFLPDM2");
    const NOMINAL_MAX_TEMPERATURE = translate("chart.batteryTemperatureCurve.nominalMaxTemperature");
    const CSFL_MAX_TEMPERATURE = translate("chart.batteryTemperatureCurve.CSFLMaxTemperature");
    const TEMPERATURE_CONDUCTED_ROUTE = translate("chart.batteryTemperatureCurve.temperatureConductedRoute");

    return {
        NOMINAL_MISSION_ENERGY,
        CSFL_NOMINAL_ENERGY,
        CSFL_PDM_2_ENERGY,
        UNUSABLE_ENERGY,
        FINAL_RESERVE,
        ADDITIONAL_ENERGY,
        EXTRA_ENERGY,
        DISCRETIONARY_ENERGY,
        ENERGY_CONDUCTED_ROUTE,
        CONTINGENCY_ENERGY,
        NOMINAL_MISSION_TEMPERATURE,
        CSFL_NOMINAL_TEMPERATURE,
        CSFL_PDM_2_TEMPERATURE,
        NOMINAL_MAX_TEMPERATURE,
        CSFL_MAX_TEMPERATURE,
        TEMPERATURE_CONDUCTED_ROUTE,
    };
};
