import { FullEnvelopeValidation } from "@voloiq/flight-planning-api/v1";

type FormatFullEnvelopeValidationData = {
    windScenariosData: number[][];
    centerPointData: number[][];
};
export const formatFullEnvelopeValidationData = (
    fullEnvelopeValidationData?: FullEnvelopeValidation
): FormatFullEnvelopeValidationData => {
    const windScenariosData: number[][] = [];
    const centerPointData: number[][] = [];

    if (!fullEnvelopeValidationData) return { centerPointData: [], windScenariosData: [] };

    for (const scenario of fullEnvelopeValidationData.windScenarios) {
        if (scenario.windSpeed === 0 && scenario.windDirection === 0) {
            centerPointData.push([0, 0, scenario.isRouteValid ? 1 : 0]);
        } else {
            windScenariosData.push([scenario.windSpeed, scenario.windDirection, scenario.isRouteValid ? 1 : 0]);
        }
    }

    return { centerPointData, windScenariosData };
};
